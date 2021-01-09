import * as THREE from 'three'

import presetScene from 'scene-preset'

// https://threejs.org/docs/api/en/geometries/TorusBufferGeometry.html

const configuration = {
  y: 50,
  rotation: 0.01,
  stackedTorusAmount: 5,
}

function getTorus({
  radius = 1,
  tube = 0.25,
  radialSegments = 16,
  tubularSegments = 64,
  arc = Math.PI * 2,
  color = 0x990000,
}): THREE.Object3D {
  const geometry = new THREE.TorusBufferGeometry(radius, tube, radialSegments, tubularSegments, arc)
  const material = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.receiveShadow = true
  mesh.castShadow = true

  return mesh
}

function getStackedTorusGroup(amount = 10): THREE.Group {
  const group = new THREE.Group()

  group.name = 'stackedTorus'

  for (let i = 0; i < amount; i++) {
    const torus = getTorus({
      radius: (i + 2) * 1.5,
    })

    torus.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    )

    group.add(torus)
  }

  group.position.y = configuration.y

  return group
}

function makeStackedTorusRotate(stackedTorus: THREE.Group) {
  stackedTorus.children.forEach(torus => {
    torus.rotation.x += configuration.rotation
    torus.rotation.y += configuration.rotation
    torus.rotation.z += configuration.rotation
  })
}

export default function TorusBufferGeometry() {
  const stackedTorus = getStackedTorusGroup(configuration.stackedTorusAmount)

  presetScene({
    setup({ scene }) {
      scene.add(stackedTorus)
    },
    animate() {
      makeStackedTorusRotate(stackedTorus)
    },
  })
}