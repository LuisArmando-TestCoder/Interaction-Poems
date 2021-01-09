import * as THREE from 'three'

import presetScene, { actions } from '../../scene-preset'

// https://threejs.org/docs/api/en/geometries/PlaneBufferGeometry.html

// const vertexShader = ``
const fragmentShader = /* cs */ `
uniform float iTime;
uniform vec2 iResolution;

void main() {
  gl_FragColor = vec4( 1., 0., 0., 1.);
}
`

function getSquare({
  size = 3,
  x = 0,
  y = 0,
  z = 0,
}): THREE.Mesh {
  const geometry = new THREE.PlaneBufferGeometry(size, size)
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material)
  const iGeometryResolution = new THREE.Vector2(1, 1)

  mesh.position.set(x, y, z)
  actions.setUniforms(material, {
    iGeometryResolution: () => iGeometryResolution
  })

  return mesh
}

export default function PlaneBufferGeometry() {
  const square = getSquare({ y: 2., z: 10 })

  presetScene({
    setup({ scene }) {
      scene.add(square);
    },
  })
}