import * as THREE from "three";
import { CustomSinCurve } from "./utils/customsincurve";

class Pig{
  constructor() {
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bodyMaterial = new THREE.MeshToonMaterial({ color: 0xf7d3d2 });
    this.body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    const headGeometry = new THREE.SphereGeometry(0.75, 32, 32);
    const texture = new THREE.TextureLoader().load('textures/pigTexture.jpg');
    const headMaterial = new THREE.MeshToonMaterial({ map: texture });
    texture.encoding = THREE.sRGBEncoding;
    this.head = new THREE.Mesh(headGeometry, headMaterial);
    this.head.map = texture;
    this.head.position.set(1.5, 0.5, 0);

    const earGeometry = new THREE.ConeGeometry(0.25, 0.5, 3);
    const earMaterial = new THREE.MeshToonMaterial({ color: 0xf096cd });
    this.ear1 = new THREE.Mesh(earGeometry, earMaterial);
    this.ear2 = new THREE.Mesh(earGeometry, earMaterial);
    this.ear1.position.set(1.25, 1.3, -0.45);
    this.ear2.position.set(1.25, 1.3, 0.45);
    this.ear1.rotation.x = -Math.PI / 6;
    this.ear2.rotation.x = Math.PI / 6;

    const path = new CustomSinCurve(0.5, 0.5);
    const tailGeometry = new THREE.TubeGeometry(path, 80, 0.1, 20);
    const tailMaterial = new THREE.MeshToonMaterial({ color: 0xf9dad9 });
    this.tail = new THREE.Mesh(tailGeometry, tailMaterial);
    this.tail.position.set(-0.75, 0.35, 0);


    this.totalPig = new THREE.Group();
    this.totalPig.add(this.body);
    this.totalPig.add(this.head);
    this.totalPig.add(this.ear1);
    this.totalPig.add(this.ear2);
    this.totalPig.add(this.tail);

    this.totalPig.position.set(0, 1, 0); // modify this in the scene
  }

  translate(x, y, z){
    this.totalPig.position.x += x;
    this.totalPig.position.y += y;
    this.totalPig.position.z += z;
  }
}

export { Pig };
