import * as THREE from 'three'

import presetScene, { actions, events } from '../../scenePreset'

// https://threejs.org/docs/api/en/geometries/BoxBufferGeometry.html

const configuration = {
  y: 50,
}

export default function BoxBufferGeometry() {
  presetScene({
    setup({ scene, canvas }) {
      events.onKey('j').end(() => {
        actions.saveCanvasScreen(canvas)
      })
      actions.blacklistObjects({ scene, blacklist: ['floor'] })
    },
    animate({ defaultScene }) {
      if (defaultScene) {
        const simpleCube: THREE.Object3D = defaultScene.objects.getObjectByName('simpleCube')

        simpleCube.position.y = configuration.y
      }
    },
  })
}