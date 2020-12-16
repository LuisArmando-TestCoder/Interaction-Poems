import * as THREE from 'three'

import { CanvasState } from '../../canvasesState'

export default function addDefaultObject(canvasState: CanvasState): THREE.Mesh {
    const height = 1
    const material = new THREE.MeshStandardMaterial({ color: 0x44ffff })
    const mesh = new THREE.Mesh(
        new THREE.BoxBufferGeometry(height, height, height),
        material
    )

    mesh.position.y = height / 2
    mesh.castShadow = true
    mesh.receiveShadow = false
    mesh.name = canvasState.presetConfiguration.componentNames.CUBE

    return mesh
}