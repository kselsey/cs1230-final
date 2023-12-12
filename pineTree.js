import * as THREE from 'three'

// Class for a pine tree 
export class PineTree extends THREE.Mesh{
    // Stores all of the primitives that make up the tree
    shapesList = [];

    // Creates a pine tree at the given world space coordinate
    constructor(x, y, z) {
        super();
        this.makeTrunk();
        this.makeLeaves();
        // Translate tree into desired place
        this.shapesList.forEach(shape => shape.translate(x, y, z))
    }

    /**
     * Creates a Mesh for the pine tree's trunk
     * Texture source: https://www.freepik.com/free-vector/dark-wood-cartoon-style-texture_1076803.htm" 
     *                 Image by 0melapics on Freepik
     */
    makeTrunk() {
        let trunkTexture = new THREE.TextureLoader().load("textures/treeBark.jpg")
        trunkTexture.wrapS = THREE.RepeatWrapping;
        trunkTexture.wrapT = THREE.RepeatWrapping;
        trunkTexture.repeat.set(1, 2);
        let trunkMaterial = new THREE.MeshToonMaterial({color : "#7a5227", map : trunkTexture})
        let trunkGeometry = new THREE.CylinderGeometry(0.25, 0.5, 10, 32, 1, false, 0, 2 * Math.PI)
        let trunkMesh = new THREE.Mesh(trunkGeometry, trunkMaterial)
        this.shapesList.push(trunkGeometry)
        this.add(trunkMesh)
    }

    /**
     * Creates the leaves for the pine tree
     */
    makeLeaves() {
        let leafMaterial = new THREE.MeshToonMaterial({color : "#138549"})
        for (let i = 0; i < 7; i++) {
            let leafGeometry = new THREE.ConeGeometry(2 - (i * 0.20), 3, 32, 4, false, 0, 2 * Math.PI)
            leafGeometry.translate(0, -1 + (i * 1), 0)
            let leafMesh = new THREE.Mesh(leafGeometry, leafMaterial)
            this.shapesList.push(leafGeometry)
            this.add(leafMesh)
        }
    }
}
