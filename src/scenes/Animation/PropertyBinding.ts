import * as THREE from 'three'
import presetScene from '../../scenePreset'
// https://threejs.org/docs/api/en/animation/PropertyBinding.html
export default function PropertyBinding() {
  presetScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}