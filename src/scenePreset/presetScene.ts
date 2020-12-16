import * as THREE from 'three'

import {
    filterDisabledObjects,
    setDefaultObjects,
    addDefaultObjects,
} from './defaultObjects'

import {
    setFilteredControls
} from './controls'

import setAnimationFrame from './setAnimationFrame'

import canvasesState, { CanvasState, PresetSceneCallbacks } from './canvasesState'

function getAspectRatio(canvas) {
    return canvas.clientWidth / canvas.clientHeight
}

function handleCanvasSize(canvasState: CanvasState) {
    const parent = canvasState.canvas.parentElement

    setCanvasToElementSize(canvasState, parent)

    new window['ResizeObserver'](() => {
        setCanvasToElementSize(canvasState, parent)
    }).observe(parent)
}

function setCanvasToElementSize(canvasState: CanvasState, element: HTMLElement) {
    const {
        canvas,
        camera,
        renderer,
    } = canvasState

    canvas.width = element.clientWidth
    canvas.height = element.clientHeight
    camera['aspect'] = window.innerWidth / window.innerHeight

    camera['updateProjectionMatrix']()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

class ScenePreset {
    canvasState: CanvasState

    constructor(canvasState: CanvasState) {
        this.canvasState = canvasState
    }

    setCamera() {
        this.canvasState.camera.lookAt(new THREE.Vector3())
    }

    setRenderer() {
        this.canvasState.renderer['shadowMap'].enabled = this.canvasState.presetConfiguration.shadowMapEnabled
        this.canvasState.renderer['outputEncoding'] = THREE.sRGBEncoding

        this.canvasState.renderer['setClearColor'](
            this.canvasState.presetConfiguration.ambient.color,
            this.canvasState.presetConfiguration.ambient.alpha
        )
    }

    setScene() {
        this.canvasState.scene.fog = new THREE.Fog(
            this.canvasState.presetConfiguration.ambient.color,
            this.canvasState.presetConfiguration.near,
            this.canvasState.presetConfiguration.far,
        )
        this.canvasState.scene.name = this.canvasState.canvasSelector
    }

    setCanvas() {
        this.canvasState.canvas.focus()
    }

    setSceneCallbacks(presetSceneCallbacks: PresetSceneCallbacks) {
        if (presetSceneCallbacks.setup) {
            presetSceneCallbacks.setup(this.canvasState)
        }

        if (!this.canvasState.animations) {
            this.canvasState.animations = [
                presetSceneCallbacks.animate,
            ]
    
            setAnimationFrame(this.canvasState.canvasSelector)
        }
    }
}

export default function presetScene(presetSceneCallbacks: PresetSceneCallbacks, canvasSelector = 'canvas') {
    const canvasState = canvasesState[canvasSelector] = new CanvasState()
    const canvas: HTMLCanvasElement = document.querySelector(canvasSelector)
    const camera = new THREE.PerspectiveCamera(
        canvasState.presetConfiguration.camera.fov,
        getAspectRatio(canvas),
        canvasState.presetConfiguration.camera.near,
        canvasState.presetConfiguration.camera.far
    )
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({
        canvas,
        ...canvasState.presetConfiguration.renderer,
    })

    canvasState.canvasSelector = canvasSelector
    canvasState.canvas = canvas
    canvasState.renderer = renderer
    canvasState.scene = scene
    canvasState.camera = camera

    const scenePreset = new ScenePreset(canvasState)

    scenePreset.setScene()
    scenePreset.setRenderer()
    scenePreset.setCamera()
    scenePreset.setCanvas()
    scenePreset.setSceneCallbacks(presetSceneCallbacks)

    setDefaultObjects(canvasState)
    addDefaultObjects(canvasState)
    filterDisabledObjects(canvasState, canvasState.scene.children)
    setFilteredControls(canvasState)
    handleCanvasSize(canvasState)
}