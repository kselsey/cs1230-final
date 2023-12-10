import * as THREE from "three";

class Apple extends THREE.Mesh {
  shapesList = [];
  applePos = new THREE.Vector3();
  movingDown = false;
  down = false;
  velocity = 0;

  constructor() {
    super();

    this.makeApple();
    this.makeStem();
  }

  translate(x, y, z) {
    this.shapesList.forEach((each) => each.translate(x, y, z));
    this.applePos.x += x;
    this.applePos.y += y;
    this.applePos.z += z;
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

  hasFallen(){
    return this.movingDown || this.down;
  }

  animate() {
    if (!this.down){
      if (this.movingDown){
        this.velocity -= .002;
        this.translate(0,this.velocity,0);
      }
      if (this.applePos.y <= -.9){
        this.down = true;
        this.movingDown = false;
      }
    }
  }

  drop(){
    this.movingDown = true;
  }
}

export { Apple };
