import * as THREE from "three";

class LilyPad {
  constructor() {

    const Geometry = new THREE.CircleGeometry( 0.5, 30, 0, 5.5 );
    const Material = new THREE.MeshBasicMaterial({ color: 0x5cad40 });
    this.shape = new THREE.Mesh(Geometry, Material);

  }
}

export { LilyPad };
