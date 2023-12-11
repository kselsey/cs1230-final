import * as THREE from "three";

import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { Grass } from "./grass/grass";
import { Barn } from "./barn";
import { AppleTree } from "./Trees/appleTree.js";
import { Pond } from "./Pond";
import { Skybox } from "./skybox.js"
import { PineTree } from "./Trees/pineTree.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pig } from "./animals/pig";

// scene
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// lighting
//const light = new THREE.DirectionalLight("white", 10);
//light.position.set(1,2,1)
//light.position.set(-5, 5, 32);
const light = new THREE.PointLight("white", 200)
light.position.set(-5, 15, 20);
light.decay = 1.5;
light.castShadow = true;
scene.add(light)
const ambient_lighting = new THREE.AmbientLight(0x404040, 10)
scene.add(ambient_lighting)

// adding objects
const grass = new Grass(50, 500000)
scene.add(grass)
const pond = new Pond();
scene.add(pond)
scene.add(new Skybox());
scene.add(new Barn())
scene.add(new PineTree(10, 5, 35));
scene.add(new PineTree(18, 5, 30));
scene.add(new AppleTree());
const appleTree2 = new AppleTree();
appleTree2.move(-8,4);
scene.add(appleTree2)

// adding animals
const pig1 = new Pig();
const pig2 = new Pig();
const pig3 = new Pig();
scene.add(pig1.totalPig);
scene.add(pig2.totalPig);
scene.add(pig3.totalPig);
pig1.totalPig.position.set(0, 1, 12);
pig2.totalPig.position.set(-5, 1, 20);
pig3.totalPig.position.set(-15, 1, 40);

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 30000);
camera.position.z = 20;
camera.position.y = 2;
camera.lookAtVector = new THREE.Vector3(0,0,-1);
camera.getWorldDirection(camera.lookAtVector);
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

// Camera controls
const controls = new PointerLockControls(camera, renderer.domElement);
// Lock pointer on mouse click (unlock with escape)
document.addEventListener("mousedown", () => controls.lock());
document.addEventListener("keydown", onKeyDown, false);
function onKeyDown(event) {
  var keyCode = event.which;
  var offset = 0.08;
  // If W, move forward
  if (keyCode == 87) {
    controls.moveForward(2 * offset);
  }
  // If S, move backward
  if (keyCode == 83) {
    controls.moveForward(-2 * offset);
  }
  // If D, move right
  if (keyCode == 68) {
    controls.moveRight(2 * offset);
  }
  // If A, move left
  if (keyCode == 65) {
    controls.moveRight(-2 * offset);
  }
}

// const controls = new FirstPersonControls(camera, renderer.domElement);
// controls.movementSpeed = 0.2;

// const controls = new OrbitControls( camera, renderer.domElement );
// controls.keys = {
// 	LEFT: 'KeyA',
// 	UP: 'KeyQ',
// 	RIGHT: 'KeyD',
// 	BOTTOM: 'KeyE'
// }
// controls.listenToKeyEvents(document);
// document.addEventListener("keydown", onKeyDown, false);
// function onKeyDown(event) {
//   var keyCode = event.which;
//   var offset = .2;
//   var up = new THREE.Vector3();
//   up.copy(camera.up).applyQuaternion(camera.quaternion);
//   camera.getWorldDirection(camera.lookAtVector);
//   if (keyCode == 87) { // W key
//     camera.position.x += camera.lookAtVector.x*offset;
//     camera.position.y += camera.lookAtVector.y*offset;
//     camera.position.z += camera.lookAtVector.z*offset;
//   } if (keyCode == 83) { // S key
//     camera.position.x -= camera.lookAtVector.x*offset;
//     camera.position.y -= camera.lookAtVector.y*offset;
//     camera.position.z -= camera.lookAtVector.z*offset;
//   }
// }

// Prepare the animal sounds
const listener = new THREE.AudioListener();
camera.add( listener );
const quack = new THREE.Audio( listener );
const oink = new THREE.Audio( listener );
const audioLoader = new THREE.AudioLoader();
const audioLoader2 = new THREE.AudioLoader();
audioLoader.load( 'quacking.mp3', function( buffer ) {
	quack.setBuffer( buffer );
	quack.setLoop( true );
	quack.setVolume( 0.5 );
  quack.isPlaying == false;
});

audioLoader2.load( 'peppa.mp3', function( buffer ) {
	oink.setBuffer( buffer );
	oink.setLoop( true );
	oink.setVolume( 0.5 );
  oink.isPlaying == false;
});

var pig1_pos = new THREE.Vector3();
pig1.body.getWorldPosition( pig1_pos );
var pig2_pos = new THREE.Vector3();
pig2.body.getWorldPosition( pig2_pos );
var pig3_pos = new THREE.Vector3();
pig3.body.getWorldPosition( pig3_pos );

// reset the potion of the water
// pond.entirePond.position.set(-10, 0.1, 30);
// var pond_pos = new THREE.Vector3();
// pond.entirePond.getWorldPosition( pond_pos );
// console.log(pond_pos);

// animate
renderer.setAnimationLoop((time) => {

  function check_if_should_make_noise(animal_x, animal_z, offset){
    if(camera.position.z > animal_z - offset && camera.position.z < animal_z + offset 
      && camera.position.x > animal_x - offset && camera.position.x <animal_x + offset){
        return true;
      } else {
        return false;
      }
  }

  //controls.update(0.0001 * time); // for firstPersonControls
  grass.update(time)
  pond.animate();
  renderer.render(scene, camera)

  var close_to_pig1 = check_if_should_make_noise(pig1_pos.x, pig1_pos.z, 3);
  var close_to_pig2 = check_if_should_make_noise(pig2_pos.x, pig2_pos.z, 3);
  var close_to_pig3 = check_if_should_make_noise(pig3_pos.x, pig3_pos.z, 3);

  // to make the pigs oink
  if(close_to_pig1 || close_to_pig2|| close_to_pig3){
    if(oink.isPlaying == false){
      oink.play();
    }
  } else {
    oink.pause();
  }

  // to make the duck quack
  if(camera.position.z > 23 && camera.position.z < 37 && camera.position.x > -17 && camera.position.x < -2){
    if(quack.isPlaying == false){
      quack.play();
    }
  } else {
    quack.pause();
  }

})