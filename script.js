import * as THREE from "three";

import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { FullScene } from "./infiniteScene/fullScene.js"
import { Skybox } from "./skybox.js"
import { FirstBlock } from "./infiniteScene/firstBlock.js"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pig } from "./animals/pig";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';

// scene
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 30000);
camera.position.z = 20;
camera.position.y = 2;
camera.lookAtVector = new THREE.Vector3(0,0,-1);
camera.getWorldDirection(camera.lookAtVector);
scene.add(camera);

// sounds listener
const listener = new THREE.AudioListener();
camera.add( listener );

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

// Effect composer
const composer = new EffectComposer(renderer);
// Render scene
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
// Add depth of field
const depthOfFieldPass = new BokehPass(scene, camera, {focus : 50, aperture : 0.05, maxblur : 0.0025});
composer.addPass(depthOfFieldPass);

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

// scene
const fullScene = new FullScene(listener);
scene.add(fullScene);
scene.add(new Skybox());

// animate
renderer.setAnimationLoop((time) => {
  renderer.render(scene, camera)
  fullScene.animate(time, camera.position)
 // composer.render();

})