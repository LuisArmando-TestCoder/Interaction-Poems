import * as THREE from 'three'
import { TimelineMax } from 'gsap'

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

function getBallTimeline(position: THREE.Vector3): TimelineMax {
  const timeline = new TimelineMax()

  timeline
  .set(position, { y: 0 })
  .to(position, { y: 2 })
  .duration(1)

  return timeline
}

export default function SphereBufferGeometry() {
  const sphere = getSphere({})
  const ballTimeline = getBallTimeline(sphere.position)

  ballTimeline.pause()

  events.onKey('u')
    .start(() => {
      ballTimeline.restart()
    })
    .end(() => { /* Fireworks? */ })

  presetScene({
    setup({ scene }) {
      scene.add(sphere)
    },
  })
}