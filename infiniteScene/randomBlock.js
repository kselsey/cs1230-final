import * as THREE from "three";

import { Pig } from "../animals/pig.js";
import { Grass } from "../grass/grass.js";
import { Barn } from "../barn.js";
import { AppleTree } from "../Trees/appleTree.js";
import { Pond } from "../Pond.js";
import { Skybox } from "../skybox.js"
import { PineTree } from "../Trees/pineTree.js";

class RandomBlock extends THREE.Mesh {
    grass;
    pondList = [];
    appleTrees = [];
    allElements = [];
    horzOffset;
    vertOffset;

    constructor(){
        super();

        this.grass = new Grass(50, 90000)
        this.add(this.grass)
        this.allElements.push(this.grass);

        const newTree = new PineTree(0,5,25);
        this.add(newTree);
        this.allElements.push(newTree)
    }

    translate(x,y,z){
        this.allElements.forEach((each) => each.translate(x,y,z))

        this.horzOffset? this.horzOffset += x : this.horzOffset = x;
        this.vertOffset? this.vertOffset += z : this.vertOffset = z;
    }

    getHorzOffset(){ return this.horzOffset? this.horzOffset : 0 }
    getVertOffset(){ return this.vertOffset? this.vertOffset : 0 }

    animate(time, cameraPos){
        this.grass.update(time)
        this.pondList.forEach((pond) => pond.animate());
        this.appleTrees.forEach((tree) => tree.animate(cameraPos));
    }

    delete(){
        this.clear();
    }
}

export { RandomBlock };