import * as THREE from "three";

class Tractor extends THREE.Mesh {
  shapesList = [];

  constructor() {
    super();

    this.makeBody();
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
    this.shapesList.push(sq1);

    const sq2 = new THREE.BoxGeometry(3,1.5,1.5);
    sq2.translate(-1, -.5, 0)
    const mesh2 = new THREE.Mesh(sq2, material)
    this.add(mesh2)
    this.shapesList.push(sq2)

    const stem = new THREE.CylinderGeometry(.3, .3, 1, 5)
    stem.translate(-.2, 1.6, -.1)
    const stemMesh = new THREE.Mesh(stem, new THREE.MeshToonMaterial({color: "black"}))
    this.add(stemMesh)
    this.shapesList.push(stem)
  }

  makeWheels(left){
    const outerMat = new THREE.MeshToonMaterial({color: "black"})
    const innerMat = new THREE.MeshToonMaterial({color: "yellow"})

    const bigWheel = new THREE.CylinderGeometry(1, 1, .5, 7, 1)
    bigWheel.rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(0,-.75,left? -1.1 : 1.1)
    const bigMesh = new THREE.Mesh(bigWheel, outerMat);
    this.add(bigMesh)
    this.shapesList.push(bigWheel)
    const bigInner = new THREE.CylinderGeometry(.7, .7, .5, 9, 1)
    bigInner.rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(0,-.75,left? -1.1 : 1.1)
    bigInner.translate(0, 0, left? -.1 : .1)
    const bigInnerMesh = new THREE.Mesh(bigInner, innerMat)
    this.add(bigInnerMesh)
    this.shapesList.push(bigInner)

    const littleWheel = new THREE.CylinderGeometry(.6, .6, .5, 7, 1)
    littleWheel.rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(-1.75,-.85,left? -.7 : .7)
    const littleMesh = new THREE.Mesh(littleWheel, outerMat);
    this.add(littleMesh)
    this.shapesList.push(littleWheel)
    const littleInner = new THREE.CylinderGeometry(.4, .4, .1, 9, 1)
    littleInner.rotateZ(Math.PI/2).rotateY(Math.PI/2).translate(-1.75,-.85,left? -1.1 : 1.1)
    littleInner.translate(0, 0, left? .12 : -.12)
    const littleInnerMesh = new THREE.Mesh(littleInner, innerMat)
    this.add(littleInnerMesh)
    this.shapesList.push(littleInner)
  }

  translate(x, y, z) {
    this.shapesList.forEach((each) => each.translate(x, y, z));
  }

  animate() {}
}

export { Tractor };
