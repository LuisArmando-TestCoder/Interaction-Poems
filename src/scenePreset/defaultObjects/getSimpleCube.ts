import * as THREE from 'three'

export default function addDefaultObject(): THREE.Mesh {
    const height = 1
    const material = new THREE.MeshStandardMaterial({ color: 0x44ffff })
    const mesh = new THREE.Mesh(
        new THREE.BoxBufferGeometry(height, height, height),
        material
    )

    mesh.position.y = height / 2
    mesh.castShadow = true
    mesh.receiveShadow = false
    mesh.name = 'defaultSimpleCube'

    return mesh
}