import * as THREE from 'three'

import presetScene, { actions, events, consulters, state } from '../../scene-preset'

// https://threejs.org/docs/api/en/geometries/BoxBufferGeometry.html

import { fragmentShader } from '../Shaders/MisticalColors'

const configuration = {
  y: 50,
}

function getBox(size = 2): THREE.Object3D {
  const geometry = new THREE.BoxBufferGeometry(size, size, size)
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    side: THREE.DoubleSide,
  })

  actions.setUniforms(material)

  const mesh = new THREE.Mesh(geometry, material)

  return mesh
}

export default function BoxBufferGeometry() {
  const mainSceneWrapper = document.getElementById('mainSceneWrapper')

  presetScene({
    setup({ scene, canvas, canvasSelector }) {
      const canvasState = consulters.getCanvasState(canvasSelector)
      
      canvasState.presetConfiguration.camera
        .cameraVectorsState.position.min.y = -Infinity

      canvasState.presetConfiguration.camera
        .cameraVectorsState.position.y = 2

      events.onKey('j').end(() => {
        actions.screenshotCanvas(canvas)
      })
      events.onKey('k').end(() => {
        actions.toggleFullscreen(mainSceneWrapper)
      })
      events.onKey('p').end(() => {
        actions.toggleVR('canvas')
      })

      const recorder = consulters.getCanvasRecorder(canvas)

      actions.downloadCanvasRecordingOnStop(recorder)

      events.onKey('l').start(() => {
        const switchKey = recorder.state !== 'recording' ? 'start' : 'stop'

        recorder[switchKey]()
      })

      // actions.blacklistObjects({ scene, blacklist: ['SimpleFloor', 'SimpleCube'] })
      // actions.blacklistControls(['setFirstPersonPosition'], canvasSelector)

      const box = getBox()

      box.position.y = configuration.y

      scene.add(box)
    },
  }, 'canvas')
}