import * as THREE from 'three'

// Made with the help of: https://codinhood.com/post/create-skybox-with-threejs/
// Class for a Skybox
export class Skybox extends THREE.Mesh{
    // Constant part of the path to Skybox textures
    textureBasePath = "textures/skyboxOptions/skyWithGround";

    constructor() {
        super();
        let skyboxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
        let skyboxMaterials = this.createMaterialArray(this.textureBasePath);
        // Create skybox mesh
        this.add(new THREE.Mesh(skyboxGeometry, skyboxMaterials));
    }

    /**
     * Creates the file path strings for each texture of a Skybox
     * @param {*} fileBasePath - The constant part of the file path
     * @returns - An array of file path strings
     */
    createFilePaths(fileBasePath) {
        let fileType = ".png";
        let sides = ["Front", "Back", "Top", "Bottom", "Left", "Right"];
        let filePaths = [];
        // For each texture
        for (let side in sides) {
            // Create the corresponding filepath
            filePaths.push(fileBasePath + "_" + sides[side] + fileType);
        }
        return filePaths;
    }

    /**
     * Creates an array of mesh materials for each side of a Skybox
     * @param {*} fileBasePath - The constant part of the file path to the textures
     * @returns - An array of MeshBasicMaterials storing the Skybox's textures
     */
    createMaterialArray(fileBasePath) {
        let filePaths = this.createFilePaths(fileBasePath);
        let materialArray = [];
        // For each texture
        for (let file in filePaths) {
            // Load the texture
            let texture = new THREE.TextureLoader().load(filePaths[file]);
            // Map the texture to the backside of a mesh material
            let mesh = new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide});
            materialArray.push(mesh);
        }
        return materialArray;
    }
}
