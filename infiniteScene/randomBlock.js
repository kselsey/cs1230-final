import * as THREE from "three";

import { Pig } from "../animals/pig.js";
import { Grass } from "../grass/grass.js";
import { Barn } from "../barn.js";
import { AppleTree } from "../Trees/appleTree.js";
import { Pond } from "../Pond.js";
import { Tractor } from "../tractor.js"
import { Fence } from "../fence.js"
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

        // grass
        this.grass = new Grass(50, 90000)
        this.add(this.grass)
        this.allElements.push(this.grass);

        const rand = Math.floor(Math.random()*5);
        // if (rand==0){
        //     for (let i=0; i<10; i++){
        //         const newTree = new PineTree(i*10+5,5,0);
        //         this.add(newTree);
        //         this.allElements.push(newTree)
        //     }
        // }
        switch(rand){
            case 0:
                this.box1();
                break;
            case 1:
                this.box2();
                break;
            default:
                for (let i=0; i<1; i++){
                  //  const newTree = new PineTree(i*10+5,5,0);
                    const newTree =new AppleTree();
                    newTree.translate(i+10, 0, 25)
                    this.add(newTree);
                    this.appleTrees.push(newTree)
                    this.allElements.push(newTree)
                }
        }
    }

    box1() {
        const fence = new Fence(11);
       // fence.rotateY(Math.PI/2)
        this.add(fence)
        this.allElements.push(fence)
        fence.translate(-25,0,0)

        for (let i=0; i<(12*13); i++){
            const rand = Math.random()*100
            if (rand<30 && !(Math.floor(i%13)>10 && Math.floor(i/12)<2)){
                const pig = new Pig();
                this.add(pig.totalPig)
                this.allElements.push(pig)
                pig.translate(4*Math.floor(i%13) -24 , 0, 3.7*Math.floor(i/12) + 2)
            }
        }

        const newTree = new PineTree(-3+25,5,2);
        this.add(newTree)
        this.allElements.push(newTree)
        const newTree2 = new PineTree(-5+25,5,2);
        this.add(newTree2)
        this.allElements.push(newTree2)
        const newTree3 = new PineTree(-4+25,5,5);
        this.add(newTree3)
        this.allElements.push(newTree3)
        const newTree4 = new PineTree(-9+25,5,3);
        this.add(newTree4)
        this.allElements.push(newTree4)
        const newTree5 = new PineTree(-7+25,5,4)
        this.add(newTree5)
        this.allElements.push(newTree5)
    }

    box2(){
        const coords = [[-20,3],[-16,16],[-21,28],[-11,38],[-5,8],[-12,23],[-13,44],
                        [-8,47],[0, 25],[3,3],[1,16],[-2,31],[5,41],[6,21],[7,33],
                        [8,8],[15,22],[13,18],[17,4],[-11,4],[17,37],[14,31],[11,46],
                        [0,46],[21,13],[23,7],[22,27],[21,46],[-22,44],[-18,31],[-22,7]]
        for (let i=0; i<coords.length; i++){
            const rand = Math.floor(Math.random()*5)
            switch(rand){
                case 0:
                case 1:
                    const newTree = new AppleTree();
                    newTree.translate(coords[i][0], 0, coords[i][1]);
                    this.add(newTree)
                    this.allElements.push(newTree)
                    this.appleTrees.push(newTree)
                    break;
                case 2:
                    const tractor = new Tractor();
                    tractor.translate(coords[i][0], 2, coords[i][1]);
                    this.add(tractor)
                    this.allElements.push(tractor)
                    break;
                default:
                    break;
            }
        }
    }

    translate(x,y,z){
        this.allElements.forEach((each) => each.translate(x,y,z))

        this.horzOffset? this.horzOffset += x : this.horzOffset = x;
        this.vertOffset? this.vertOffset += z : this.vertOffset = z;
    }

    getHorzOffset(){ return this.horzOffset? this.horzOffset : 0 }
    getVertOffset(){ return this.vertOffset? this.vertOffset : 0 }

    animate(time, cameraPos){
        function check_if_should_make_noise(animal_x, animal_z, offset){
            if(camera.position.z > animal_z - offset && camera.position.z < animal_z + offset 
              && camera.position.x > animal_x - offset && camera.position.x <animal_x + offset){
                return true;
              } else {
                return false;
              }
          }

        this.grass.update(time)
        this.pondList.forEach((pond) => pond.animate());
        this.appleTrees.forEach((tree) => tree.animate(cameraPos));
    }

    delete(){
        this.clear();
    }
}

export { RandomBlock };