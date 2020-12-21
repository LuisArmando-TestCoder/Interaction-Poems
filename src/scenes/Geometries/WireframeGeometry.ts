import * as THREE from 'three'

import presetScene, { consulters } from '../../scenePreset'

// https://threejs.org/docs/api/en/geometries/WireframeGeometry.html

export default function WireframeGeometry() {
  // const audio = document.getElementById('audio') as HTMLMediaElement
  // let audioProperties

  // audio.addEventListener('play', () => {
  //   audioProperties = consulters.getAudioProperties(audio) 
  // })

  presetScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}