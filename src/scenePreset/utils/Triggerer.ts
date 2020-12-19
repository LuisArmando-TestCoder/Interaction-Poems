import {
    CanvasState,
    CanvasStateCallback,
    KeyLifeCycleName,
} from '../canvasesState'

export default class Triggerer {
    canvasState: CanvasState

    constructor(canvasState: CanvasState) {
        this.canvasState = canvasState
    }

    triggerQueue(keyLifeCycleName: KeyLifeCycleName) {
        const { keys, keysQueue: queue } = this.canvasState

        for (const key of queue) {
            const lifeCycle = keys[key]

            if (lifeCycle) {
                const callbacks = lifeCycle[keyLifeCycleName]

                callbacks.forEach((callback: CanvasStateCallback) => {
                    callback(this.canvasState)
                })
            }
        }
    }
    
    triggerPresentCallbacks() {
        this.triggerQueue('present')
    }
}