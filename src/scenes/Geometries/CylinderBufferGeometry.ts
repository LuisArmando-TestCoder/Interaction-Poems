import * as THREE from 'three'

import presetScene from '../../scenePreset'

// https://threejs.org/docs/api/en/geometries/CylinderBufferGeometry.html

const configuration = {
  ringsAmount: 10
}

function getCylinder({
  radiusTop = 0,
  height = 1,
  radialSegments = 3,
  color = 0x990000
}): THREE.Object3D {
  const radiusBottom = 10
  const geometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments)
  const material = new THREE.MeshStandardMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.y = height / 2

  return mesh
}

function getRitual(distance: number): THREE.Group {
  const group = new THREE.Group()

  for (let i = 0; i < distance / 10; i++) {
    const step = i / (distance / 10 + 1) * (Math.PI * 2)
    const cylinder = getCylinder({ height: (distance / 60) ** 2 })

    cylinder.position.x = Math.sin(step) * (distance / 2.5)
    cylinder.position.z = Math.cos(step) * (distance / 2.5)

    group.add(cylinder)
  }

  return group
}

function getRituals(ringsAmount: number): THREE.Group {
  const group = new THREE.Group()
  const minimumDistance = 5

  for (let i = minimumDistance; i < ringsAmount + minimumDistance; i++) {
    const ritual = getRitual(i ** 3)

    group.add(ritual)
  }

  return group
}

export default function CylinderBufferGeometry() {
  const rituals = getRituals(configuration.ringsAmount)

  presetScene({
    setup({ scene }) {
      scene.add(rituals)
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}