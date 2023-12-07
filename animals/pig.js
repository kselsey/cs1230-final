import * as THREE from "three";

class Pig {
  constructor() {
    const bodyGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xf774d1 });
    this.body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const headTexture = textureLoader.load("textures/pigTexture.png");
    const headMaterial = new THREE.MeshBasicMaterial({ map: headTexture });
    this.head = new THREE.Mesh(headGeometry, headMaterial);
    this.head.position.set(2, 0.5, 0);

    this.totalPig = new THREE.Group();
    this.totalPig.add(this.body);
    this.totalPig.add(this.head);

    this.totalPig.position.set(0, 1, 0); // modify this in the scene
  }
}

export { Pig };
