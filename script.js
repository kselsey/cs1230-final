import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(5, 1, 1);
geometry.translate(0, -1, 0);
const material = new THREE.MeshPhongMaterial({ color: "green" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.DirectionalLight("white", 10)
light.position.set(1,2,1)
scene.add(light)

const sizes = {
  width: 800,
  height: 600,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.lookAtVector = new THREE.Vector3(0,0,-1);
camera.getWorldDirection(camera.lookAtVector);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

document.addEventListener("keydown", onKeyDown, false);
function onKeyDown(event) {
  var keyCode = event.which;
  var offset = .05;
  var up = new THREE.Vector3();
  up.copy(camera.up).applyQuaternion(camera.quaternion);
  var left = up.cross(camera.lookAtVector).normalize();
  if (keyCode == 87) { // W key
    camera.position.x += camera.lookAtVector.x*offset;
    camera.position.y += camera.lookAtVector.y*offset;
    camera.position.z += camera.lookAtVector.z*offset;
  } if (keyCode == 83) { // S key
    camera.position.x -= camera.lookAtVector.x*offset;
    camera.position.y -= camera.lookAtVector.y*offset;
    camera.position.z -= camera.lookAtVector.z*offset;
  } if (keyCode == 65) { // A key
    camera.position.x += left.x*offset;
    camera.position.y += left.y*offset;
    camera.position.z += left.z*offset;
  } if (keyCode == 68) { // D key
    camera.position.x -= left.x*offset;
    camera.position.y -= left.y*offset;
    camera.position.z -= left.z*offset;
  } if (keyCode == 32) { // space
    camera.position.y += offset;
  } if (keyCode == 91) { // command
    camera.position.y -= offset;
  }
  renderer.render(scene, camera);
}