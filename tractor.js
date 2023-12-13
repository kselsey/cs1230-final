import * as THREE from "three";

class Tractor extends THREE.Mesh {
  totalTractor;

  constructor() {
    super();

    this.totalTractor =  new THREE.Group();

    this.makeBody();
    this.makeWindow(true);
    this.makeWindow(false);
    this.makeWheels(true);
    this.makeWheels(false);
  }

  makeBody(){
    const tractorTexture = new THREE.TextureLoader().load(
       // "textures/tractorLogo.png"
        "textures/redWoodTexture.png"
      );
    tractorTexture.wrapS = THREE.RepeatWrapping;
    tractorTexture.wrapT = THREE.RepeatWrapping;
    tractorTexture.repeat.set(6, 6);
    const material = new THREE.MeshToonMaterial({color: "#1DAE12", map: tractorTexture})
    const sq1 = new THREE.BoxGeometry(2,3,2)
    const mesh1 = new THREE.Mesh(sq1, material);
    this.add(mesh1);
    this.totalTractor.add(mesh1)

    const sq2 = new THREE.BoxGeometry(3,1.5,1.5);
    sq2.translate(-1, -.5, 0)
    const mesh2 = new THREE.Mesh(sq2, material)
    this.add(mesh2)
    this.totalTractor.add(mesh2)

    const stem = new THREE.CylinderGeometry(.3, .3, 1, 5)
    stem.translate(-.2, 1.6, -.1)
    const stemMesh = new THREE.Mesh(stem, new THREE.MeshToonMaterial({color: "black"}))
    this.add(stemMesh)
    this.totalTractor.add(stemMesh)
  }

  makeWindow(upper){
    const mat = new THREE.MeshToonMaterial({color: "black"})

    const top = new THREE.BoxGeometry(.1,.1,1)
    top.translate(upper? -1 : -2.5, upper? 1.2 : -.3 , 0);
    const topMesh = new THREE.Mesh(top, mat)
    this.add(topMesh)
    this.totalTractor.add(topMesh)

    const bottom = new THREE.BoxGeometry(.1,.1,1)
    bottom.translate(upper? -1 : -2.5, upper? .6 : -.9, 0)
    const bottomMesh = new THREE.Mesh(bottom, mat)
    this.add(bottomMesh)
    this.totalTractor.add(bottomMesh)

    const left = new THREE.BoxGeometry(.1,.6,.1)
    left.translate(upper? -1 : -2.5, upper? .9 : -.6, -.5)
    const leftMesh = new THREE.Mesh(left, mat)
    this.add(leftMesh)
    this.totalTractor.add(leftMesh)

    const right = new THREE.BoxGeometry(.1,.6,.1)
    right.translate(upper? -1 : -2.5, upper? .9 : -.6, .5)
    const rightMesh = new THREE.Mesh(right, mat)
    this.add(rightMesh)
    this.totalTractor.add(rightMesh)
  }

  makeWheels(left){
    const outerMat = new THREE.MeshToonMaterial({color: "black"})
    const innerMat = new THREE.MeshToonMaterial({color: "yellow"})

    const bigWheel = new THREE.CylinderGeometry(1, 1, .5, 7, 1)
    bigWheel.rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(0,-.75,left? -1.1 : 1.1)
    const bigMesh = new THREE.Mesh(bigWheel, outerMat);
    this.add(bigMesh)
    this.totalTractor.add(bigMesh)
    const bigInner = new THREE.CylinderGeometry(.7, .7, .5, 9, 1)
    bigInner.rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(0,-.75,left? -1.1 : 1.1)
    bigInner.translate(0, 0, left? -.1 : .1)
    const bigInnerMesh = new THREE.Mesh(bigInner, innerMat)
    this.add(bigInnerMesh)
    this.totalTractor.add(bigInnerMesh)

    const littleWheel = new THREE.CylinderGeometry(.6, .6, .5, 7, 1)
    littleWheel.rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(-1.75,-.85,left? -.7 : .7)
    const littleMesh = new THREE.Mesh(littleWheel, outerMat);
    this.add(littleMesh)
    this.totalTractor.add(littleMesh)
    const littleInner = new THREE.CylinderGeometry(.4, .4, .1, 9, 1)
    littleInner.rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(-1.75,-.85,left? -1.1 : 1.1)
    littleInner.translate(0, 0, left? .12 : -.12)
    const littleInnerMesh = new THREE.Mesh(littleInner, innerMat)
    this.add(littleInnerMesh)
    this.totalTractor.add(littleInnerMesh)
  }

  translate(x, y, z) {
    this.totalTractor.position.x += x;
    this.totalTractor.position.y += y;
    this.totalTractor.position.z += z;
  }

  animate() {}
}

export { Tractor };
