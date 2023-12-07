import * as THREE from "three";

class Barn extends THREE.Mesh {
  shapesList = [];

  constructor() {
    super();

    this.makeBarn();
    this.makeFrontWindows();
    this.makeSideWindows(true);
    this.makeSideWindows(false);

    this.shapesList.forEach((each) => each.translate(12, 3, 8));
  }

  translate(x, z) {
    this.shapesList.forEach((each) => each.translate(x, 0, z));
  }

  makeBarn() {
    const barnTexture = new THREE.TextureLoader().load(
      "textures/redWoodTexture.png"
    );
   // const barnMaterial = new THREE.MeshPhongMaterial({ map: barnTexture });
    const barnMaterial = new THREE.MeshToonMaterial({color: "red", map: barnTexture})
    const roofTexture = new THREE.TextureLoader().load(
      "textures/roofTexture.webp"
    );
    roofTexture.wrapS = THREE.RepeatWrapping;
    roofTexture.wrapT = THREE.RepeatWrapping;
    roofTexture.repeat.set(4, 4);

   // const roofMaterial = new THREE.MeshPhongMaterial({ map: roofTexture });
   const roofMaterial = new THREE.MeshToonMaterial({color: "#403532", map: roofTexture})

    const barnBox = new THREE.BoxGeometry(8, 5, 10);
    const barnMesh = new THREE.Mesh(barnBox, barnMaterial)
    barnMesh.castShadow = true;
    this.add(barnMesh);
    this.shapesList.push(barnBox);

    const roof = new THREE.CylinderGeometry(
      5,
      5,
      10,
      3,
      1,
      false,
      0,
      2 * Math.PI
    );
    roof
      .rotateX(Math.PI / 2)
      .rotateZ(Math.PI / 3)
      .translate(0, 5, 0);
    this.add(new THREE.Mesh(roof, roofMaterial));
    this.shapesList.push(roof);
  }

  makeFrontWindows() {
    const material = new THREE.MeshToonMaterial({ color: "white" });

    const l1 = new THREE.BoxGeometry(0.1, 4, 0.1);
    l1.translate(-2, -0.5, 5);
    this.add(new THREE.Mesh(l1, material));
    this.shapesList.push(l1);
    const l2 = new THREE.BoxGeometry(0.1, 4, 0.1);
    l2.translate(2, -0.5, 5);
    this.add(new THREE.Mesh(l2, material));
    this.shapesList.push(l2);

    const l3 = new THREE.BoxGeometry(4.1, 0.1, 0.1);
    l3.translate(0, 1.5, 5);
    this.add(new THREE.Mesh(l3, material));
    this.shapesList.push(l3);

    const l4 = new THREE.BoxGeometry(Math.sqrt(32), 0.1, 0.1);
    l4.translate(-1, -1, 5).rotateZ(Math.PI / 4);
    this.add(new THREE.Mesh(l4, material));
    this.shapesList.push(l4);
    const l5 = new THREE.BoxGeometry(Math.sqrt(32), 0.1, 0.1);
    l5.translate(1, -1, 5).rotateZ(-Math.PI / 4);
    this.add(new THREE.Mesh(l5, material));
    this.shapesList.push(l5);

    const l6 = new THREE.BoxGeometry(4.1, 0.1, 0.1);
    l6.translate(0, 0.5, 5);
    this.add(new THREE.Mesh(l6, material));
    this.shapesList.push(l6);

    const l7 = new THREE.BoxGeometry(0.1, 1, 0.1);
    l7.translate(0, 1, 5);
    this.add(new THREE.Mesh(l7, material));
    this.shapesList.push(l7);
    const l8 = new THREE.BoxGeometry(0.1, 1, 0.1);
    l8.translate(-1, 1, 5);
    this.add(new THREE.Mesh(l8, material));
    this.shapesList.push(l8);
    const l9 = new THREE.BoxGeometry(0.1, 1, 0.1);
    l9.translate(1, 1, 5);
    this.add(new THREE.Mesh(l9, material));
    this.shapesList.push(l9);
  }

  makeSideWindows(left) {
    const x = left ? -4 : 4;
    const material = new THREE.MeshToonMaterial({ color: "white" });

    for (let i = -1; i < 2; i++) {
      const sq11 = new THREE.BoxGeometry(0.1, 1.5, 0.1);
      sq11.translate(x, 0, -0.75 + 2 * i);
      this.add(new THREE.Mesh(sq11, material));
      this.shapesList.push(sq11);
      const sq12 = new THREE.BoxGeometry(0.1, 1.5, 0.1);
      sq12.translate(x, 0, 0.75 + 2 * i);
      this.add(new THREE.Mesh(sq12, material));
      this.shapesList.push(sq12);
      const sq13 = new THREE.BoxGeometry(0.1, 0.1, 1.5);
      sq13.translate(x, -0.75, 0 + 2 * i);
      this.add(new THREE.Mesh(sq13, material));
      this.shapesList.push(sq13);
      const sq14 = new THREE.BoxGeometry(0.1, 0.1, 1.5);
      sq14.translate(x, 0.75, 0 + 2 * i);
      this.add(new THREE.Mesh(sq14, material));
      this.shapesList.push(sq14);
      const sq15 = new THREE.BoxGeometry(
        0.1,
        0.1,
        Math.sqrt(2 * Math.pow(1.5, 2))
      );
      sq15.translate(x, i * 1.5, 0 + 1.4 * i).rotateX(Math.PI / 4);
      this.add(new THREE.Mesh(sq15, material));
      this.shapesList.push(sq15);
    }
  }
}

export { Barn };
