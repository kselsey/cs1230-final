import * as THREE from "three";

import { FirstBlock } from "./firstBlock.js"
import { RandomBlock } from "./randomBlock.js"

class FullScene extends THREE.Mesh {
    blockArray = []
    lastCameraPos = new THREE.Vector3();
    lastHorzMove;
    lastVertMove;

    constructor(listener){
        super();

        const mainBlock = new FirstBlock(listener);
        this.add(mainBlock);
        this.blockArray[4] = mainBlock;
        for (let i=0; i<9; i++){
            if (i!=4){
                this.blockArray[i] = new RandomBlock();
                this.add(this.blockArray[i]);
                this.blockArray[i].translate(-50*(i%3-1),0,-50*(Math.floor(i/3)-1))
            }
        }
    }

    animate(time, cameraPos){
      //  this.blockArray.forEach((block) => block.animate(time, cameraPos));
        this.blockArray[4].animate(time, cameraPos)
        const zDiff = cameraPos.z<0? 50-Math.abs(cameraPos.z)%50 : cameraPos.z%50;
        const xDiff = cameraPos.x+25<0? 50-Math.abs(cameraPos.x+25)%50 : (cameraPos.x+25)%50;
        const horzMovement = cameraPos.x-this.lastCameraPos.x;
        const vertMovement = cameraPos.z-this.lastCameraPos.z;
        var newArr = [];

        if (xDiff >= 49 && 0 != this.lastHorzMove.localeCompare("right") && horzMovement>0){
            // right edge of center block
            this.lastHorzMove = "right";
            for (let i=0; i<9; i++){
                if (i%3==2){
                    this.blockArray[i].delete();
                    newArr[i-2] = new RandomBlock();
                    newArr[i-2].translate(this.blockArray[i-2].getHorzOffset()+50, 0, this.blockArray[i].getVertOffset())
                    this.add(newArr[i-2]);
                }
                else{
                    newArr[i+1] = this.blockArray[i];
                }
            }
        }
        else if (xDiff <= 1 && 0 != this.lastHorzMove.localeCompare("left") && horzMovement<0){
            // left edge of center block
            this.lastHorzMove = "left"
            for (let i=0; i<9; i++){
                if (i%3==0){
                    this.blockArray[i].delete();
                    newArr[i+2] = new RandomBlock();
                    newArr[i+2].translate(this.blockArray[i+2].getHorzOffset()-50, 0, this.blockArray[i].getVertOffset())
                    this.add(newArr[i+2]);
                }
                else{
                    newArr[i-1] = this.blockArray[i];
                }
            }
        }
        else if (1<xDiff && xDiff<49){
            this.lastHorzMove = "nothing"
        }

        if (zDiff <= 1 && 0 != this.lastVertMove.localeCompare("forward") && vertMovement<0){
            // front edge of center block
            this.lastVertMove = "forward"
            for (let i=0; i<9; i++){
                if (Math.floor(i/3)==0){
                    this.blockArray[i].delete();
                    newArr[i+6] = new RandomBlock();
                    newArr[i+6].translate(this.blockArray[i].getHorzOffset(), 0, this.blockArray[i+6].getVertOffset()-50)
                    this.add(newArr[i+6]);
                }
                else{
                    newArr[i-3] = this.blockArray[i];
                }
            }
        }
        else if (zDiff >= 49 && 0 != this.lastVertMove.localeCompare("backward") && vertMovement>0){
            // back edge of center block
            this.lastVertMove = "backward"
            for (let i=0; i<9; i++){
                if (Math.floor(i/3)==2){
                    this.blockArray[i].delete();
                    newArr[i-6] = new RandomBlock();
                    newArr[i-6].translate(this.blockArray[i].getHorzOffset(), 0, this.blockArray[i-6].getVertOffset()+50)
                    this.add(newArr[i-6]);
                }
                else{
                    newArr[i+3] = this.blockArray[i];
                }
            }
        }
        else if (1<zDiff && zDiff<49){
            this.lastVertMove = "nothing"
        }

        if (Math.abs(this.lastCameraPos.x-cameraPos.x) > .1) this.lastCameraPos.x = cameraPos.x;
        if (Math.abs(this.lastCameraPos.z-cameraPos.z) > .1) this.lastCameraPos.z = cameraPos.z;
        if (newArr.length>0) this.blockArray = newArr;
    }
}

export { FullScene };