import * as THREE from 'three'

import * as defaultObjects  from './defaultObjects'

import { CanvasState } from '../state/canvases'

export function setDefaultObjects(canvasState: CanvasState) {
    const lights = defaultObjects.getLightGroup(canvasState)
    const floor = defaultObjects.getFloor(canvasState)
    const simpleCube = defaultObjects.getSimpleCube(canvasState)
    const objects = new THREE.Group()

    objects.name = canvasState.presetConfiguration.componentNames.OBJECTS

    objects.add(simpleCube)

    canvasState.defaultScene = {
        floor,
        objects,
        lights,
    }
}

export function addDefaultObjects(canvasState: CanvasState) {
    Object.keys(canvasState.defaultScene).forEach(name => {
        canvasState.scene.add(canvasState.defaultScene[name])
    })
}