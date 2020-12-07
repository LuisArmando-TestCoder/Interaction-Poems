import * as THREE from 'three'

import getSetupScene from '../getSetupScene'

// https://threejs.org/docs/api/en/geometries/RingBufferGeometry.html

const colorPalette = [
  '#EF2BFA',
  '#6A35DE',
  '#477EF5',
  '#35D3DE',
  '#3DFF8C'
]

function getSpinningRings(amount: number): THREE.Group {
  const group = new THREE.Group()
  const tunelSpacing = 30
  const y = 30
  for (let j = 0; j < amount; j++) {
    for (let i = 0; i < amount; i++) {
      const ring = getRing({
        color: colorPalette[Math.round(Math.random() * colorPalette.length)],
        y
      })
  
      ring.position.set(
        (j - amount / 2) * tunelSpacing,
        y,
        (i - amount / 2) * tunelSpacing
      )
      ring.rotation.z = -Math.PI / 2
      group.add(ring)
    }
  }

  return group
}

function waveRings(spinningRings: THREE.Group) {
  const speed = 0.005
  const amplifier = 10
  const waveReduction = 50

  spinningRings.children.forEach((mesh) => {
    mesh.position['original'] = mesh.position['original'] || { y: mesh.position.y }
    mesh.position.y = mesh.position['original'].y
                    + Math.sin((mesh.position.z + mesh.position.x) / waveReduction + Date.now() * speed)
                    * amplifier
  })
}

function getRing({
  innerRadius = 2.1,
  outerRadius = 6,
  thetaSegments = 3,
  phiSegments = 1,
  thetaStart = 1,
  thetaLength = Math.PI * 2,
  color = 'rgb(68, 255, 255)',
  y = 10
}): THREE.Object3D {
  const geometry = new THREE.RingBufferGeometry(
    innerRadius, outerRadius, thetaSegments,
    phiSegments, thetaStart, thetaLength
  )
  const material = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.y = y
  // mesh.castShadow = true
  // mesh.receiveShadow = false

  return mesh
}

export default function RingBufferGeometry() {
  const spinningRings = getSpinningRings(30)

  getSetupScene({
    setup({ renderer, scene, camera }) {
      scene.add(spinningRings)
    },
    animate({ renderer, scene, camera }) {
      waveRings(spinningRings)
    },
  })
}