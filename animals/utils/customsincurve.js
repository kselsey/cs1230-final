import * as THREE from 'three'

class CustomSinCurve extends THREE.Curve {
  constructor(scale = 1, amplitude = 1) {
    super();
    this.scale = scale;
    this.amplitude = amplitude;
  }

  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const tx = t * 3 - 1.5;
    const ty = this.amplitude * Math.sin(8 * Math.PI * t);
    const tz = 0;

    return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
  }
}

export { CustomSinCurve };