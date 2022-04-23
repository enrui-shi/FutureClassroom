import * as global from "../global.js";
import { Gltf2Node } from "../render/nodes/gltf2.js";



let Sample_table;
let HUD;

export const init = async model => {
    HUD = model.add().hud();
    Sample_table = model.add();



    model.animate(() => {
    });
 }
