import * as THREE from "three";

import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { FullScene } from "./infiniteScene/fullScene.js"
import { Skybox } from "./scenery/skybox.js"
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

// lighting
const light = new THREE.DirectionalLight("#f9fae1", 3, 0, 1.5)
light.position.set(-10, 25, 20);
light.castShadow = false;
scene.add(light);
const ambient_lighting = new THREE.AmbientLight(0x404040, 10);
scene.add(ambient_lighting);

// point light for shadows
const light2 = new THREE.PointLight("#f9fae1", 75, 0, 1.5)
light2.position.set(-5, 7, 40);
light2.castShadow = true;
scene.add(light2);

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 30000);
camera.position.z = 22;
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
const depthOfFieldPass = new BokehPass(scene, camera, {focus: 100, aperture: 0.05, maxblur: 0.0025});
composer.addPass(depthOfFieldPass);

// Camera controls
const controls = new PointerLockControls(camera, renderer.domElement);
// Hide menu when locked, else show menu
controls.addEventListener("lock", () => hideMenu());
controls.addEventListener("unlock", () => showMenu());
// Lock pointer on mouse click (unlock with escape)
document.addEventListener("mousedown", () => controls.lock());
document.addEventListener("keydown", onKeyDown, false);

function hideMenu() {
  let menu = document.getElementById("menu");
  let controls = document.getElementById("controls");
  menu.style.display = "none";
  controls.style.display = "none";
}

function showMenu() {
  let menu = document.getElementById("menu");
  let controls = document.getElementById("controls");
  menu.style.display = "flex";
  controls.style.display = "flex";
}

const skybox = new Skybox();
scene.add(skybox);

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
  // If T, change skybox
  if (keyCode == 84) {
    if (skybox.textureBasePath == "textures/skyboxOptions/daytimeSmooth") {
      skybox.textureBasePath = "textures/skyboxOptions/nighttimeSmooth";
      skybox.material = skybox.createMaterialArray(skybox.textureBasePath);
      light.intensity = 1.5;
    } else {
      skybox.textureBasePath = "textures/skyboxOptions/daytimeSmooth";
      skybox.material = skybox.createMaterialArray(skybox.textureBasePath);
      light.intensity = 3;
    }
  }
}

// Resize scene on window resize
window.addEventListener("resize", () => onResizeCanvas());

function onResizeCanvas() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
}

// scene
const fullScene = new FullScene(listener);
scene.add(fullScene);

// animate
renderer.setAnimationLoop((time) => {
 // renderer.render(scene, camera)
  fullScene.animate(time, camera.position)
  composer.render();

})
