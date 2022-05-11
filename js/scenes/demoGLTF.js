/*
   This demo shows a way to incorporate GLTF models that were
   previously created in external modeling programs.
*/
import * as global from "../global.js";
import { Gltf2Node } from "../render/nodes/gltf2.js";

export const init = async model => {
   let carbint = new Gltf2Node({ url: './media/gltf/pusheen/scene.gltf' });
   global.gltfRoot.addNode(carbint)
   carbint.translation = [0,2,0,1]
   carbint.scale = [0.5,0.5,0.5,1]
   carbint.translation =[0,0,0,1]
    model.animate(() => {
      
    });
 }
