import * as THREE from "three";

class Apple extends THREE.Mesh {
  shapesList = [];

  shapesList = [];

  constructor() {
    super();

    this.makeApple();
    this.makeStem();
  }

  translate(x, y, z) {
    this.shapesList.forEach((each) => each.translate(x, y, z));
  }


  makeApple() {
    const material = new THREE.MeshToonMaterial({ color: "#B4231F" });
    const appleGeometry = new THREE.SphereGeometry(.2, 6, 6, 0, 2*Math.PI, 0, Math.PI);
    const apple = new THREE.Mesh(appleGeometry, material)
    this.add(apple);
    this.shapesList.push(appleGeometry);
  }

  makeStem(){
    const material = new THREE.MeshToonMaterial({ color: "#320806" });
    const appleGeometry = new THREE.BoxGeometry(.05, .15, .05)
    appleGeometry.translate(0,.2,0)
    const apple = new THREE.Mesh(appleGeometry, material)
    this.add(apple);
    this.shapesList.push(appleGeometry);
  }
}

export { Apple };
