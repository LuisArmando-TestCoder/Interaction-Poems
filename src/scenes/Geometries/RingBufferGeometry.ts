import * as THREE from 'three'

import getSetupScene from '../../sceneSetup/getSetupScene'
import sceneUtilsGroup from '../../sceneSetup/SceneUtilsGroup'

// https://threejs.org/docs/api/en/geometries/RingBufferGeometry.html

const colorPalette = [
  '#EF2BFA',
  '#6A35DE',
  '#477EF5',
  '#35D3DE',
  '#3DFF8C'
]
const height = 150

function getSpinRings(amount: number): THREE.Group {
  const group = new THREE.Group()
  for (let itemIndex = 0; itemIndex < amount; itemIndex++) {
    const ring = getRing({
      color: colorPalette[Math.round(Math.random() * colorPalette.length)],
      y: height
    })
    const portion = itemIndex / amount
    const spins = 100
    const spiralRadius = Math.sin(portion * Math.PI) * height

    ring.position.set(
      Math.sin(portion * spins) * spiralRadius,
      0,
      Math.cos(portion * spins) * spiralRadius
    )
    
    group.add(ring)
  }

  return group
}

function updateSpinRings(waveRings: THREE.Group) {
  waveRings.children.forEach((ring, itemIndex) => {
    spinSphereRings(ring, itemIndex, waveRings)
  })
}

function spinSphereRings(ring, itemIndex, waveRings) {
  const spins = Date.now() / 1000
  const portion = itemIndex / waveRings.children.length
  const spiralRadius = Math.sin(portion * Math.PI) * height
  const portionSineDistribution = Math.sin((portion - 0.5) * 2 * (Math.PI / 2))
  const heightCenter = height * 2

  ring.lookAt(0, heightCenter, 0)

  ring.position.set(
    Math.sin(portion * spins) * spiralRadius,
    portionSineDistribution * height + heightCenter,
    Math.cos(portion * spins) * spiralRadius
  )

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

  return mesh
}

export default function RingBufferGeometry() {
  const spinRings = getSpinRings(550)

  getSetupScene({
    setup({ renderer, scene, camera, defaultSceneObjects }) {
      scene.add(spinRings)
      console.log('sceneUtilsGroup', sceneUtilsGroup)
    },
    animate({ renderer, scene, camera, defaultSceneObjects }) {
      updateSpinRings(spinRings)
    },
  })
}