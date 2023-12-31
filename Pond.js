import * as THREE from 'three'

let center_x;
let center_z;

var direction1 = {value: 1};
var direction2 = {value: 1};
var direction3 = {value: -1};
var direction4 = {value: -1};
var direction5 = {value: 1};

let duck1List = [];
let duck2List = [];
let duck3List = [];
let duck4List = [];
let duck5List = [];

var d1rand = {value: 0.005};
var d1rand2 = {value: 0.005};

var d2rand = {value: 0.005};
var d2rand2 = {value: 0.005};

var d3rand = {value: 0.005};
var d3rand2 = {value: 0.005};

var d4rand = {value: 0.005};
var d4rand2 = {value: 0.005};

var d5rand = {value: 0.005};
var d5rand2 = {value: 0.005};

class Pond extends THREE.Mesh {

    constructor() {
        super();

        this.makeWater();
        this.makeDuck(duck1List);
        this.makeDuck(duck2List);
        this.makeDuck(duck3List);
        this.makeDuck(duck4List);
        this.makeDuck(duck5List);
        

        duck1List.forEach(each => each.geometry.scale(0.5, 0.5, 0.5));
        duck2List.forEach(each => each.geometry.scale(0.5, 0.5, 0.5));
        duck3List.forEach(each => each.geometry.scale(0.5, 0.5, 0.5));
        duck4List.forEach(each => each.geometry.scale(0.5, 0.5, 0.5));
        duck5List.forEach(each => each.geometry.scale(0.5, 0.5, 0.5));
        

        duck1List.forEach(each => each.geometry.translate(-4, 0.5, 15));
        duck2List.forEach(each => each.geometry.translate(-4, 0.5, 15));
        duck3List.forEach(each => each.geometry.translate(-4, 0.5, 15));
        duck4List.forEach(each => each.geometry.translate(-4, 0.5, 15));
        duck5List.forEach(each => each.geometry.translate(-4, 0.5, 15));
        

        duck2List.forEach(each => each.position.x = each.position.x - 1);
        duck2List.forEach(each => each.position.z = each.position.z + 3);
        
        duck3List.forEach(each => each.position.x = each.position.x - 2);
        duck3List.forEach(each => each.position.z = each.position.z - 3.5);

        duck4List.forEach(each => each.position.x = each.position.x - 4);
        duck4List.forEach(each => each.position.z = each.position.z + 1);

        duck5List.forEach(each => each.position.x = each.position.x - 3);
        duck5List.forEach(each => each.position.z = each.position.z + 4);

        // this.entirePond = new THREE.Group();
        // this.entirePond.add(this.water);
        // this.entirePond.add(this.dirt);

      }
      
      makeWater() {
        
        const geometry = new THREE.CircleGeometry( 7, 24 );
        geometry.rotateX(-Math.PI/2)
        geometry.translate(-10, 1, 30);
        const waterTexture = new THREE.TextureLoader().load('textures/pond.svg');
        waterTexture.encoding = THREE.sRGBEncoding;
        const material = new THREE.MeshStandardMaterial({ map: waterTexture });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.map = waterTexture;
        material.alphaTest = .5
		mesh.receiveShadow = true;
        this.add(mesh);

        const dirt_g = new THREE.CylinderGeometry( 7.5, 10.5, 1.5, 35 );
        dirt_g.translate(-10, 0.2, 30);
        const dirtTexture = new THREE.TextureLoader().load('textures/dirt.jpg');
        dirtTexture.encoding = THREE.sRGBEncoding;
        const dirt_m = new THREE.MeshStandardMaterial({ map: dirtTexture });
        const dirt = new THREE.Mesh(dirt_g, dirt_m);
        this.add(dirt);

        center_x = mesh.position.x;
        center_z = mesh.position.z
    
    }

    makeDuck(list) {

        // the head
        const head_g = new THREE.SphereGeometry( 0.4, 24, 24 );
        head_g.translate(-9.5, 1.6, 30);
        if(list == duck3List || list == duck4List){
            head_g.translate(-0.75, 0, 0);
        }
        const head_m = new THREE.MeshToonMaterial({ color: "yellow" });
        const head = new THREE.Mesh(head_g, head_m);

        // the beak
        const beak_g = new THREE.ConeGeometry( 0.15, 0.5, 16 );
        if(list == duck3List || list == duck4List){
            beak_g.rotateZ(Math.PI/2)
            beak_g.translate(-1.75, 0, 0);
        } else {
            beak_g.rotateZ(-Math.PI/2);
        }
        beak_g.translate(-9, 1.6, 30);
        const beak_m = new THREE.MeshToonMaterial({ color: "orange" });
        const beak = new THREE.Mesh(beak_g, beak_m);

        // the body
        const body_g = new THREE.SphereGeometry( 0.75, 24, 24 );
        body_g.translate(-10, 0.75, 30);
        const body_m = new THREE.MeshToonMaterial({ color: "yellow" });
        const body = new THREE.Mesh(body_g, body_m);

        // the two eyes
        const eye_g = new THREE.SphereGeometry( 0.10, 24, 24 );
        const eye_g2 = new THREE.SphereGeometry( 0.10, 24, 24 );
        if(list == duck3List || list == duck4List){
            eye_g.translate(-10.1, 1.7, 30.3);
            eye_g2.translate(-10.1, 1.7, 29.7);
        } else {
            eye_g.translate(-9.6, 1.7, 30.3);
            eye_g2.translate(-9.6, 1.7, 29.7);
        }
        const eye_m = new THREE.MeshToonMaterial({ color: "black" });
        const eye = new THREE.Mesh(eye_g, eye_m);
        const eye2 = new THREE.Mesh(eye_g2, eye_m);

        body.castShadow = true;
        head.castShadow = true;
        //beak.castShadow = true;

        list.push(head);
        list.push(beak);
        list.push(body);
        list.push(eye);
        list.push(eye2);

        this.add(head);
        this.add(beak);
        this.add(body);
        this.add(eye);
        this.add(eye2);
    
    }
    animate(){
        
        // check if 2 given ducks colide, updating global variables as needed
        function check_duck_collision(list1, list2, r1, r2, r3, r4, d1, d2){
            var target = new THREE.Vector3();
            list1[2].getWorldPosition( target );
            var target2 = new THREE.Vector3();
            list2[2].getWorldPosition( target2 );

            if((Math.abs(target.x - target2.x) < 0.8) && (Math.abs(target.z - target2.z) < 0.8)){

                d1.value = -(d1.value );  
                d2.value = -(d2.value ); 
        
                r1.value = Math.random() * (10 - 2) + 2;
                r1.value  = r1.value  / 1000;
            
                r2.value  = Math.random() * (10 - 2) + 2;
                r2.value  = r2.value  / 1000;    
                
                r3.value  = Math.random() * (10 - 2) + 2;
                r3.value  = r3.value  / 1000;
            
                r4.value  = Math.random() * (10 - 2) + 2;
                r4.value  = r4.value  / 1000; 
                }
        }

        // check if a duck is out of bounds of the pond, updating global variables as needed
        function check_out_of_bounds(list, r1, r2, direction){
            if(list[2].position.x > center_x + 4.25 || list[2].position.x < center_x - 4.25
                || list[2].position.z > center_z + 4.25 || list[2].position.z < center_z - 4.25){
                direction.value  = -(direction.value );  
                r1.value  = Math.random() * (10 - 2) + 2;
                r1.value  = r1.value  / 1000;
        
                r2.value  = Math.random() * (10 - 2) + 2;
                r2.value  = r2.value  / 1000;
            }
        }

    // collision between duck 1 and duck 2
    check_duck_collision(duck1List, duck2List, d1rand, d1rand2, d2rand, d2rand2, direction1, direction2)

    // collision between duck 1 and duck 3
    check_duck_collision(duck1List, duck3List, d1rand, d1rand2, d3rand, d3rand2, direction1, direction3)

    // collision between duck 2 and duck 3
    check_duck_collision(duck2List, duck3List, d2rand, d2rand2, d3rand, d3rand2, direction2, direction3)

    // collision between duck 1 and duck 4
    check_duck_collision(duck1List, duck4List, d1rand, d1rand2, d4rand, d4rand2, direction1, direction4)

    // collision between duck 1 and duck 5
    check_duck_collision(duck2List, duck5List, d2rand, d2rand2, d5rand, d5rand2, direction2, direction5)

    // collision between duck 2 and duck 4
    check_duck_collision(duck2List, duck4List, d2rand, d2rand2, d4rand, d4rand2, direction2, direction4)

    // collision between duck 2 and duck 5
    check_duck_collision(duck2List, duck5List, d2rand, d2rand2, d5rand, d5rand2, direction2, direction5)

    // collision between duck 3 and duck 4
    check_duck_collision(duck3List, duck4List, d3rand, d3rand2, d4rand, d4rand2, direction3, direction4)

    // collision between duck 3 and duck 5
    check_duck_collision(duck5List, duck3List, d5rand, d5rand2, d3rand, d3rand2, direction5, direction3)

    // collision between duck 4 and duck 5
    check_duck_collision(duck4List, duck5List, d4rand, d4rand2, d5rand, d5rand2, direction4, direction5)

    // is duck 1 out of bounds
    check_out_of_bounds(duck1List, d1rand, d1rand2, direction1);

    // is duck 2 out of bounds
    check_out_of_bounds(duck2List, d2rand, d2rand2, direction2);

    // is duck 3 out of bounds
    check_out_of_bounds(duck3List, d3rand, d3rand2, direction3);

    // is duck 4 out of bounds
    check_out_of_bounds(duck4List, d4rand, d4rand2, direction4);

    // is duck 5 out of bounds
    check_out_of_bounds(duck5List, d5rand, d5rand2, direction5);

    //update duck 1's position
    duck1List.forEach(each => each.position.x = each.position.x + (direction1.value ) * 1.5 * d1rand.value );
    duck1List.forEach(each => each.position.z = each.position.z + (direction1.value ) * 1.5 * d1rand2.value );

    //update duck 2's position
    duck2List.forEach(each => each.position.x = each.position.x + (direction2.value ) * 1.5 * d2rand.value );
    duck2List.forEach(each => each.position.z = each.position.z + (direction2.value ) * 1.5 * d2rand2.value );

    //update duck 3's position
    duck3List.forEach(each => each.position.x = each.position.x + (direction3.value ) * 1.5 * d3rand.value );
    duck3List.forEach(each => each.position.z = each.position.z + (direction3.value ) * 1.5 * d3rand2.value );

    //update duck 4's position
    duck4List.forEach(each => each.position.x = each.position.x + (direction4.value ) * 1.5 * d4rand.value );
    duck4List.forEach(each => each.position.z = each.position.z + (direction4.value ) * 1.5 * d4rand2.value );

    //update duck 5's position
    duck5List.forEach(each => each.position.x = each.position.x + (direction5.value ) * 1.5 * d5rand.value );
    duck5List.forEach(each => each.position.z = each.position.z + (direction5.value ) * 1.5 * d5rand2.value );
    }
  }
  
  export { Pond }




  