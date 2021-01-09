import * as THREE from 'three'

import presetScene, { consulters } from '../../scene-preset'
import { AudioProperties } from 'scene-preset/state/audios'

// https://threejs.org/docs/api/en/geometries/WireframeGeometry.html

const { getAudioProperties } = consulters

const configuration = {
  distance: 15,
  y: 50,
  scale: 1,
  amount: 20,
  speed: 0.001,
}
let maxAverageFrequency = 0
let averageFrequecy = 0

function getWireframedObject(geometry): THREE.Object3D {
  const copiedGeometry = geometry.clone()
  const material = new THREE.MeshBasicMaterial({
    color: 0x000,
    wireframe: true,
  })
  const mesh = new THREE.Mesh(copiedGeometry, material)

  mesh.position.set(0, configuration.y, 0)

  return mesh
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

  presetScene({
    setup({ scene }) {

      scene.add(dancingTribe)
    },
    animate() {
      makeTribeDance(getAudioProperties(audio), dancingTribe)
    },
  })
}