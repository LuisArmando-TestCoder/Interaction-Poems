import * as THREE from 'three'

import presetScene, { events } from '../../scenePreset'

// https://threejs.org/docs/api/en/geometries/SphereBufferGeometry.html

const configuration = {
  segments: 100,
}

function getSphere({
  radius = 0.5
}): THREE.Object3D {
  const geometry = new THREE.SphereBufferGeometry(radius, configuration.segments, configuration.segments);
  const material = new THREE.MeshStandardMaterial({ color: 0x990000 });
  const mesh = new THREE.Mesh(geometry, material);

  return mesh
}

export default function SphereBufferGeometry() {
  const sphere = getSphere({})
  events.onKey('u')
  .start(() => {})
  .end(() => {})

  presetScene({
    setup({ scene }) {
      scene.add(sphere)
    },
  })
}