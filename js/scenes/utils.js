
import * as cg from "../render/core/cg.js";

export class Object{
    constructor(item,scaleV,size,offset,type){
        this.item = item;
        this.scaleV = scaleV;
        this.size = size;
        // gltf:1, 
        this.type = type;
        this.offset_bag = offset
        this.inbag = false;
    }

    get matrix(){
        if(this.type == 1){
            return this.item._worldMatrix;
        }else if(this.type == 0){
            return this.item.getMatrix();
        }
    }

    moveToBag(cube){
        if(this.type == 0){
            let x= cube.getGlobalMatrix()[12]+this.offset_bag[0];
            let y =cube.getGlobalMatrix()[13]+this.offset_bag[1];
            let z = cube.getGlobalMatrix()[14]+this.offset_bag[2];
            let v = this.scaleV;
            let m = this.matrix;
            this.item.identity().move(x,y,z).scale(v);
            return this.item
        }else if(this.type == 1){
            let x= cube.getGlobalMatrix()[12]+this.offset_bag[0];
            let y =cube.getGlobalMatrix()[13]+this.offset_bag[1];
            let z = cube.getGlobalMatrix()[14]+this.offset_bag[2];
            let v = this.scaleV;
            this.item.translation = [x,y,z,1];
            this.item.scale = [v,v,v,1];
            return this.item;
        }
    }

    moveToHand(hand){
        if(this.type == 0){
            let x= hand[12];
            let y =hand[13];
            let z = hand[14];
            this.item.identity().move(x,y,z);
        }else if(this.type == 1){
            let x= hand[12];
            let y =hand[13];
            let z = hand[14];
            this.item.translation = [x,y,z,1];
            this.item.scale = [1,1,1,1];
            return this.item;
        }
    }

    rotate(xx,yy){
        if(this.type == 0){
            this.item.child(0).turnY(xx/10);
            this.item.child(0).turnX(yy/10);
        }else if(this.type == 1){
            this.item.matrix = cg.mMultiply(this.item.matrix,cg.mRotateX(yy*3.1414/2))
            this.item.matrix = cg.mMultiply(this.item.matrix,cg.mRotateY(xx*3.1414/2))
        }
    }
}