import * as THREE from 'three'

import presetScene, { actions, events } from '../../scenePreset'

// https://threejs.org/docs/api/en/geometries/BoxBufferGeometry.html

const configuration = {
  y: 50,
}

export default function BoxBufferGeometry() {
  const mainSceneWrapper = document.getElementById('mainSceneWrapper')

  presetScene({
    setup({ scene, canvas }) {
      events.onKey('j').end(() => {
        actions.screenshotCanvas(canvas)
      })
      events.onKey('k').end(() => {
        actions.toggleFullscreen(mainSceneWrapper)
      })
      events.onKey('p').end(() => {
        actions.toggleVR('canvas')
      })

      const recorder = actions.getCanvasRecorder(canvas)

      actions.downloadCanvasRecordingOnStop(recorder)

      events.onKey('l').start(() => {
        const switchKey = recorder.state !== 'recording' ? 'start' : 'stop'

        recorder[switchKey]()
      })

      actions.blacklistObjects({ scene, blacklist: ['SimpleFloor'] })

      // elevating default SimpleCube
      const simpleCube: THREE.Object3D = scene.getObjectByName('SimpleCube')

      simpleCube.position.y = configuration.y
    },
  })
}