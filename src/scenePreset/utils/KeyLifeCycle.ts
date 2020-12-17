import {
    CanvasState,
    KeyLifeCycleObject,
    CanvasStateCallback,
    KeyCombinationOrder,
} from '../canvasesState'

export default class KeyLifeCycle {
    keyLifeCycleObject: KeyLifeCycleObject

    constructor(canvasState: CanvasState, order: KeyCombinationOrder, keyCombination: string) {
        this.keyLifeCycleObject = canvasState.keyCombinationOrders[order][keyCombination]
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