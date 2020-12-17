import canvasesState, {
    CanvasState,
    KeyCombination,
    KeyCombinationOrders,
    KeyLifeCycleObject,
    CanvasStateCallback,
    KeyCombinationOrder,
} from '../canvasesState'

type KeyEventName = 'keydown' | 'keyup'

class KeyLifeCycle {
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

class KeyHandler {
    canvasState: CanvasState
    keyEventNames: KeyEventName[] = ['keydown', 'keyup']

    constructor(canvasState: CanvasState) {
        this.canvasState = canvasState
    }

    keydown(key: string) {
        const { keyCombinationsQueue: queue } = this.canvasState

        addKeyToQueue(key, queue)
        triggerQueue(queue.join(''), this.canvasState)
    }

    keyup(key: string) {
        const { keyCombinationsQueue: queue } = this.canvasState

        triggerQueue(queue.join(''), this.canvasState)
        deleteKeyFromQueue(key, queue)
    }

    listenActions() {
        this.keyEventNames.forEach(keyEventName => {
            this.canvasState.canvas.addEventListener(
                keyEventName,
                (event: KeyboardEvent) => {
                    this[keyEventName](event.key.toLowerCase())
                }
            ) 
        })
    }
}

function handleKeyboardActions(canvasState: CanvasState) {
    if (!canvasState.keyCombinationOrders) {
        const keyHandler = new KeyHandler(canvasState)

        setKeyCombinationOrders(canvasState)
        
        keyHandler.listenActions()
        canvasState.animations.push(triggerPresentCallbacks)
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

function addKeyToQueue(key: string, queue: string[]) {
    if (!queue.includes(key)) {
        queue.push(key)
    }
}

function deleteKeyFromQueue(key: string, queue: string[]) {
    queue.splice(queue.indexOf(key), 1)
}

function triggerQueue(queue: string, canvasState: CanvasState) {
    const { sorted, unsorted } = canvasState.keyCombinationOrders

    if (sorted && sorted[queue]) triggerSortedQueue(sorted[queue], canvasState)
    if (unsorted) triggerUnsortedQueue(unsorted, queue, canvasState)
}

function triggerSortedQueue(keyLifeCycleObject: KeyLifeCycleObject, canvasState: CanvasState) {
    for (const lifeCycleKey in keyLifeCycleObject) {
        const callbacks = keyLifeCycleObject[lifeCycleKey]

        callbacks.forEach((callback: CanvasStateCallback) => {
            callback(canvasState)
        })
    }
}

function triggerUnsortedQueue(keyCombination: KeyCombination, queue: string, canvasState: CanvasState) {
    for (const key in keyCombination) {
        const sortedQueue = getSortedString(queue)
        const sortedKey = getSortedString(key)

        if (sortedQueue === sortedKey) {
            const keyLifeCycleObject = keyCombination[key]          

            for (const lifeCycleKey in keyLifeCycleObject) {
                const callbacks = keyLifeCycleObject[lifeCycleKey]

                callbacks.forEach((callback: CanvasStateCallback) => {
                    callback(canvasState)
                })
            }
        }
    }
}

function triggerPresentCallbacks(canvasState: CanvasState) {
    const { keyCombinationsQueue: queue } = canvasState

    triggerQueue(queue.join(''), canvasState)
}

function getSortedString(string: string) {
    const array = string.split('')
    const numberMap = array.map(character => character.charCodeAt(0))
    const sortedArray = numberMap.sort((a, b) => b - a)
    const stringMap = sortedArray.map(number => String.fromCharCode(number))
    const stringNumberValue = stringMap.join('')

    return stringNumberValue
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
