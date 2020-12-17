import * as THREE from 'three'

import componentNames from './componentNames'

export type KeyCombinationOrder = 'unsorted' | 'sorted'

export type CombinationOrderKeyTuple = [order: KeyCombinationOrder, keyCombination: string]

export type CanvasStateCallback = (canvasState: CanvasState) => void

export class KeyLifeCycleObject {
    start: CanvasStateCallback[] = [] // executes callbacks once if combination was not present in queue
    present: CanvasStateCallback[] = [] // executes callbacks on animation while combination is present in queue
    end: CanvasStateCallback[] = [] // executes callbacks when eky combinations goes out of queue
}

export type KeyCombination = { [index: string]: KeyLifeCycleObject }

export interface KeyCombinationOrders {
    sorted: KeyCombination // accepts combination only in that order
    unsorted: KeyCombination // accepts combination in any order
}

export class PresetConfiguration {
    objectsFilter = {
        whitelist: [],
        blacklist: [],
        disableAll: false,
    }
    controlsBlacklist: string[] = []
    componentNames = componentNames
    ambient = {
        color: 0xffffff,
        alpha: 1,
    }
    renderer = {
        antialias: true,
    }
    camera = {
        fov: 32,
        near: 0.1,
        far: 2000,
        zoom: {
            max: 100,
            min: 10,
        }
    }
    shadowMapEnabled = true
    near = 5
    far = 1000
}

export interface PresetSceneCallbacks {
    setup: CanvasStateCallback
    animate: CanvasStateCallback
}

export interface IntersectionUtils {
    matrices: {
        callbacks: Function[][]
        objects: THREE.Object3D[][]
    }
    raycaster: THREE.Raycaster
}

export interface DefaultScene {
    floor: THREE.Mesh
    objects: THREE.Group
    lights: THREE.Group
}

export class CanvasState {
    intersectionUtils: IntersectionUtils
    defaultScene: DefaultScene
    
    canvasSelector: string
    canvas: HTMLCanvasElement

    renderer: THREE.Renderer
    camera: THREE.Camera
    scene: THREE.Scene

    animations: CanvasStateCallback[]
    keyCombinationOrders: KeyCombinationOrders
    keyCombinationsQueue: string[] = []

    presetConfiguration = new PresetConfiguration()
}

export type CanvasesState = { [index: string]: CanvasState }

const canvasesState: CanvasesState = {}

export default canvasesState