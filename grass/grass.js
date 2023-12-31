import * as THREE from 'three'
import { vertexShader, fragmentShader } from './grassShaders'

const BLADE_WIDTH = 0.25
const BLADE_HEIGHT = 0.55
const BLADE_HEIGHT_VARIATION = 0.4
const BLADE_VERTEX_COUNT = 5
const BLADE_TIP_OFFSET = 0.1

function interpolate(val, oldMin, oldMax, newMin, newMax) {
  return ((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin
}

export class GrassGeometry extends THREE.BufferGeometry {

  constructor(size, count) {
    super()

    const positions = []
    const uvs = []
    const indices = []

    for (let i = 0; i < count; i++) {
      const surfaceMin = (size / 2) * -1
      const surfaceMax = size / 2

      const x = (size) * Math.random() - (size/2)
      const y = (size) * Math.random() 

      uvs.push(
        ...Array.from({ length: BLADE_VERTEX_COUNT }).flatMap(() => [
          interpolate(x, surfaceMin, surfaceMax, 0, 1),
          interpolate(y, surfaceMin, surfaceMax, 0, 1)
        ])
      )
 
      const blade = this.computeBlade([x, 0, y], i)
      positions.push(...blade.positions)
      indices.push(...blade.indices)
    }

    this.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    )
    this.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2))
    this.setIndex(indices)
    this.computeVertexNormals()
    
  }

  // Grass blade generation, covered in https://smythdesign.com/blog/stylized-grass-webgl
  computeBlade(center, index = 0) {
    const height = BLADE_HEIGHT + Math.random() * BLADE_HEIGHT_VARIATION
    const vIndex = index * BLADE_VERTEX_COUNT

    // Randomize blade orientation and tip angle
    const yaw = Math.random() * Math.PI * 2
    const yawVec = [Math.sin(yaw), 0, -Math.cos(yaw)]
    const bend = Math.random() * Math.PI * 2
    const bendVec = [Math.sin(bend), 0, -Math.cos(bend)]

    // Calc bottom, middle, and tip vertices
    const bl = yawVec.map((n, i) => n * (BLADE_WIDTH / 2) * 1 + center[i])
    const br = yawVec.map((n, i) => n * (BLADE_WIDTH / 2) * -1 + center[i])
    const tl = yawVec.map((n, i) => n * (BLADE_WIDTH / 3) * 1 + center[i])
    const tr = yawVec.map((n, i) => n * (BLADE_WIDTH / 3) * -1 + center[i])
    const tc = bendVec.map((n, i) => n * BLADE_TIP_OFFSET + center[i])

    // Attenuate height
    tl[1] += height / 2
    tr[1] += height / 2
    tc[1] += height

    return {
      positions: [...bl, ...br, ...tr, ...tl, ...tc],
      indices: [
        vIndex,
        vIndex + 1,
        vIndex + 2,
        vIndex + 2,
        vIndex + 4,
        vIndex + 3,
        vIndex + 3,
        vIndex,
        vIndex + 2
      ]
    }
  }
}

class Grass extends THREE.Mesh {
  allElements = []

  constructor(size, count) {
    const geometry = new GrassGeometry(size, count)
   // const geometry = new THREE.BoxGeometry();
    const material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      side: THREE.DoubleSide,
      vertexShader,
      fragmentShader,
    })
    super(geometry, material)
    this.allElements.push(geometry);

   const floorGeometry = new THREE.BoxGeometry(size,1,size).translate(0, 0,size/2)
    const floor = new THREE.Mesh(
      floorGeometry,
      material
     // new THREE.MeshStandardMaterial({color: "#33994d"})
    )
    floor.receiveShadow = true;
    floor.position.y = -Number.EPSILON
    this.add(floor)
    this.allElements.push(floorGeometry)
  }

  animate(time) {
    this.material.uniforms.uTime.value = time*.75
  }

  translate(x,y,z){
    this.allElements.forEach((each) => each.translate(x,y,z))
  }
}

export { Grass }