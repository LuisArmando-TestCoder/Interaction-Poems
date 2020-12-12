import * as THREE from 'three'
import presetScene from '../../scenePreset'
// https://threejs.org/docs/api/en/lights/AmbientLight.html
export default function AmbientLight() {
  presetScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}