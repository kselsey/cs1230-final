import * as THREE from "three";
import { CustomSinCurve } from "./utils/customsincurve";

class Cow {
  constructor() {
    const bodyGeometry = new THREE.BoxGeometry(1.5, 1, 1);
    const texture = new THREE.TextureLoader().load("textures/cowTexture.png");
    const bodyMaterial = new THREE.MeshToonMaterial({ map: texture });
    texture.encoding = THREE.sRGBEncoding;
    this.body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.body.map = texture;

    const headGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const headMaterial = new THREE.MeshToonMaterial({ map: texture });
    this.head = new THREE.Mesh(headGeometry, headMaterial);
    this.head.map = texture;
    this.head.position.set(1, 0.5, 0);

    const eyeGeometry = new THREE.CircleGeometry(0.1, 32, 32);
    const eyeTexture = new THREE.TextureLoader().load("textures/cowEye.png");
    const eyeMaterial = new THREE.MeshToonMaterial({ map: eyeTexture });
    const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye1.map = eyeTexture;
    eye2.map = eyeTexture;
    eye1.position.set(1.4, 0.65, 0.2);
    eye2.position.set(1.4, 0.65, -0.2);
    eye1.rotation.y = Math.PI / 2;
    eye2.rotation.y = Math.PI / 2;

    // const snoutGeometry = new THREE.CircleGeometry()
    const snoutGeometry = new THREE.CircleGeometry(0.1, 32, 32);
    const snoutTexture = new THREE.TextureLoader().load("textures/snout.png");
    const snoutMaterial = new THREE.MeshToonMaterial({ map: snoutTexture });
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
    snout.map = snoutTexture;
    snout.position.set(1.4, 0.4, 0);
    snout.rotation.y = Math.PI / 2;

    const earGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const earMaterial = new THREE.MeshToonMaterial({ color: 0x000000 });
    this.ear1 = new THREE.Mesh(earGeometry, earMaterial);
    this.ear2 = new THREE.Mesh(earGeometry, earMaterial);
    this.ear1.position.set(1.2, 0.9, -0.45);
    this.ear2.position.set(1.2, 0.9, 0.45);

    const tailPath = new CustomSinCurve(0.5, 0.5);
    const tailGeometry = new THREE.TubeGeometry(tailPath, 80, 0.1, 20);
    const tailMaterial = new THREE.MeshToonMaterial({ color: 0x000000 });
    this.tail = new THREE.Mesh(tailGeometry, tailMaterial);
    this.tail.position.set(-0.8, 0.16, 0);

    this.totalCow = new THREE.Group();
    this.totalCow.add(this.body);
    this.totalCow.add(this.head);
    this.totalCow.add(eye1);
    this.totalCow.add(eye2);
    this.totalCow.add(snout);
    this.totalCow.add(this.ear1);
    this.totalCow.add(this.ear2);
    this.totalCow.add(this.tail);

    this.totalCow.position.set(0, 1, 0);
  }

  translate(x, y, z){
    this.totalCow.position.x += x;
    this.totalCow.position.y += y;
    this.totalCow.position.z += z;
  }
}

export { Cow };
