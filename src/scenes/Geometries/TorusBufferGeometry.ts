import * as THREE from 'three'

import presetScene from '../../scenePreset'

// https://threejs.org/docs/api/en/geometries/TorusBufferGeometry.html

function getTorus({
  radius = 2,
  tube = 1,
  radialSegments = 1,
  tubularSegments = 64,
  color = 0x990000,
}): THREE.Object3D {
  const geometry = new THREE.TorusBufferGeometry(radius, tube, radialSegments, tubularSegments);
  const material = new THREE.MeshBasicMaterial( { color } );
  const mesh = new THREE.Mesh( geometry, material );

  return mesh
}

export default function TorusBufferGeometry() {
  presetScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}