import * as THREE from "three";
import { Apple } from "./apple.js"

class AppleTree extends THREE.Mesh {
  shapesList = [];

  constructor() {
    super();

    this.makeTrunk();
    this.makeBushes();

    this.shapesList.forEach((each) => each.translate(-2, 1.5, 8));
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
    const apple = new Apple();
    this.add(apple)
    this.shapesList.push(apple)
    const bushMaterial = new THREE.MeshToonMaterial({color: "#0E4008"});
    const bushRadius = 7;
    for (let i=0; i<300; i++){
        const xOffset = -bushRadius/2 + Math.random()*bushRadius;
        const yOffset = -bushRadius/2 + Math.random()*bushRadius;
        const zOffset = -bushRadius/2 + Math.random()*bushRadius;
        if (Math.sqrt(Math.pow(xOffset,2)+Math.pow(yOffset,2)+Math.pow(zOffset,2))<=bushRadius/2){
            const bush = new THREE.SphereGeometry(1, 5, 5, 0, 2*Math.PI, 0, Math.PI)
            const bushMesh = new THREE.Mesh(bush, bushMaterial);
            bush.translate(xOffset,7+yOffset,zOffset)
            this.add(bushMesh)
            this.shapesList.push(bush)
        };
    }
  }

  move(x, z) {
    this.shapesList.forEach((each) => each.translate(x, 0, z));
  }
}

export { AppleTree };
