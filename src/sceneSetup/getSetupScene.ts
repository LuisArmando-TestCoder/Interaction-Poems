import * as THREE from 'three'
import {
  setFirstPersonPosition,
  updateFirstPersonPosition,
} from './camera/controller/setFirstPersonPosition'
import setFirstPersonDirection from './camera/controller/setFirstPersonDirection'
import setFirstPersonZoom from './camera/controller/setFirstPersonZoom'
import getLightGroup from './defaultObjects/getLightGroup'
import getFloor from './defaultObjects/getFloor'
import getSimpleCube from './defaultObjects/getSimpleCube'

interface FrameUtils {
    renderer: THREE.Renderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    defaultSceneObjects: {
        floor: THREE.Mesh,
        defaultObject: THREE.Mesh,
        lights: THREE.Group
    }
}

interface CanvasUtils {
    canvas: HTMLCanvasElement,
    renderer: THREE.Renderer,
    camera: THREE.Camera
}

interface SetupScene {
    setup: Function,
    animate: Function
}

const ambientColor = 0xffffff
const frameUtils: FrameUtils = {
    renderer: null,
    scene: null,
    camera: null,
    defaultSceneObjects: {
        floor: null,
        defaultObject: null,
        lights: null
    }
}

function setAnimationFrame(frameUtils: FrameUtils, animate: Function) {
    animate && animate(frameUtils)
    updateFirstPersonPosition()
    frameUtils.renderer.render(frameUtils.scene, frameUtils.camera)
    requestAnimationFrame(() => setAnimationFrame(frameUtils, animate))
}

function getAspectRatio(canvas) {
    return canvas.clientWidth / canvas.clientHeight
}

function handleCanvasSize(canvasUtils: CanvasUtils) {
    const parent = canvasUtils.canvas.parentElement

    setCanvasToElementSize(canvasUtils, parent)

    new window['ResizeObserver'](() => {
        setCanvasToElementSize(canvasUtils, parent)
    }).observe(parent)
}

function setCanvasToElementSize(canvasUtils: CanvasUtils, element: HTMLElement) {
    canvasUtils.canvas.width = element.clientWidth
    canvasUtils.canvas.height = element.clientHeight
    canvasUtils.camera['aspect'] = window.innerWidth / window.innerHeight

    canvasUtils.camera['updateProjectionMatrix']()
    canvasUtils.renderer.setSize(window.innerWidth, window.innerHeight)
}

function setDefaultObjects(scene: THREE.Scene) {
    const lightGroup = getLightGroup()
    const floor = getFloor()
    const defaultObject = getSimpleCube()

    scene.add(floor)
    scene.add(defaultObject)
    scene.add(lightGroup)

    frameUtils.defaultSceneObjects.floor = floor
    frameUtils.defaultSceneObjects.defaultObject = defaultObject
    frameUtils.defaultSceneObjects.lights = lightGroup
}

export default function getSetupScene(setupScene: SetupScene, canvasSelector = 'canvas'): THREE.Scene {
    const canvas: HTMLCanvasElement = document.querySelector(canvasSelector)
    const camera = new THREE.PerspectiveCamera(32, getAspectRatio(canvas), 0.1)
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    })

    frameUtils.renderer = renderer
    frameUtils.scene = scene
    frameUtils.camera = camera

    scene.fog = new THREE.Fog(ambientColor, 5, 1000)

    renderer.shadowMap.enabled = true
    renderer.outputEncoding = THREE.sRGBEncoding

    setupScene.setup && setupScene.setup(frameUtils)

    setDefaultObjects(scene)
    setAnimationFrame(frameUtils, setupScene.animate)
    setFirstPersonPosition(canvas)
    setFirstPersonDirection(camera, canvas)
    setFirstPersonZoom(camera)
    handleCanvasSize({ canvas, renderer, camera })

    renderer.setClearColor(ambientColor, 1)
    camera.lookAt(new THREE.Vector3())
    canvas.focus()

    return scene
}
