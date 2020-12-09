import * as THREE from 'three'
import getSetupScene from '../../scenePreset/getSetupScene'
// https://threejs.org/docs/api/en/lights/AmbientLight.html
export default function AmbientLight() {
  getSetupScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}