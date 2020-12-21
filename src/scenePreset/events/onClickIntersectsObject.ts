import * as THREE from 'three'

import canvasesState from '../state/canvases'

const mouse = new THREE.Vector2()

function handleObjectIntersection(canvasSelector: string) {
    const { canvas, intersectionUtils } = canvasesState[canvasSelector]
    const { matrices, raycaster } = intersectionUtils
    const { objects: objectMatrix, callbacks: callbackMatrix } = matrices

    for (let i = 0; i < objectMatrix.length; i++) {
        const objects = objectMatrix[i]
        const [firstIntersection] = raycaster.intersectObjects(objects)

        if (firstIntersection) {
            callbackMatrix[i].forEach(callback => {
                const { object } = firstIntersection

                callback({
                    object,
                    canvas,
                    canvasesState: canvasesState[canvasSelector]
                })
            })
        }
    }
}

export default function onClickIntersectsObject(
    objectsForIntersection: THREE.Object3D[],
    callback: Function,
    canvasSelector = 'canvas'
) {
    if (!canvasesState[canvasSelector]) {
        const canvas: HTMLCanvasElement = document.querySelector(canvasSelector)
        const raycaster = new THREE.Raycaster()

        canvasesState[canvasSelector].intersectionUtils = {
            raycaster,
            matrices: {
                callbacks: [],
                objects: [],
            }
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
                y / canvas.clientHeight * -2 + 1,
            )

            raycaster.setFromCamera(
                mouse,
                canvasesState[canvasSelector].camera
            )

            handleObjectIntersection(canvasSelector)
        })
    }

    const { matrices } = canvasesState[canvasSelector].intersectionUtils
    const { objects: objectMatrix, callbacks: callbackMatrix } = matrices
    const indexOfObjects = objectMatrix.indexOf(objectsForIntersection)
    const existingObjects = callbackMatrix[indexOfObjects]

    if (existingObjects) {
        callbackMatrix[indexOfObjects].push(callback)
        return
    }

    objectMatrix.push(objectsForIntersection)
    callbackMatrix.push([callback])
}