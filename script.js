import * as THREE from "three";
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { Grass } from "./grass/grass";
import { Barn } from "./barn";
import { Skybox } from "./skybox.js"
import { PineTree } from "./pineTree.js";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// scene
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// lighting
const light = new THREE.DirectionalLight("white", 10)
light.position.set(1,2,1)
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
const pineTree1 = new PineTree(10, 5, 35);
const pineTree2 = new PineTree(18, 5, 30);
scene.add(pineTree1);
scene.add(pineTree2);

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 30000);
camera.position.set(0, 2, 20);
camera.lookAtVector = new THREE.Vector3(0,0,-1);
camera.getWorldDirection(camera.lookAtVector);
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Effect composer
const composer = new EffectComposer(renderer);
// Render scene
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
// Add depth of field
const depthOfFieldPass = new BokehPass(scene, camera, {focus: 50, aperture: 0.05, maxblur: 0.0025});
composer.addPass(depthOfFieldPass);
// Output pass for color correction
// const outputPass = new OutputPass();
// composer.addPass(outputPass);

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
      light.intensity = 0.75;
    } else {
      skybox.textureBasePath = "textures/skyboxOptions/daytimeSmooth";
      skybox.material = skybox.createMaterialArray(skybox.textureBasePath);
      light.intensity = 1.0;
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

// animate
renderer.setAnimationLoop((time) => {
  grass.update(time)
  composer.render();
})