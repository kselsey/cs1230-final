import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Grass } from "./grass/grass";
import { Barn } from "./barn";

// scene
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const sizes = {
  width: 1400,
  height: 800,
};

// lighting
const light = new THREE.DirectionalLight("white", 10)
light.position.set(1,2,1)
scene.add(light)
const ambient_lighting = new THREE.AmbientLight(0x404040, 10)
scene.add(ambient_lighting)

// adding objects
const grass = new Grass(50, 500000)
scene.add(grass)
const barn = new Barn();
scene.add(barn)

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
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

// movement
const controls = new OrbitControls( camera, renderer.domElement );
controls.keys = {
	LEFT: 'KeyA', //left arrow
	UP: 'Space', // up arrow
	RIGHT: 'KeyD', // right arrow
	BOTTOM: 'ControlLeft', // down arrow
  FORWARD: 'KeyW'
}
controls.listenToKeyEvents(document);
document.addEventListener("keydown", onKeyDown, false);
function onKeyDown(event) {
  var keyCode = event.which;
  var offset = .2;
  var up = new THREE.Vector3();
  up.copy(camera.up).applyQuaternion(camera.quaternion);
  camera.getWorldDirection(camera.lookAtVector);
  if (keyCode == 87) { // W key
    camera.position.x += camera.lookAtVector.x*offset;
    camera.position.y += camera.lookAtVector.y*offset;
    camera.position.z += camera.lookAtVector.z*offset;
  } if (keyCode == 83) { // S key
    camera.position.x -= camera.lookAtVector.x*offset;
    camera.position.y -= camera.lookAtVector.y*offset;
    camera.position.z -= camera.lookAtVector.z*offset;
  } if (keyCode == 91) { // command
    camera.position.y -= offset;
  }
}

// animate
renderer.setAnimationLoop((time) => {
  grass.update(time)
  renderer.render(scene, camera)
})