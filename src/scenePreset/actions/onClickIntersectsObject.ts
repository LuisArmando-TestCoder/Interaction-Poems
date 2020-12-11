import * as THREE from 'three'
import sceneUtilsGroup, { SceneUtils } from '../SceneUtilsGroup'

interface ObjectIntersector {
    canvasSelector: string,
    canvas: HTMLCanvasElement,
    objectsMatrix: THREE.Object3D[][],
    callbacksMatrix: Function[][],
    raycaster: THREE.Raycaster
}

interface CallbackIntersectUtils {
    object: THREE.Object3D,
    canvas: HTMLCanvasElement,
    sceneUtils: SceneUtils
}

interface CanvasForIntersection {
    canvas: HTMLCanvasElement,
    callbacksMatrix: Function[][],
    objectsMatrix: THREE.Object3D[][]
}

type CanvasesForIntersection = { [index: string]: CanvasForIntersection }

const mouse = new THREE.Vector2()

export const canvasesForIntersection: CanvasesForIntersection = {}

export function setCameraDirectionLookingAtObject(callbackIntersectUtils: CallbackIntersectUtils) {
    const { object, sceneUtils } = callbackIntersectUtils
    const { camera } = sceneUtils

    camera.lookAt(object.position)
}

export function getCameraPositionNearOfObject(callbackIntersectUtils: CallbackIntersectUtils) {
    // needs flexible configuration
}

function handleObjectIntersection(objectIntersector: ObjectIntersector) {
    const {
        canvasSelector,
        canvas,
        objectsMatrix,
        callbacksMatrix,
        raycaster
    } = objectIntersector

    for (let i = 0; i < objectsMatrix.length; i++) {
        const objects = objectsMatrix[i]
        const [firstIntersection] = raycaster.intersectObjects(objects)

        if (firstIntersection) {
            callbacksMatrix[i].forEach(callback => {
                const { object } = firstIntersection

                callback({
                    object,
                    canvas,
                    sceneUtils: sceneUtilsGroup[canvasSelector]
                })
            })
        }
    }
}

export default function onClickIntersectsObject(
    objects: THREE.Object3D[],
    callback: Function,
    canvasSelector = 'canvas'
) {
    if (!canvasesForIntersection[canvasSelector]) {
        const canvas: HTMLCanvasElement = document.querySelector(canvasSelector)
        const raycaster = new THREE.Raycaster()

        canvasesForIntersection[canvasSelector] = {
            canvas,
            callbacksMatrix: [],
            objectsMatrix: []
        }

        canvas.addEventListener('click', (event: MouseEvent) => {

            const x = event.clientX
                      / window.innerWidth
                      * canvas.clientWidth
                      + window.scrollX
                      + canvas.getBoundingClientRect().left

            const y = event.clientY
                    / window.innerHeight
                    * canvas.clientHeight
                    + window.scrollY
                    + canvas.getBoundingClientRect().top

            mouse.set(
                x / canvas.clientWidth * 2 - 1,
                y / canvas.clientHeight * 2 + 1,
            )

            raycaster.setFromCamera(
                mouse,
                sceneUtilsGroup[canvasSelector].camera
            )

            handleObjectIntersection({
                canvasSelector,
                raycaster,
                ...canvasesForIntersection[canvasSelector],
            })
        })
    }

    const { objectsMatrix, callbacksMatrix } = canvasesForIntersection[canvasSelector]

    const indexOfObjects = objectsMatrix.indexOf(objects)
    const existingObjects = objectsMatrix[indexOfObjects]

    if (existingObjects) {
        callbacksMatrix[indexOfObjects].push(callback)
        return
    }

    objectsMatrix.push(objects)
    callbacksMatrix.push([callback])
}