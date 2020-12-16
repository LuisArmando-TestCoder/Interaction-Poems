import * as THREE from 'three'

import * as defaultObjects  from './defaultObjects'

import { CanvasState } from '../canvasesState'

interface FilterListParemeters {
    canvasState: CanvasState
    list: string[]
    objects: THREE.Object3D[]
}

function filterWhitelistObjects(filterListParemeters: FilterListParemeters) {
    const { list: whitelist, canvasState } = filterListParemeters
    const objects = [...filterListParemeters.objects]

    objects.forEach(object => {
        if (!whitelist.includes(object.name)) {
            let hasSonInWhitelist = false
            for (const name of whitelist) {
                if (object.getObjectByName(name)) {
                    hasSonInWhitelist = true
                    break
                }
            }
            
            if (!hasSonInWhitelist) {
                const chosenParent = object.parent || canvasState.scene

                chosenParent.remove(object)
                return
            }

            const newFilterListParemeters = { ...filterListParemeters, objects: object.children }

            filterWhitelistObjects(newFilterListParemeters)
        }
    })
}

function filterBlacklistObjects(filterListParemeters: FilterListParemeters) {
    const { list: blacklist, canvasState } = filterListParemeters
    const objects = [...filterListParemeters.objects]

    objects.forEach(object => {
        blacklist.forEach(name => {
            if (object.name === name) {
                const chosenParent = object.parent || canvasState.scene

                chosenParent.remove(object)
            } else if (object.children.length) {
                const newFilterListParemeters = { ...filterListParemeters, objects: object.children }

                filterBlacklistObjects(newFilterListParemeters)
            }
        })
    })
}

export function filterDisabledObjects(canvasState: CanvasState, objects: THREE.Object3D[]) {
    const { objectsFilter } = canvasState.presetConfiguration
    const { whitelist, blacklist, disableAll } = objectsFilter

    if (disableAll) {
        [...objects].forEach(object => object.parent.remove(object))
    } else if (whitelist.length) {
        filterWhitelistObjects({ canvasState, list: whitelist, objects })
    } else if (blacklist.length) {
        filterBlacklistObjects({ canvasState, list: blacklist, objects })
    }
}

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