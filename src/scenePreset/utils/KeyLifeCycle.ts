import {
    CanvasState,
    KeyLifeCycleObject,
    CanvasStateCallback,
} from '../state/canvases'

export default class KeyLifeCycle {
    keyLifeCycleObject: KeyLifeCycleObject

    constructor(canvasState: CanvasState, key: string) {
        this.keyLifeCycleObject = canvasState.keys[key]
    }

    start(callback: CanvasStateCallback) {
        this.keyLifeCycleObject.start.push(callback)

        return this.keyLifeCycleObject.start
    }

    present(callback: CanvasStateCallback) {
        this.keyLifeCycleObject.present.push(callback)

        return this.keyLifeCycleObject.present
    }

    end(callback: CanvasStateCallback) {
        this.keyLifeCycleObject.end.push(callback)

        return this.keyLifeCycleObject.end
    }
}