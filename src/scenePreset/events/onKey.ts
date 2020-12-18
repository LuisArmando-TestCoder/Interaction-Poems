import canvasesState, {
    CanvasState,
    KeyLifeCycleObject,
    KeyCombinationOrder,
    KeyCombinationOrders,
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
        canvasState.animations.push(triggerer.triggerPresentCallbacks.bind(triggerer))
    }
}

function setKeyCombinationOrders(canvasState: CanvasState) {
    canvasState.keyCombinationOrders = {
        sorted: {},
        unsorted: {},
    }
}

function setCombinationKeyLifeCycle(order: KeyCombinationOrder, keyCombination: string, canvasState: CanvasState) {
    if (!canvasState.keyCombinationOrders[order][keyCombination]) {
        canvasState.keyCombinationOrders[order][keyCombination] = new KeyLifeCycleObject()
    }
}

export default function onKey(canvasSelector = 'canvas') {
    const canvasState: CanvasState = canvasesState[canvasSelector]

    handleKeyboardActions(canvasState)

    return {
        getKeptKeyLifeCycleMethods(order: KeyCombinationOrder, keyCombination: string) {
            setCombinationKeyLifeCycle(order, keyCombination, canvasState)

            return new KeyLifeCycle(canvasState, order, keyCombination)
        },
        listenCombinations(combinationOrders: KeyCombinationOrders) {
            const orders = ['sorted', 'unsorted'] as const

            for (const orderKey of orders) {
                const oldCombinations = canvasState.keyCombinationOrders[orderKey]
                const newCombinations = combinationOrders[orderKey]

                for (const newKeyCombination in newCombinations) {
                    if (!oldCombinations[newKeyCombination]) {
                        setCombinationKeyLifeCycle(orderKey, newKeyCombination, canvasState)
                    }

                    for (const lifeCycleName in oldCombinations[newKeyCombination]) {
                        oldCombinations[newKeyCombination][lifeCycleName].push(
                            ...newCombinations[newKeyCombination][lifeCycleName]
                        )
                    }
                }
            }
        }
    }
}
