import canvasesState, {
    CanvasState,
    KeyCombination,
    KeyCombinationOrders,
    KeyLifeCycleObject,
    CanvasStateCallback,
    KeyCombinationOrder,
    CombinationOrderKeyTuple,
} from '../canvasesState'

class KeyLifeCycle {
    keyLifeCycleObject: KeyLifeCycleObject

    constructor(canvasState: CanvasState, combinationOrderKeyTuple: CombinationOrderKeyTuple) {
        const [order, keyCombination] = combinationOrderKeyTuple

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

function handleKeyboardActions(canvasState: CanvasState) {
    if (!canvasState.keyCombinationOrders) {
        canvasState.canvas.addEventListener('keydown', (event: KeyboardEvent) => {
            handleKeydown(canvasState, event.key.toLowerCase())
        })
        canvasState.canvas.addEventListener('keyup', (event: KeyboardEvent) => {
            handleKeyup(canvasState, event.key.toLowerCase())
        })

        setKeyCombinationOrders(canvasState)

        canvasState.animations.push(triggerPresentCallbacks)
    }
}

function setKeyCombinationOrders(canvasState: CanvasState) {
    canvasState.keyCombinationOrders = {
        sorted: {},
        unsorted: {},
    }
}

function setCombination(combinationOrderKeyTuple: CombinationOrderKeyTuple, canvasState: CanvasState) {
    const [order, keyCombination] = combinationOrderKeyTuple

    if (!canvasState.keyCombinationOrders[order][keyCombination]) {
        canvasState.keyCombinationOrders[order][keyCombination] = new KeyLifeCycleObject()
    }
}

function handleKeydown(canvasState: CanvasState, key: string) {
    const { keyCombinationsQueue: queue } = canvasState

    addKeyToQueue(key, queue)
    triggerQueue(queue.join(''), canvasState)
}

function handleKeyup(canvasState: CanvasState, key: string) {
    const { keyCombinationsQueue: queue } = canvasState

    triggerQueue(queue.join(''), canvasState)
    deleteKeyFromQueue(key, queue)
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
            const combinationOrderKeyTuple: CombinationOrderKeyTuple = [order, keyCombination]

            setCombination(combinationOrderKeyTuple, canvasState)

            return new KeyLifeCycle(canvasState, combinationOrderKeyTuple)
        },
        listenCombinations(combinations: KeyCombinationOrders) {
            // -
        }
    }
}
