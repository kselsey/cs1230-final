import * as THREE from "three";

import { Pig } from "../animals/pig.js";
import { Grass } from "../grass/grass.js";
import { Barn } from "../barn.js";
import { AppleTree } from "../Trees/appleTree.js";
import { Pond } from "../Pond.js";
import { Skybox } from "../skybox.js"
import { PineTree } from "../Trees/pineTree.js";
import { Tractor } from "../tractor.js"
import { Fence } from "../fence.js"

class FirstBlock extends THREE.Mesh {
    grass;
    pond;
    appleTrees = [];
    horzOffset;
    vertOffset;

    quack;
    oink;
    pigs = [];

    constructor(listener){
        super();

        // Prepare the animal sounds
        this.quack = new THREE.Audio( listener );
        this.oink = new THREE.Audio( listener );
        const audioLoader = new THREE.AudioLoader();
        const audioLoader2 = new THREE.AudioLoader();
        audioLoader.load( '../sounds/quacking.mp3', function( buffer ) {
            this.quack.setBuffer( buffer );
            this.quack.setLoop( true );
            this.quack.setVolume( 0.5 );
        this.quack.isPlaying == false;
        });
        console.log(audioLoader)
        console.log(audioLoader2)
        audioLoader2.load( '../sounds/peppa.mp3', function( buffer ) {
            this.oink.setBuffer( buffer );
            this.oink.setLoop( true );
            this.oink.setVolume( 0.5 );
          this.oink.isPlaying == false;
        });

        this.makeScene();
    }

    makeScene() {

        // lighting
        const light = new THREE.PointLight("white", 200)
        light.position.set(-5, 15, 20);
        light.decay = 1.5;
        light.castShadow = true;
        this.add(light)
        const ambient_lighting = new THREE.AmbientLight(0x404040, 10)
        this.add(ambient_lighting)

        // adding objects
        this.grass = new Grass(50, 90000)
        this.add(this.grass)
        this.pond = new Pond();
        this.add(this.pond)
        this.add(new Skybox());
        this.add(new Barn())
        this.add(new PineTree(10, 5, 35));
        this.add(new PineTree(18, 5, 30));
        const appleTree1 = new AppleTree();
        this.add(appleTree1);
        this.appleTrees.push(appleTree1);
        const appleTree2 = new AppleTree();
        appleTree2.move(-8,4);
        this.add(appleTree2);
        this.appleTrees.push(appleTree2);
        const tractor = new Tractor();
        tractor.translate(10,2,17)
        this.add(tractor);
        const fence = new Fence(5);
        fence.translate(-15,0,5)
        this.add(fence);

        // adding animals
        const pig1 = new Pig();
        const pig2 = new Pig();
        const pig3 = new Pig();
        this.add(pig1.totalPig);
        this.add(pig2.totalPig);
        this.add(pig3.totalPig);
        this.pigs.push(pig1.body);
        this.pigs.push(pig2.body);
        this.pigs.push(pig3.body);
        pig1.totalPig.position.set(0, 1, 12);
        pig2.totalPig.position.set(-5, 1, 20);
        pig3.totalPig.position.set(-15, 1, 40);
    }

    animate(time, cameraPos){
        function check_if_should_make_noise(animal_x, animal_z, offset){
            if(cameraPos.z > animal_z - offset && cameraPos.z < animal_z + offset 
                && cameraPos.x > animal_x - offset && cameraPos.x <animal_x + offset){
                return true;
                } else {
                return false;
                }
            }

        var makePigNoise = false;
        for (let i=0; i<this.pigs.length; i++){
            var pigPos = new THREE.Vector3();
            this.pigs[i].getWorldPosition( pigPos );
            if (check_if_should_make_noise(pigPos.x, pigPos.z, 3)){
                makePigNoise = true;
        }
        if (makePigNoise){
            if(this.oink.isPlaying == false){
                this.oink.play();
              }
            } else {
              this.oink.pause();
            }
        }

        if(cameraPos.z > 23 && cameraPos.z < 37 && cameraPos.x > -17 && cameraPos.x < -2){
            if(this.quack.isPlaying == false){
              this.quack.play();
            }
          } else {
            this.quack.pause();
        }

        this.grass.update(time)
        this.pond.animate();
        this.appleTrees.forEach((each) => each.animate(cameraPos));
    }

    translate(x, y, z){
        //TODO
        this.horzOffset? this.horzOffset += x : this.horzOffset = x;
        this.vertOffset? this.vertOffset += z : this.vertOffset = z;
    }

    getHorzOffset(){ return this.horzOffset? this.horzOffset : 0 }
    getVertOffset(){ return this.vertOffset? this.vertOffset : 0 }

    delete(){
        this.clear();
    }
}

export { FirstBlock };