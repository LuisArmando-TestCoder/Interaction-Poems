import * as THREE from 'three'

import presetScene from '../../scenePreset'

// https://threejs.org/docs/api/en/geometries/SphereBufferGeometry.html

function getSphere({
  radius = 1
}): THREE.Object3D {
  const geometry = new THREE.SphereBufferGeometry(radius);
  const material = new THREE.MeshBasicMaterial({ color: 0x900 });
  const mesh = new THREE.Mesh(geometry, material);

  return mesh
}

export default function SphereBufferGeometry() {
  const sphere = getSphere({ radius: 2 })
  presetScene({
    setup({ scene }) {
      scene.add(sphere)
    },
  })
}