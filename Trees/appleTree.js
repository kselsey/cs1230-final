import * as THREE from "three";
import { Apple } from "./apple.js"

class AppleTree extends THREE.Mesh {
  shapesList = [];
  appleList = [];
  position;

  constructor() {
    super();

    this.makeTrunk();
    this.makeBushes();

    this.shapesList.forEach((each) => each.translate(-2, 1.5, 8));
    this.position = new THREE.Vector3(-2,1.5,8)
  }

  makeTrunk(){
    let trunkTexture = new THREE.TextureLoader().load("textures/treeBark.jpg");
    trunkTexture.wrapS = THREE.RepeatWrapping;
    trunkTexture.wrapT = THREE.RepeatWrapping;
    const trunkMaterial = new THREE.MeshToonMaterial({ color: "#401C08" , map: trunkTexture});
    const trunk = new THREE.CylinderGeometry(1,1,9,5,1,false,0,2 * Math.PI);
    const trunkMesh = new THREE.Mesh(trunk, trunkMaterial);
    this.add(trunkMesh)
    this.shapesList.push(trunk)
  }

  makeBushes(){
    const bushMaterial = new THREE.MeshToonMaterial({color: "#0E4008"});
    const bushRadius = 7;
    for (let i=0; i<300; i++){
        const xOffset = -bushRadius/2 + Math.random()*bushRadius;
        const yOffset = -bushRadius/2 + Math.random()*bushRadius;
        const zOffset = -bushRadius/2 + Math.random()*bushRadius;
        if (Math.sqrt(Math.pow(xOffset,2)+Math.pow(yOffset,2)+Math.pow(zOffset,2))<=bushRadius/2){
          if (Math.abs(xOffset)>.2 && Math.abs(yOffset)>.2 && Math.abs(zOffset)>.2){
            const bush = new THREE.SphereGeometry(1, 5, 5, 0, 2*Math.PI, 0, Math.PI)
            const bushMesh = new THREE.Mesh(bush, bushMaterial);
            bush.translate(xOffset,7+yOffset,zOffset)
            this.add(bushMesh)
            this.shapesList.push(bush)
            
            // apple
            const apple = new Apple();
            let outX = Math.floor((Math.random()*2)) - .5;
            let outY = Math.floor((Math.random()*2)) - .5;
            let outZ = Math.floor((Math.random()*2)) - .5;
            apple.translate(outX+xOffset, outY+7+yOffset, outZ+zOffset)
            this.add(apple)
            this.appleList.push(apple)
            this.shapesList.push(apple)
          }
        };
    }
  }

  translate(x, y, z) {
    this.shapesList.forEach((each) => each.translate(x, y, z));
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
  }

  animate(cameraPos) {
    if (Math.abs(cameraPos.x-this.position.x*2)<=5 && Math.abs(cameraPos.z-this.position.z*2)<=5){
      const appleIndex = Math.floor(Math.random()*this.appleList.length)*7;
      if (appleIndex<this.appleList.length){
        const appleToDrop = this.appleList[appleIndex];
        if (appleToDrop && !appleToDrop.hasFallen()){
          appleToDrop.drop();
        }
      }
    }
    this.appleList.forEach((each) => each.animate());
  }
}

export { AppleTree };
