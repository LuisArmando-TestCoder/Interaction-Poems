import canvasesState, {
    CanvasState,
    KeyLifeCycleObject,
} from '../canvasesState'

import {
    KeyHandler,
    KeyLifeCycle,
    Triggerer,
} from '../utils'

function handleKeyboardActions(canvasState: CanvasState) {
    if (!canvasState.keys) {
        const triggerer = new Triggerer(canvasState)
        const keyHandler = new KeyHandler(canvasState, triggerer)

        keyHandler.listenActions()
        canvasState.animations.push(triggerer.triggerPresentCallbacks.bind(triggerer))

        // initialize keys
        canvasState.keys = {}
    }
}

export default function onKey(key: string, canvasSelector = 'canvas') {
    const canvasState: CanvasState = canvasesState[canvasSelector]

    handleKeyboardActions(canvasState)

    canvasState.keys[key] = canvasState.keys[key] || new KeyLifeCycleObject()

    return new KeyLifeCycle(canvasState, key)
}
