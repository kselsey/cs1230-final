import * as THREE from "three";

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { Grass } from "./grass/grass";
import { Barn } from "./barn";
import { Tree } from "./tree";
import { Pond } from "./Pond";
import { Pig } from "./animals/pig.js";
import { Skybox } from "./skybox.js"

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
light.position.set(-5, 7, 20);
light.decay = 1.5;
light.castShadow = true;
scene.add(light)
const ambient_lighting = new THREE.AmbientLight(0x404040, 10)
scene.add(ambient_lighting)

// adding objects
const skybox = new Skybox();
scene.add(skybox);
const grass = new Grass(50, 500000)
scene.add(grass)
const barn = new Barn();
scene.add(barn)
const pond = new Pond();
scene.add(pond)
const tree = new Tree();
scene.add(tree);

// adding animals
const pig1 = new Pig();
const pig2 = new Pig();
const pig3 = new Pig();
scene.add(pig1.totalPig);
scene.add(pig2.totalPig);
scene.add(pig3.totalPig);
pig1.totalPig.position.set(-10, 1, 12);
pig2.totalPig.position.set(3, 1, 20);
pig3.totalPig.position.set(-20, 1, 40);

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 30000);
camera.position.z = 20;
camera.position.y = 1.7;
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

// animate
renderer.setAnimationLoop((time) => {
  //controls.update(0.0001 * time); // for firstPersonControls
  grass.update(time)
  pond.animate();
  renderer.render(scene, camera)
})