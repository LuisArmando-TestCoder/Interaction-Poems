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
        actions.saveCanvasScreen(canvas)
      })
      events.onKey('k').end(() => {
        actions.toggleFullscreen(mainSceneWrapper)
      })
      events.onKey('p').end(() => {
        actions.toggleVR('canvas')
      })
      actions.blacklistObjects({ scene, blacklist: ['floor'] })

      // elevating default SimpleCube
      const simpleCube: THREE.Object3D = scene.getObjectByName('SimpleCube')

      simpleCube.position.y = configuration.y
    },
  })
}