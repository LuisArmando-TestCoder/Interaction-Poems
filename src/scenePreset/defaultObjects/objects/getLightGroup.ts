import * as THREE from 'three'

import { CanvasState } from '../../state/canvases'

function getHemisphereLight(): THREE.Light {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hemiLight.position.set(0, 20, 0)

    return hemiLight
}

function getDirectionalLight(): THREE.Light {
    const directionalLight = new THREE.DirectionalLight(0xffffff)

    directionalLight.position.set(3, 10, 10)
    directionalLight.shadow.camera.top = 2
    directionalLight.shadow.camera.bottom = - 2
    directionalLight.shadow.camera.left = - 2
    directionalLight.shadow.camera.right = 2
    directionalLight.shadow.camera.near = 0.1
    directionalLight.shadow.camera.far = 40
    directionalLight.castShadow = true

    return directionalLight
}

export default function getLights(canvasState: CanvasState): THREE.Group {
    const hemisphereLight = getHemisphereLight()
    const directionalLight = getDirectionalLight()
    const lightGroup = new THREE.Group()

    lightGroup.name = canvasState.presetConfiguration.componentNames.LIGHTS

    lightGroup.add(hemisphereLight)
    lightGroup.add(directionalLight)

    return lightGroup
}
