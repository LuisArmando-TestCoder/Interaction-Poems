import canvasesState, {
    CanvasState,
    KeyCombinationOrders,
    KeyLifeCycleObject,
    KeyCombinationOrder,
} from '../canvasesState'

import {
    KeyHandler,
    KeyLifeCycle,
    Triggerer,
} from '../utils'

function handleKeyboardActions(canvasState: CanvasState) {
    if (!canvasState.keyCombinationOrders) {
        const triggerer = new Triggerer(canvasState)
        const keyHandler = new KeyHandler(canvasState, triggerer)

        setKeyCombinationOrders(canvasState)

        keyHandler.listenActions()
        canvasState.animations.push(triggerer.triggerPresentCallbacks.bind({ canvasState }))
    }
}

function setKeyCombinationOrders(canvasState: CanvasState) {
    canvasState.keyCombinationOrders = {
        sorted: {},
        unsorted: {},
    }
}

function setCombination(order: KeyCombinationOrder, keyCombination: string, canvasState: CanvasState) {
    if (!canvasState.keyCombinationOrders[order][keyCombination]) {
        canvasState.keyCombinationOrders[order][keyCombination] = new KeyLifeCycleObject()
    }
}

export default function onKey(canvasSelector = 'canvas') {
    const canvasState: CanvasState = canvasesState[canvasSelector]

    handleKeyboardActions(canvasState)

    return {
        getKeptKeyLifeCycleMethods(order: KeyCombinationOrder, keyCombination: string) {
            setCombination(order, keyCombination, canvasState)

            return new KeyLifeCycle(canvasState, order, keyCombination)
        },
        listenCombinations(combinations: KeyCombinationOrders) {
            // -
        }
    }
}
