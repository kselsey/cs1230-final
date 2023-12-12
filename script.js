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
const light = new THREE.PointLight("#f9fae1", 250)
light.position.set(-5, 15, 20);
light.decay = 1.5;
light.castShadow = true;
scene.add(light)
const ambient_lighting = new THREE.AmbientLight(0x404040, 10)
scene.add(ambient_lighting)
const nightLight = new THREE.PointLight("#dae5f5", 50);
nightLight.position.set(-5, 15, 20);
nightLight.decay = 1.5;
nightLight.castShadow = true;

// adding objects
const grass = new Grass(50, 500000)
scene.add(grass)
const pond = new Pond();
scene.add(pond)
const skybox = new Skybox();
scene.add(skybox);
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

// Effect composer
const composer = new EffectComposer(renderer);
// Render scene
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
// Add depth of field
const depthOfFieldPass = new BokehPass(scene, camera, {focus: 50, aperture: 0.05, maxblur: 0.0025});
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
      light.intensity = 50;
    } else {
      skybox.textureBasePath = "textures/skyboxOptions/daytimeSmooth";
      skybox.material = skybox.createMaterialArray(skybox.textureBasePath);
      light.intensity = 250;
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
  pond.animate();
  composer.render();
})
