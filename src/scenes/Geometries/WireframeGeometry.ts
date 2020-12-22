import * as THREE from 'three'

import presetScene, { consulters } from '../../scenePreset'
import { AudioProperties } from '../../scenePreset/state/audios'

// https://threejs.org/docs/api/en/geometries/WireframeGeometry.html

const configuration = {
  distance: 10,
  y: 3,
  scale: 1,
  amount: 20,
  speed: 0.001,
}
let maxAverageFrequency = 0
let averageFrequecy = 0

function getWireframedObject(geometry): THREE.Object3D {
  const copiedGeometry = geometry.clone()
  const wireframe = new THREE.WireframeGeometry(copiedGeometry)
  const material = new THREE.MeshStandardMaterial({ color: 0x000 })
  const line = new THREE.LineSegments(wireframe, material)

  line.material['depthTest'] = false
  line.material['opacity'] = 0.25
  line.material['transparent'] = true

  line.position.set(0, configuration.scale, 0)

  return line
}

function getObjectDancingTribe(geometry): THREE.Group {
  const group = new THREE.Group()

  for (let i = 0; i < configuration.amount; i++) {
    const wireframedObject = getWireframedObject(geometry)
    const rotation = i / configuration.amount * (Math.PI * 2)

    wireframedObject.position.x = Math.sin(rotation) * configuration.distance
    wireframedObject.position.z = Math.cos(rotation) * configuration.distance

    group.add(wireframedObject)
  }

  return group
}

function makeTribeDance(audioProperties: AudioProperties, dancingTribe: THREE.Group) {
  if (audioProperties) {
    averageFrequecy = audioProperties.averageFrequecy

    if (averageFrequecy > maxAverageFrequency) {
      maxAverageFrequency = averageFrequecy
    }
  }

  const scale = averageFrequecy / maxAverageFrequency

  dancingTribe.rotation.y += configuration.speed

  dancingTribe.children.forEach(child => {
    child.rotation.x += configuration.speed * 10
    child.rotation.y += configuration.speed * 10
    child.rotation.z += configuration.speed * 10

    if (averageFrequecy) {
      child.scale.set(scale, scale, scale)
    }
  })
}

export default function WireframeGeometry() {
  const audio = document.getElementById('audio') as HTMLMediaElement
  const geometry = new THREE.BoxBufferGeometry(
    configuration.scale,
    configuration.scale,
    configuration.scale,
  )
  const dancingTribe = getObjectDancingTribe(geometry)
  let audioProperties: AudioProperties

  audioProperties = consulters.getAudioProperties(audio)

  presetScene({
    setup({ scene, }) {
      scene.add(dancingTribe)
    },
    animate() {
      makeTribeDance(audioProperties, dancingTribe)
    },
  })
}