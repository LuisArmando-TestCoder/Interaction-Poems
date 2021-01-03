import * as THREE from 'three'

import { CanvasState } from '../state/canvases'

import SimpleLightSet from '../SimpleLightSet'
import SimpleFloor from './SimpleFloor'
import SimpleCube from './SimpleCube'

function getDefaultObjects(): THREE.Group {
    const defaultObjects = new THREE.Group()
    const SimpleLightSet = new SimpleLightSet()
    const SimpleFloor = new SimpleFloor()
    const SimpleCube = new SimpleCube()

    defaultObjects.name = componentNames.DefaultObjects

    defaultObjects.add(SimpleLightSet)
    defaultObjects.add(SimpleFloor)
    defaultObjects.add(SimpleCube)

    return defaultObjects
}

export function addDefaultObjects(canvasState: CanvasState) {
    const defaultObjects = getDefaultObjects()

    canvasState.scene.add(defaultObjects)
}