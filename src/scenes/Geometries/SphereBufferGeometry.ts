import * as THREE from 'three'
import { TimelineMax } from 'gsap'

import presetScene, { events } from 'scene-preset'

// https://threejs.org/docs/api/en/geometries/SphereBufferGeometry.html

const configuration = {
  segments: 10,
  height: 3,
  particlesAmount: 100,
  distance: 50,
}

function getSphere({
  radius = 0.5,
  color = 0x009999,
  x = 0,
  z = 0,
  y = 0,
}): THREE.Object3D {
  const geometry = new THREE.SphereBufferGeometry(radius, configuration.segments, configuration.segments)
  const material = new THREE.MeshStandardMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(x, y, z)

  return mesh
}

function getExplodingSpheres(amount = 12): THREE.Group {
  const group = new THREE.Group()

  for (let i = 0; i < amount; i++) {
    const sphere = getSphere({ radius: Math.random() / 5, y: configuration.height })

    group.add(sphere)
  }

  group.visible = false

  return group
}

function getBallTimeline(ball: THREE.Object3D, group: THREE.Group): TimelineMax {
  const distance = 0.01
  const timeline = new TimelineMax()
  const timelinePosition = 1

  timeline
  .set(group, { visible: false })
  .set(ball.scale, { x: 0, y: 0, z: 0 })
  .to(ball.scale, {
    x: configuration.height / 2,
    y: configuration.height / 2,
    z: configuration.height / 2
  })
  .duration(1)
  .to(ball.scale, { x: 0, y: 0, z: 0 })
  .duration(1)
  .set(group, { visible: true })
  .call(() => {
    group.children.forEach((particle, i) => {
      const getAxisPosition = axis => 
                            + ball.position[axis]
                            + Math.sin(Math.random() * Math.PI * 2)
                            * (i * particle.scale[axis] + 1) ** 2
                            * distance

      timeline
      .set(particle.position, {
        x: ball.position.x,
        y: configuration.height,
        z: ball.position.z
      }, timelinePosition)
      .to(particle.position, {
        x: getAxisPosition('x'),
        y: getAxisPosition('y'),
        z: getAxisPosition('z'),
      }, timelinePosition)
      .to(particle.position, {
        y: `+= 50`,
      }, timelinePosition)
      .duration(10)
    })
  })

  return timeline
}

class Fireworks {
  objects: THREE.Group = new THREE.Group()
  timelines: TimelineMax[] = []
  areRestarted = false

  constructor(amount: number = 10) {
    for (let i = 0; i < amount; i++) {
      const rotation = i / amount * Math.PI * 2

      const sphere = getSphere({
        y: configuration.height,
        x: Math.sin(rotation) * configuration.distance,
        z: Math.cos(rotation) * configuration.distance,
      })
      const explodingSpheres = getExplodingSpheres(configuration.particlesAmount)
      const ballTimeline = getBallTimeline(sphere, explodingSpheres)
  
      this.timelines.push(ballTimeline)
      this.objects.add(sphere)
      this.objects.add(explodingSpheres)
    }
  }

  restart() {
    if (!this.areRestarted) {
      this.areRestarted = true

      this.timelines.forEach(timeline => timeline.restart())
    }
  }

  pause() {
    this.timelines.forEach(timeline => timeline.pause())
  }
}

export default function SphereBufferGeometry() {
  const fireworks = new Fireworks()
  
  fireworks.pause()

  events.onKey('u')
    .start(() => {
      fireworks.restart()
    })

  presetScene({
    setup({ scene }) {
      scene.add(fireworks.objects)
    },
  })
}