import * as THREE from 'three'
import presetScene from '../../scenePreset'
// https://threejs.org/docs/api/en/materials/RawShaderMaterial.html
export default function RawShaderMaterial() {
  presetScene({
    setup({ renderer, scene, camera, defaultScene }) {
    },
    animate({ renderer, scene, camera, defaultScene }) {
    },
  })
}