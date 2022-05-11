import * as global from "../global.js";
import { Gltf2Node } from "../render/nodes/gltf2.js";
import * as cg from "../render/core/cg.js";
import { controllerMatrix, buttonState, joyStickState } from "../render/core/controllerInput.js";
import {Object} from "./utils.js"


let distance = (M1, M2) => {
    return Math.sqrt(Math.pow(M1[12] - M2[12], 2) + Math.pow(M1[13] - M2[13], 2) + Math.pow(M1[14] - M2[14], 2));
}

export const init = async model => {
    // global variable
    let DEBUG = false;
    let MODE_BAG = false;
    let MODE_HOLD = false;
    let HOLD_OBJ = null;
    let BAG_SIZE = 6;

    
    // end game lable
    let END_TEXT = 'Congratulations';
    let lable = model.add('label').info(END_TEXT).move(0,100000000,0);

    let HEADSET_SHOW = false;
    let GET_CARD = false;
    let SCRET_INPUT1 = [];
    let SCRET_INPUT1_R = ['B','A','B','A'];

    let world = model.add();
    let hud = model.add();

    /*
        pre ops
    */

    let leftMatrix_P   = false;
    let leftTrigger_P  = false;
    let leftSqueeze_P  = false;
    let leftJoyTouch_P = false;
    let leftJoyPress_P = false;
    let X_P            = false;
    let Y_P            = false;
    let leftJoyX_P     = 0;
    let leftJoyY_P     = 0;

    let rightMatrix_P   = false;
    let rightTrigger_P  = false;
    let rightSqueeze_P  = false;
    let rightJoyTouch_P = false;
    let rightJoyPress_P = false;
    let A_P             = false;
    let B_P             = false;
    let rightJoyX_P     = 0;
    let rightJoyY_P     = 0;
     
    /*
        ROOM
    */
    // walls
    let room = world.add();
    let floor = room.add('cube').texture('media/textures/celling.jpg').scale(2,0.01,2);
    let roof = room.add('cube').move(0,2,0).texture('media/textures/celling.jpg').scale(2,0.01,2);
    let wall1 = room.add('cube').texture('media/textures/wall.jpg').move(0,5/3,2).scale(2,5/3,0.01);
    let wall2 = room.add('cube').texture('media/textures/wall.jpg').move(0,5/3,-2).scale(2,5/3,0.01);
    let wall3 = room.add('cube').texture('media/textures/wall.jpg').turnY(Math.PI/2).move(0,5/3,-2).scale(2,5/3,0.01);
    let wall4 = room.add('cube').texture('media/textures/wall.jpg').turnY(Math.PI/2).move(0,5/3,2).scale(2,5/3,0.01);

    let window = room.add('cube').texture('media/textures/window.jpg').move(0,1,-1.99).turnZ(3.1415/2).scale(0.4,0.4,0.0001);
    // door
    let door = room.add('cube').texture('media/textures/door1.jpg').move(-1.2,0.8,1.99).scale(0.4,0.8,0.01)
    let nfc = new Gltf2Node({ url: './media/gltf/cardreader/scene.gltf' });
    nfc.translation = [-0.7,0.8,1.95,1]
    nfc.scale = [0.02,0.02,0.02,1]
    
    global.gltfRoot.addNode(nfc);

    // carbit
    let cabinet = new Gltf2Node({ url: './media/gltf/cabinet_1/scene.gltf' });
    global.gltfRoot.addNode(cabinet)
    cabinet.translation =[-1.75,0.7,-1,1]
    cabinet.scale = [0.2,0.2,0.2,1]
    
    // pusheen
    let pusheen = new Gltf2Node({ url: './media/gltf/pusheen/scene.gltf' });
    global.gltfRoot.addNode(pusheen)
    pusheen.translation = [1.7,0.98,-1.4,1]
    pusheen.scale = [0.2,0.2,0.2,1]
    pusheen.matrix = cg.mMultiply(pusheen.matrix,cg.mRotateY(-1))
    // bag chair
    let bag_chair = new Gltf2Node({url: './media/gltf/bag_chair/scene.gltf'});
    global.gltfRoot.addNode(bag_chair)
    bag_chair.translation = [0.5,0,0.7,1]
    bag_chair.matrix = cg.mMultiply(bag_chair.matrix,cg.mRotateY(-0.5))

    // shoe rack
    let shoe_rack = new Gltf2Node({url: './media/gltf/shoe_rack/scene.gltf'});
    global.gltfRoot.addNode(shoe_rack)
    shoe_rack.translation = [-1.9,0,1.9,1]
    shoe_rack.scale = [0.1,0.1,0.1,1]
    shoe_rack.matrix =  cg.mMultiply(shoe_rack.matrix,cg.mRotateY(-3.1415/2))
    // shoes
    let shoes1 = new Gltf2Node({url: './media/gltf/shoe1/scene.gltf'});
    global.gltfRoot.addNode(shoes1)
    shoes1.translation = [-1.65,0.14,1.7,1]
    shoes1.scale = [0.1,0.1,0.1,1]
    shoes1.matrix =  cg.mMultiply(shoes1.matrix,cg.mRotateY(-3.1415/2))
    //computer
    let computer = new Gltf2Node({url: './media/gltf/computer/scene.gltf'});
    global.gltfRoot.addNode(computer)
    computer.translation = [1.4,0.8,-0.2,1]
    computer.scale = [0.006,0.006,0.006,1]
    computer.matrix = cg.mMultiply(computer.matrix,cg.mRotateY(-3.14/2))

   


    //table 
    let table = world.add().move(1.5,-0.6,0);
    let table_surface = table.add('cube').texture('media/textures/table_surface.jpg').move(0,1.4,0).scale(0.4,0.005,0.6)
    let t_base1 = table.add('tubeY').texture('media/textures/wood1.png').move(0.38,1,0.5).scale(0.01,0.4,0.01)
    let t_base2 = table.add('tubeY').texture('media/textures/wood1.png').move(-0.38,1,0.5).scale(0.01,0.4,0.01)
    let t_base3 = table.add('tubeY').texture('media/textures/wood1.png').move(-0.38,1,-0.5).scale(0.01,0.4,0.01)
    let t_base4 = table.add('tubeY').texture('media/textures/wood1.png').move(0.38,1,-0.5).scale(0.01,0.4,0.01)



    /* bag */
    let bag = hud.add();
    let bag_select = -1;
    let cubes = [];
    for (let i = 0 ; i<BAG_SIZE;i++) {
        cubes.push(bag.add('cube').move(8-4*i,0,0).color(1,1,1).scale(1,1,0.01));
        cubes[i].obj = null;
    }
   

    
    /* objects */ 
    let objs = [];


    // card
    let card = world.add().move(-1.7,0.65,-1)
    card.add().add('cube').texture('media/textures/card1.png').scale(0.085,0.053,0.0001);
    let O_card = new Object(card,0.15,0.15,[0,0,-0.002],0);
    objs.push(O_card)

    // headset
    let headset_gltf = new Gltf2Node({ url: './media/gltf/headset/headset.gltf' });
    global.gltfRoot.addNode(headset_gltf);
    headset_gltf.translation = [-1.7,0.78,-1,1];
    let headset = new Object(headset_gltf,0.1,0.2,[0,0,0],1);
    headset_gltf.matrix =  cg.mMultiply(headset_gltf.matrix,cg.mRotateY(-3.1415/2))
    objs.push(headset);
    
    
    // controller L
    let controller_L = new Gltf2Node({ url: './media/gltf/controller_l/scene.gltf' });
    global.gltfRoot.addNode(controller_L);
    controller_L.translation = [1.3,0.36,1.5,1];
    let cl = new Object(controller_L,0.3,0.1,[0,0.015,-0.04],1);
    objs.push(cl)
    
    // controller R

    let controller_R = new Gltf2Node({ url: './media/gltf/controller_r/scene.gltf' });
    global.gltfRoot.addNode(controller_R);
    controller_R.translation = [-0.3,1,-1000,1];
    let cr = new Object(controller_R,0.3,0.1,[0,0.015,-0.04],1);
    objs.push(cr)
    

    // glass of tea
    let glass = new Gltf2Node({ url: './media/gltf/tall_drinking_glass/scene.gltf' });
    global.gltfRoot.addNode(glass);
    glass.translation = [1.4,0.8,0.2,1];
    let O_glass = new Object(glass,0.15,0.12,[0,-0.01,0],1);
    // glass.scale = [0.01,0.01,0.01,1]
    objs.push(O_glass)

    // basketball
    let basketball = world.add().move(1.7,0.1,-1)
    basketball.add().add('sphere').texture('media/textures/basketball.jpg').scale(0.1)
    let O_basketball = new Object(basketball,0.15,0.2,[0,0,0],0);
    objs.push(O_basketball)

    // headset.inbag = true
    model.animate(() => {
        // GET DATA FROM MY LEFT CONTROLLER
        // console.log(headset_gltf)
        let leftMatrix   = controllerMatrix.left;
        let leftTrigger  = buttonState.left[0].pressed;
        let leftSqueeze  = buttonState.left[1].pressed;
        let leftJoyTouch = buttonState.left[3].touched;
        let leftJoyPress = buttonState.left[3].pressed;
        let X            = buttonState.left[4].pressed;
        let Y            = buttonState.left[5].pressed;
        let leftJoyX     = joyStickState.left.x;
        let leftJoyY     = joyStickState.left.y;

        // GET DATA FROM MY RIGHT CONTROLLER

        let rightMatrix   = controllerMatrix.right;
        let rightTrigger  = buttonState.right[0].pressed;
        let rightSqueeze  = buttonState.right[1].pressed;
        let rightJoyTouch = buttonState.right[3].touched;
        let rightJoyPress = buttonState.right[3].pressed;
        let A             = buttonState.right[4].pressed;
        let B             = buttonState.right[5].pressed;
        let rightJoyX     = joyStickState.right.x;
        let rightJoyY     = joyStickState.right.y;

        let matrixL = cg.mMultiply(leftMatrix, cg.mTranslate(.006, 0, 0));
        let matrixR = cg.mMultiply(rightMatrix, cg.mTranslate(-.001, -0.08, -0.08));
        /*
            debug function
        */
        // global.gltfRoot.translation = [world.getGlobalMatrix()[12],world.getGlobalMatrix()[13],world.getGlobalMatrix()[14]];
        if(DEBUG){
            if(leftJoyX || leftJoyY){
                world.move(leftJoyX,0,leftJoyY);
            }
            // headset.rotate(0.1,0.5)
        }
        /*
            ops
        */ 
        // A release, press
        let A_R = A_P && (!A);
        let A_Press = !A_P && A;
        // B release, press
        let B_R = B_P && (!B);
        let B_Press = !B_P && B;
        // rx move
        let rightJoyX_R = rightJoyX==0 && (rightJoyX_P>0);
        let N_rightJoyX_R = rightJoyX==0 && (rightJoyX_P<0);
        // r Trigger press | hold | release
        let rightTrigger_Press = !rightTrigger_P && rightTrigger;
        let rightTrigger_H = rightTrigger_P && rightTrigger;
        let rightTrigger_R = !rightTrigger && rightTrigger_P;
        
        /*
            init bag
        */
        bag.hud().move(0,-0.18,-0.6).scale(0.02);
        for(let i = 0;i<BAG_SIZE;i++){
            if(i!=bag_select){
                cubes[i].color(1,1,1);
            }
            if(cubes[i].obj){
                cubes[i].obj.moveToBag(cubes[i])
                // gltf_to_bag(cubes[i].obj.item,i,cubes,cubes[i].obj.scaleV);
            }

        }
        /* 
            Bag operation
                Press A to bag mode, Press A again to exit
                In bag mode, press rightTrigger to get object in hand
        */ 
        if(A_R && !MODE_HOLD){
            MODE_BAG = !MODE_BAG;
            if(MODE_BAG){
                bag_select = 0;
            }else{
                bag_select = -1;
            }
        }
        if(MODE_BAG){
            cubes[bag_select].color(0.8,0,0)
            if(rightJoyX_R){
                bag_select = (bag_select+1)%BAG_SIZE;
            }else if(N_rightJoyX_R){
                bag_select = bag_select - 1;
                if(bag_select<0){
                    bag_select = BAG_SIZE-1;
                }
            }
            if(rightTrigger && cubes[bag_select].obj){
                MODE_HOLD = true;
                HOLD_OBJ = cubes[bag_select].obj;
                cubes[bag_select].obj.inbag = false
                cubes[bag_select].obj.moveToHand(matrixR);
                // gltf_to_hand(cubes[bag_select].obj.item,matrixR,cubes[bag_select].obj.scaleV);
                cubes[bag_select].obj = null;
                MODE_BAG = false;
                bag_select = -1;
            }
        }
        /*
            Hold object
        */
        if(rightTrigger_Press && !MODE_HOLD){
            for(const obj of objs){
                if(!obj.inbag && distance(obj.matrix,matrixR) <= obj.size+0.03){
                    MODE_HOLD = true;
                    HOLD_OBJ = obj;
                    break
                }
            }
        }
        if(rightTrigger_R){
            MODE_HOLD = false
        }
        if(MODE_HOLD){
            HOLD_OBJ.moveToHand(matrixR);
            if(A_R){
                for(let i=0;i<BAG_SIZE;i++){
                    if(!cubes[i].obj){
                        cubes[i].obj = HOLD_OBJ;
                        HOLD_OBJ.inbag = true
                        MODE_HOLD = false
                        break
                    }
                }
            }
            if(rightJoyX || rightJoyY){
                HOLD_OBJ.rotate(rightJoyX,rightJoyY);
            }
        }

        
        /* show head set for currect input */
        if(!HEADSET_SHOW){
            if(SCRET_INPUT1.length < SCRET_INPUT1_R.length){
                if(A_R){
                    SCRET_INPUT1.push('A');
                }
                if(B_R){
                    SCRET_INPUT1.push('B');
                }
            }else{
                if(A_R){
                    SCRET_INPUT1.push(SCRET_INPUT1.splice(0, 1)[0]);
                    SCRET_INPUT1[SCRET_INPUT1_R.length-1] = 'A';
                }
                if(B_R){
                    SCRET_INPUT1.push(SCRET_INPUT1.splice(0, 1)[0]);
                    SCRET_INPUT1[SCRET_INPUT1_R.length-1] = 'B';
                }
            }
            if(SCRET_INPUT1.length == SCRET_INPUT1_R.length){
                let flag = true;
                for(let i =0;i<SCRET_INPUT1.length;i++){
                    if (SCRET_INPUT1[i] != SCRET_INPUT1_R[i]){
                        flag = false;
                    }
                }
                if(flag){
                    HEADSET_SHOW = true;
                    cr.moveToHand(matrixR);
                }
            }
        }

        // get card
        if(!MODE_HOLD && !GET_CARD && distance(cr.matrix,headset.matrix) < 0.6 && distance(cl.matrix,headset.matrix) < 0.6){
            GET_CARD = true
            O_card.moveToHand(matrixR);
        }
        //end Game
        if(X_P || distance(O_card.matrix,nfc._worldMatrix) < 0.1){
            world.scale(0.00001);
            global.gltfRoot.scale = [0.00001,0.00001,0.00001,1];
            lable.identity().hud().scale(.1);
        }
        /* 
            pre botton state
        */
        leftMatrix_P   = leftMatrix;
        leftTrigger_P  = leftTrigger;
        leftSqueeze_P  = leftSqueeze;
        leftJoyTouch_P = leftJoyTouch;
        leftJoyPress_P = leftJoyPress;
        X_P            = X;
        Y_P            = Y;
        leftJoyX_P     = leftJoyX;
        leftJoyY_P     = leftJoyY;
        
        rightMatrix_P   = rightMatrix;
        rightTrigger_P  = rightTrigger;
        rightSqueeze_P  = rightSqueeze;
        rightJoyTouch_P = rightJoyTouch;
        rightJoyPress_P = rightJoyPress;
        A_P             = A;
        B_P             = B;
        rightJoyX_P     = rightJoyX;
        rightJoyY_P     = rightJoyY;
    });
 }
