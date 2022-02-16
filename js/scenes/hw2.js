import * as cg from "../render/core/cg.js";
import { controllerMatrix, buttonState, joyStickState } from "../render/core/controllerInput.js";



let balls;
let reset;
let targets;
let ball_num = 4;
let target_number = 6;
let targets_hit = [0,0,0,0,0,0];
let target_size = 0.2;
let ball_size = 0.1;
let reset_button;
let distance = (M1, M2) => {
    return Math.sqrt(Math.pow(M1[12] - M2[12], 2) + Math.pow(M1[13] - M2[13], 2) + Math.pow(M1[14] - M2[14], 2));
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
//array sum
const arrSum = arr => arr.reduce((a,b) => a + b, 0)
export const init = async (model) => {
    // x,y,z
    // model.add("tubeX").color(1, 0, 0).move(0, 1, 0).scale(10, .01, .01);
    // model.add("tubeY").color(0, 1, 0).move(0, 1, 0).scale(.01, 10, .01);
    // model.add("tubeZ").color(0, 0, 1).move(0, 1, 0).scale(.01, .01, 10);
    balls = model.add();
    targets = model.add();
    reset_button = model.add().move(0, 0.7, 0.6);
    reset_button.add('sphere').color(1, 0, 0).scale(0.05);
    // Generate balls 
    for (let i = 0; i < ball_num; i++) {
        let x = balls.add().move(0.6 - (1.2 / (ball_num - 1)) * i, 0.9, 0.5);
        x.add('sphere').color(1, 1, 1).scale(ball_size);
    }
    // Generate Targets
    for (let i = 0; i < target_number; i++) {
        let x = targets.add().move(getRandomArbitrary(-4, 4), getRandomArbitrary(0.6, 2.5), getRandomArbitrary(-1.5, -2.5));
        x.add('sphere').color(0, 1, 0).scale(target_size);
    }
}

let ball_s = null;
let matrixL_p, matrixR_p;
let ball_t = 1.2;
let vball_x, vball_y, vball_z;
let reset_time = 0;
export const display = (model) => {
    model.animate(() => {
        // controller matrix
        let matrixL = controllerMatrix.left;
        let triggerL = buttonState.left[0].pressed;
        let matrixR = controllerMatrix.right;
        let triggerR = buttonState.right[0].pressed;
        matrixL = cg.mMultiply(matrixL, cg.mTranslate(.006, 0, 0));
        matrixR = cg.mMultiply(matrixR, cg.mTranslate(-.001, 0, 0));
        // check whether in vr mode
        if (controllerMatrix.left) {
            // ball selected
            if (ball_s) {
                if (triggerR &&ball_t == 2) {
                    let x = matrixR[12] - matrixR_p[12];
                    let y = matrixR[13] - matrixR_p[13];
                    let z = matrixR[14] - matrixR_p[14];
                    vball_x = (x) / model.deltaTime * 1.8;
                    vball_y = (y) / model.deltaTime * 1.8;
                    vball_z = (z) / model.deltaTime * 1.8;
                    ball_s.move(x, y, z);
                } else if (ball_t > 0) {
                    let g = 0.5 * 9.8 * Math.pow(2 - ball_t, 2);
                    ball_s.move(vball_x * model.deltaTime, (vball_y - g) * model.deltaTime, vball_z * model.deltaTime);
                    for(let i =0;i<target_number;i++){
                        let target = targets.child(i);
                        if (distance(target.getMatrix(),ball_s.getMatrix()) <= ball_size+target_size){
                            target.child(0).color(0,0,1);
                            targets_hit[i] = 1;
                        }
                    }
                    ball_t = ball_t - model.deltaTime;
                } else {
                    ball_s.child(0).color(1, 1, 1);
                    ball_s = null;
                }
            // no ball selected
            } else {
                for (let i = 0; i < ball_num; i++) {
                    let ball = balls.child(i);
                    if (distance(matrixR, ball.getMatrix()) <= ball_size+0.03) {
                        if (ball_s == null && triggerR) {
                            ball_s = balls.child(i);
                            ball_t = 2;
                            ball.child(0).color(1, 0, 0);
                        }
                    }
                }
            }
            // reset balls
            if(reset_time<=0){
                reset_button.child(0).color(1,0,0);
            }else{
                reset_time -= model.deltaTime;
            }
            if(reset_time <= 0 && distance(matrixR,reset_button.getMatrix())<=0.1 && triggerR){
                reset_button.child(0).color(0,0,0);
                reset_time = 5;
                ball_s = null;
                ball_t = 0;
                for (let i = 0; i < ball_num; i++) {
                    balls.child(i).identity().move(0.6 - (1.2 / (ball_num - 1)) * i, 0.9, 0.5);
                    balls.child(i).child(0).identity().color(1, 1, 1).scale(ball_size);
                }
                if(arrSum(targets_hit)==6){
                    for (let i = 0; i < target_number; i++) {
                        targets_hit[i] = 0;
                        targets.child(i).identity().move(getRandomArbitrary(-4, 4), getRandomArbitrary(0.6, 2.5), getRandomArbitrary(-1.5, -2.5));
                        targets.child(i).child(0).identity().color(0, 1, 0).scale(target_size);
                    }
                }
            }
            matrixL_p = matrixL;
            matrixR_p = matrixR;
        }
    });
}