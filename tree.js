import * as THREE from "three";

class Tree extends THREE.Mesh {
  shapesList = [];

  constructor() {
    super();

    this.makeTrunk();
    this.makeBush();

    this.shapesList.forEach((each) => each.translate(-2, 1.5, 8));
  }

  makeTrunk(){
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: "#401C08" });
    const trunk = new THREE.CylinderGeometry(1,1,9,5,1,false,0,2 * Math.PI);
    const trunkMesh = new THREE.Mesh(trunk, trunkMaterial);
    this.add(trunkMesh)
    this.shapesList.push(trunk)
  }

  makeBush(){
    const bushMaterial = new THREE.MeshPhongMaterial({color: "#0E4008"});
    const bushRadius = 7;
    for (let i=0; i<200; i++){
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
    // for (let i=0; i<3; i++){
    //     const bushMaterial = new THREE.MeshPhongMaterial({color: "#0E4008"})
    //     const bush = new THREE.CylinderGeometry(.2,2*(4-i)/4,3,5,1,false,0,2 * Math.PI);
    //     const bushMesh = new THREE.Mesh(bush, bushMaterial)
    //     bush.translate(0,1.5*(i+1),0)
    //     this.add(bushMesh)
    //     this.shapesList.push(bush)
    // }
  }

  translate(x, z) {
    this.shapesList.forEach((each) => each.translate(x, 0, z));
  }
}

export { Tree };
