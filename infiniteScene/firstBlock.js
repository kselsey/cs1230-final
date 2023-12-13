import * as THREE from "three";

import { Pig } from "../animals/pig.js";
import { RotatingCows } from "../animals/rotatingCows.js"
import { Grass } from "../grass/grass.js";
import { Barn } from "../barn.js";
import { AppleTree } from "../Trees/appleTree.js";
import { Pond } from "../Pond.js";
import { Skybox } from "../skybox.js"
import { PineTree } from "../Trees/pineTree.js";
import { Tractor } from "../tractor.js"
import { Fence } from "../fence.js"
import { LilyPad } from "../lilypad.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class FirstBlock extends THREE.Mesh {
    grass;
    animationList = []
    horzOffset;
    vertOffset;

    quack;
    oink;
    moo;
    pigs = [];
    cows = [];

    flowers = []

    constructor(listener){
        super();

        // Prepare the animal sounds
        const myQuack = new THREE.Audio(listener)
        const myOink = new THREE.Audio(listener)
        const myMoo = new THREE.Audio(listener)
        const audioLoader = new THREE.AudioLoader();
        const audioLoader2 = new THREE.AudioLoader();
        const audioLoader3 = new THREE.AudioLoader();
        audioLoader.load( '../sounds/quacking.mp3', function( buffer ) {
            myQuack.setBuffer( buffer );
            myQuack.setLoop( true );
            myQuack.setVolume( 0.5 );
            myQuack.isPlaying == false;
        });
        audioLoader2.load( '../sounds/peppa.mp3', function( buffer ) {
            myOink.setBuffer( buffer );
            myOink.setLoop( true );
            myOink.setVolume( 0.5 );
            myOink.isPlaying == false;
        });
        audioLoader3.load('../sounds/moo.mp3', function(buffer) {
            myMoo.setBuffer(buffer);
            myMoo.setLoop(true);
            myMoo.setVolume(0.5);
            myMoo.isPlaying == false;
        });
        this.quack = myQuack;
        this.oink = myOink;
        this.moo = myMoo;

        this.makeScene();
    }

    async makeScene() {
      // adding objects
      this.grass = new Grass(50, 90000);
      this.add(this.grass);
      const pond = new Pond();
      this.add(pond);
      this.animationList.push(pond)
      this.add(new Skybox());
      this.add(new Barn());
      this.add(new PineTree(10, 5, 35));
      this.add(new PineTree(18, 5, 30));
      const appleTree1 = new AppleTree();
      this.add(appleTree1);
      this.animationList.push(appleTree1);
      const appleTree2 = new AppleTree();
      appleTree2.translate(-8, 0, 4);
      this.add(appleTree2);
      this.animationList.push(appleTree2);
      const tractor = new Tractor();
      tractor.translate(16, 2, 20);
      this.add(tractor.totalTractor);
      const fence = new Fence(6);
      fence.translate(-20, 0, 0);
      this.add(fence);

      // adding pigs
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

      // adding hay + cows
      const rotatingCows = new RotatingCows();
      rotatingCows.translate(3,.5,30);
      this.add(rotatingCows)
      this.cows.push(rotatingCows)
      this.animationList.push(rotatingCows);

      // const radius = 3;
      // const speed = 0.01;
      // let angle1 = 0;
      // let angle2 = (Math.PI / 3) * 2;
      // let angle3 = (Math.PI / 3) * 4;

      // function updateCowsPosition() {
        
      //   const x1 = hay.totalHay.position.x + radius * Math.cos(angle1);
      //   const z1 = hay.totalHay.position.z + radius * Math.sin(angle1);
      //   const prevX1 = cow1.totalCow.position.x;
      //   const prevZ1 = cow1.totalCow.position.z;
      //   cow1.totalCow.position.set(x1, 1, z1);

      //   const x2 = hay.totalHay.position.x + radius * Math.cos(angle2);
      //   const z2 = hay.totalHay.position.z + radius * Math.sin(angle2);
      //   const prevX2 = cow2.totalCow.position.x;
      //   const prevZ2 = cow2.totalCow.position.z;
      //   cow2.totalCow.position.set(x2, 1, z2);

      //   const x3 = hay.totalHay.position.x + radius * Math.cos(angle3);
      //   const z3 = hay.totalHay.position.z + radius * Math.sin(angle3);
      //   const prevX3 = cow3.totalCow.position.x;
      //   const prevZ3 = cow3.totalCow.position.z;
      //   cow3.totalCow.position.set(x3, 1, z3);

      //   // angles for each cow
      //   const angleChange1 = Math.atan2(z1 - prevZ1, x1 - prevX1);
      //   const angleChange2 = Math.atan2(z2 - prevZ2, x2 - prevX2);
      //   const angleChange3 = Math.atan2(z3 - prevZ3, x3 - prevX3);

      //   // rotation based on angle change
      //   cow1.totalCow.rotation.y = angleChange1;
      //   cow2.totalCow.rotation.y = angleChange2;
      //   cow3.totalCow.rotation.y = angleChange3;

      //   angle1 += speed;
      //   angle2 += speed;
      //   angle3 += speed;

      //   if (angle1 > Math.PI * 2) {
      //     angle1 -= Math.PI * 2;
      //   }

      //   if (angle2 > Math.PI * 2) {
      //     angle2 -= Math.PI * 2;
      //   }

      //   if (angle3 > Math.PI * 2) {
      //     angle3 -= Math.PI * 2;
      //   }

      //   requestAnimationFrame(updateCowsPosition);
      // }

      // updateCowsPosition();

      // adding white flower
      // This work is based on "flower" (https://sketchfab.com/3d-models/flower-0fa50cf622f44f2ba59eff6c11cb8fbd)
      // by tojamerlin (https://sketchfab.com/tojamerlin) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
      var flower1;
      const loader2 = new GLTFLoader();
      this.test = await loader2
        .loadAsync("../orange_flower/scene.gltf")
        .then(function (value) {
          flower1 = value.scene;
          flower1.scale.set(0.01, 0.01, 0.01);
        });
      const flower2 = flower1.clone();
      const flower3 = flower1.clone();
      const flower4 = flower1.clone();
      flower1.position.set(8, 0.75, 28);
      flower2.position.set(5, 0.75, 30);
      flower3.position.set(9, 0.5, 20.5);
      flower4.position.set(25, 0.5, 35);
      this.flowers.push(flower1);
      this.add(flower1);
      this.flowers.push(flower2);
      this.add(flower2);
      this.flowers.push(flower3);
      this.add(flower3);
      this.flowers.push(flower4);
      this.add(flower4);

      // adding lilypads
      const lily1 = new LilyPad();
      this.add(lily1.shape);
      lily1.shape.rotateX(-Math.PI / 2);
      lily1.shape.position.set(-6, 0.92, 30);

      const lily2 = new LilyPad();
      this.add(lily2.shape);
      lily2.shape.rotateX(-Math.PI / 2);
      lily2.shape.position.set(-7, 0.92, 28);

      const lily3 = new LilyPad();
      this.add(lily3.shape);
      lily3.shape.rotateX(-Math.PI / 2);
      lily3.shape.rotateZ(-Math.PI / 2);
      lily3.shape.position.set(-8, 0.92, 32);

      const lily4 = new LilyPad();
      this.add(lily4.shape);
      lily4.shape.rotateX(-Math.PI / 2);
      lily4.shape.rotateZ(-Math.PI / 3);
      lily4.shape.position.set(-10, 0.92, 27);

      const lily5 = new LilyPad();
      this.add(lily5.shape);
      lily5.shape.rotateX(-Math.PI / 2);
      lily5.shape.rotateZ(Math.PI / 3);
      lily5.shape.position.set(-13, 0.92, 27);

      var whiteFlower1;
      const loader3 = new GLTFLoader();
      this.test = await loader3
        .loadAsync("../white_flower/scene.gltf")
        .then(function (value) {
          whiteFlower1 = value.scene;
          whiteFlower1.scale.set(0.03, 0.02, 0.03);
        });
      const whiteFlower2 = whiteFlower1.clone();
      const whiteFlower3 = whiteFlower1.clone();
      const whiteFlower4 = whiteFlower1.clone();
      whiteFlower1.position.set(-3, 0.75, 30);
      whiteFlower2.position.set(-3, 0.75, 31);
      whiteFlower3.position.set(9, 0.5, 14.5);
      whiteFlower4.position.set(14, 0.5, 14.5);
      this.flowers.push(whiteFlower1);
      this.add(whiteFlower1);
      this.flowers.push(whiteFlower2);
      this.add(whiteFlower2);
      this.flowers.push(whiteFlower3);
      this.add(whiteFlower3);
      this.flowers.push(whiteFlower4);
      this.add(whiteFlower4);
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

        var makeCowNoise = false;
        for (let i=0; i<this.cows.length; i++){
            var cowPos = new THREE.Vector3();
            this.cows[i].getWorldPosition( cowPos );
            if (check_if_should_make_noise(cowPos.x, cowPos.z, 3)){
                makeCowNoise = true;
        }
        if (makeCowNoise){
            if(this.moo.isPlaying == false){
                this.moo.play();
              }
            } else {
              this.moo.pause();
            }
        }

        if(cameraPos.z > 23 && cameraPos.z < 37 && cameraPos.x > -17 && cameraPos.x < -2){
            if(this.quack.isPlaying == false){
              this.quack.play();
            }
          } else {
            this.quack.pause();
        }

        this.grass.animate(time)
        this.animationList.forEach((each) => each.animate(cameraPos));
    }

    translate(x, y, z){
        //TODO?
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