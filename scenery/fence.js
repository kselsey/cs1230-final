import * as THREE from "three";

class Fence extends THREE.Mesh {
  shapesList = [];

  constructor(length) {
    super();

    for (let i=0; i<length; i++){
        const material = new THREE.MeshToonMaterial({color: "white"})

        this.makePosts(i, material);
        this.makeBars(i, material);
    }
  }

  makePosts(index, material){
    const post1 = new THREE.CylinderGeometry(.2, .2, 4, 5)
    post1.translate(index*5,1.5,0)
    const post1Mesh = new THREE.Mesh(post1, material);
    this.add(post1Mesh);
    this.shapesList.push(post1);

    const top1 = new THREE.CylinderGeometry(.07, .2, .75, 5)
    top1.translate(index*5,3.85,0)
    const top1Mesh = new THREE.Mesh(top1, material)
    this.add(top1Mesh);
    this.shapesList.push(top1);

    const post2 = new THREE.CylinderGeometry(.2, .2, 4, 5)
    post2.translate(-3 + index*5,1.5,0)
    const post2Mesh = new THREE.Mesh(post2, material);
    this.add(post2Mesh);
    this.shapesList.push(post2);

    const top2 = new THREE.CylinderGeometry(.07, .2, .75, 5)
    top2.translate(-3 + index*5,3.85,0)
    const top2Mesh = new THREE.Mesh(top2, material)
    this.add(top2Mesh);
    this.shapesList.push(top2);
  }

  makeBars(index, material){
    // const bar1 = new THREE.CylinderGeometry(.17, .17, 5, 5)
    // bar1.rotateZ(Math.PI/2).translate(-1.5 + index*5,5,0);
    // const bar1Mesh = new THREE.Mesh(bar1, material)
    // this.add(bar1Mesh);
    // this.shapesList.push(bar1);

    // const bar2 = new THREE.CylinderGeometry(.17, .17, 5, 5)
    // bar2.rotateZ(Math.PI/2).translate(-1.5 + index*5,4,0);
    // const bar2Mesh = new THREE.Mesh(bar2, material)
    // this.add(bar2Mesh);
    // this.shapesList.push(bar2);

    const bar3 = new THREE.CylinderGeometry(.17, .17, 5, 5)
    bar3.rotateZ(Math.PI/2).translate(-1.5 + index*5,3,0);
    const bar3Mesh = new THREE.Mesh(bar3, material)
    this.add(bar3Mesh);
    this.shapesList.push(bar3);

    const bar4 = new THREE.CylinderGeometry(.17, .17, 5, 5)
    bar4.rotateZ(Math.PI/2).translate(-1.5 + index*5,2,0);
    const bar4Mesh = new THREE.Mesh(bar4, material)
    this.add(bar4Mesh);
    this.shapesList.push(bar4);
  }

  translate(x, y, z) {
    this.shapesList.forEach((each) => each.translate(x, y, z));
  }

  animate() {}
}

export { Fence };