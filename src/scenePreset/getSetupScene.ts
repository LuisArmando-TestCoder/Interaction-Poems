import * as THREE from 'three'
import {
  setFirstPersonPosition,
  updateFirstPersonPosition,
} from './camera/setFirstPersonPosition'
import setFirstPersonDirection from './camera/setFirstPersonDirection'
import setFirstPersonZoom from './camera/setFirstPersonZoom'
import getLightGroup from './defaultObjects/getLightGroup'
import getFloor from './defaultObjects/getFloor'
import getSimpleCube from './defaultObjects/getSimpleCube'
import sceneUtilsGroup, {
    CanvasUtils,
    SetupScene,
    SceneUtils
} from './SceneUtilsGroup'
import onClickIntersectsObject, { setCameraDirectionLookingAtObject } from './actions/onClickIntersectsObject'
import setAnimationFrame, { animationGroup } from './setAnimationFrame'

const ambientColor = 0xffffff

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

function setDefaultObjects(scene: THREE.Scene, sceneUtils: SceneUtils) {
    const lightGroup = getLightGroup()
    const floor = getFloor()
    const simpleCube = getSimpleCube()
    const objects = new THREE.Group()

    objects.name = 'defaultObjects'

    objects.add(simpleCube)

    scene.add(floor)
    scene.add(objects)
    scene.add(lightGroup)

    onClickIntersectsObject(objects.children, setCameraDirectionLookingAtObject)

    sceneUtils.defaultScene = {
        floor,
        objects,
        lights: lightGroup
    }
}

export default function getSetupScene(setupScene: SetupScene, canvasSelector = 'canvas'): THREE.Scene {
    const canvas: HTMLCanvasElement = document.querySelector(canvasSelector)
    const camera = new THREE.PerspectiveCamera(32, getAspectRatio(canvas), 0.1)
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    })
    const sceneUtils = sceneUtilsGroup[canvasSelector] = new SceneUtils()

    sceneUtils.renderer = renderer
    sceneUtils.scene = scene
    sceneUtils.camera = camera

    scene.fog = new THREE.Fog(ambientColor, 5, 1000)
    scene.name = canvasSelector

    renderer.shadowMap.enabled = true
    renderer.outputEncoding = THREE.sRGBEncoding

    setupScene.setup && setupScene.setup(sceneUtils)

    setDefaultObjects(scene, sceneUtils)
    setFirstPersonPosition(canvas)
    setFirstPersonDirection(camera, canvas)
    setFirstPersonZoom(camera)
    handleCanvasSize({ canvas, renderer, camera })

    if (!animationGroup[canvasSelector]) {
        animationGroup[canvasSelector] = [
            setupScene.animate,
            updateFirstPersonPosition,
        ]

        setAnimationFrame(canvasSelector)
    }

    renderer.setClearColor(ambientColor, 1)
    camera.lookAt(new THREE.Vector3())
    canvas.focus()

    return scene
}
