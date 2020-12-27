import * as THREE from 'three'

import presetScene, { events } from '../../scenePreset'

// https://threejs.org/docs/api/en/geometries/RingBufferGeometry.html

const colorPalette = [
  '#f00',
  '#f99',
]
const height = 25
const amount = 100

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

    group.name = 'spinningRings'
    
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
  innerRadius = 0.5,
  outerRadius = 2,
  thetaSegments = 3,
  phiSegments = 1,
  thetaStart = 1,
  thetaLength = Math.PI * 2,
  color = 'rgb(255, 68, 68)',
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
  const spinRings = getSpinRings(amount)

  presetScene({
    setup({ scene }) {
      scene.add(spinRings)
    },
    animate() {
      updateSpinRings(spinRings)
    },
  })
}