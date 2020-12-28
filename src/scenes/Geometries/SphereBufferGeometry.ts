import * as THREE from 'three'
import { TimelineMax } from 'gsap'

import presetScene, { events } from '../../scenePreset'

// https://threejs.org/docs/api/en/geometries/SphereBufferGeometry.html

const configuration = {
  segments: 100,
  height: 3,
}

function getSphere({
  radius = 0.5,
  color = 0xee0000
}): THREE.Object3D {
  const geometry = new THREE.SphereBufferGeometry(radius, configuration.segments, configuration.segments)
  const material = new THREE.MeshStandardMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)

  return mesh
}

function getExplodingSpheres(amount = 12): THREE.Group {
  const group = new THREE.Group()

  for (let i = 0; i < amount; i++) {
    const sphere = getSphere({ radius: Math.random() / 5, color: 0x009999 })

    sphere.position.y = configuration.height

    group.add(sphere)
  }

  group.visible = false

  return group
}

function getBallTimeline(ball: THREE.Object3D, group: THREE.Group): TimelineMax {
  const distance = 0.01
  const timeline = new TimelineMax()

  timeline
  .set(ball.position, { y: 0.5 })
  .set(ball.scale, { x: 0, y: 0, z: 0 })
  .to(ball.scale, { x: configuration.height / 2, y: configuration.height / 2, z: configuration.height / 2 }, 0)
  .to(ball.position, { y: configuration.height }, 0)
  .to(ball.scale, { y: 0, x: 0, z: 0 })
  .duration(1)
  .to(group, { visible: true })
  .call(() => {
    group.children.forEach((particle, i) => {
      const timelinePosition = 1
      const getAxisPosition = axis => 
                              particle.position[axis]
                            + Math.sin(Math.random() * Math.PI * 2)
                            * (i * particle.scale[axis] + 1) ** 2
                            * distance

      timeline
      .set(particle.position, { x: 0, y: configuration.height, z: 0 }, timelinePosition)
      .to(particle.position, {
        x: getAxisPosition('x'),
        y: getAxisPosition('y'),
        z: getAxisPosition('z'),
      }, timelinePosition)
      .to(particle.scale, { x: 0, y: 0, z: 0 }, timelinePosition)
      .set(particle.position, { x: 0, y: configuration.height, z: 0 }, timelinePosition)
    })
  })
  .duration(1)
  .set(group, { visible: false })

  return timeline
}

export default function SphereBufferGeometry() {
  const sphere = getSphere({})
  const explodingSpheres = getExplodingSpheres()
  const ballTimeline = getBallTimeline(sphere, explodingSpheres)

  ballTimeline.restart()

  events.onKey('u')
    .start(() => {
      ballTimeline.restart()
    })
    .end(() => { /* Fireworks? */ })

  presetScene({
    setup({ scene, defaultScene }) {
      scene.add(sphere)
      scene.add(explodingSpheres)
    },
  })
}