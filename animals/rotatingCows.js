import * as THREE from "three";
import { Cow } from "./cow.js"
import { Hay } from "./hay.js"

class RotatingCows extends THREE.Mesh {
  shapesList = [];
  cows = [];
  rotationAngles = [];
  hay;
  position;

  constructor() {
    super();

    this.position = new THREE.Vector3()

     // adding cows
     const cow1 = new Cow();
     const cow2 = new Cow();
     const cow3 = new Cow();
     this.cows.push(cow1);
     this.cows.push(cow2);
     this.cows.push(cow3);
     this.add(cow1.totalCow);
     this.add(cow2.totalCow);
     this.add(cow3.totalCow);
        cow1.translate(-2,-1,5);
        cow2.translate(2,-1,0)
        cow3.translate(-2,-1,-5)

     // initial rotation of cows
     cow1.totalCow.rotateY(THREE.MathUtils.degToRad(90));
     cow2.totalCow.rotateY(THREE.MathUtils.degToRad(270));

     // adding hay
     this.hay = new Hay();
     this.add(this.hay.totalHay);
     this.hay.totalHay.position.set(0, 0, 0);

     // initial rotation angles
     this.rotationAngles = [0, (Math.PI/3)*2, (Math.PI/3)*4]
  }

  translate(x, y, z) {
 //   this.shapesList.forEach((each) => each.translate(x, y, z));
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
    this.hay.totalHay.position.x += x
    this.hay.totalHay.position.y += y
    this.hay.totalHay.position.z += z
    this.cows.forEach((cow) => cow.translate(x,y,z))
  }

  animate(cameraPos) {
    const radius = 3;
    const speed = 0.0000000001;
    for (let i=0; i<3; i++){
        const lastRotate = this.rotationAngles[i];
        const x = this.hay.totalHay.position.x + radius * Math.cos(this.rotationAngles[i]);
        const z = this.hay.totalHay.position.z + radius * Math.sin(this.rotationAngles[i]);
        const prevX = this.cows[i].totalCow.position.x;
        const prevZ = this.cows[i].totalCow.position.z;
        this.cows[i].totalCow.position.set(x,.5,z)

        this.rotationAngles[i] = Math.atan2(z - prevZ, x - prevX);
        this.cows[i].totalCow.rotation.y = this.rotationAngles[i];
        // this.cows[i].totalCow.rotateY(this.rotationAngles[i]-lastRotate)

        this.rotationAngles[i] += speed;
        if (this.rotationAngles[i] > Math.PI * 2) {
            this.rotationAngles[i] -= Math.PI * 2;
        }
    }
  }


}

export { RotatingCows };