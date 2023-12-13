import * as THREE from "three";

class Hay {
    constructor() {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const texture = new THREE.TextureLoader().load('textures/hayTexture.jpg');
        const material = new THREE.MeshToonMaterial({ map: texture});
        this.hayBail = new THREE.Mesh(geometry, material);
        this.hayBail.map = texture;
        this.totalHay = new THREE.Group();
        this.totalHay.add(this.hayBail);
        this.totalHay.position.set(0, 1, 0);
    }
}

export { Hay }