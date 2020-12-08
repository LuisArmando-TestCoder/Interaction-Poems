import {
    mouseController,
} from './setFirstPersonDirection'

function deegresToRadians(degrees) {
    const normalizedDegrees = degrees / 360
    return normalizedDegrees * Math.PI
}

export const keyController = {
    keyAxes: {
        ws: [],
        ad: []
    },
    chosenKey: ""
}

const friqtionResistance = 2

const cameraVector = {
    position: {
        x: 0,
        z: 0,
        y: 2,
    },
    flySpeed: {
        y: 1,
    },
    acceleration: {
        x: 0,
        z: 0,
    },
    friqtion: {
        x: 0.2,
        z: 0.2,
    },
    rotation: 0,
    chosenAxis: 'z',
    top: {
        acceleration: {
            x: 0.05,
            z: 0.05,
        },
    },
}

const move = {
    right_forward() {
        cameraVector.rotation = deegresToRadians(-90)
        cameraVector.chosenAxis = 'z'
    },
    left_forward() {
        cameraVector.rotation = deegresToRadians(90)
        cameraVector.chosenAxis = 'z'
    },
    right_backward() {
        cameraVector.rotation = deegresToRadians(-270)
        cameraVector.chosenAxis = 'x'
    },
    left_backward() {
        cameraVector.rotation = deegresToRadians(270)
        cameraVector.chosenAxis = 'x'
    },
    forward() {
        cameraVector.rotation = 0
        cameraVector.chosenAxis = 'z'
    },
    backward() {
        cameraVector.rotation = deegresToRadians(360)
        cameraVector.chosenAxis = 'z'
    },
    right() {
        cameraVector.rotation = deegresToRadians(-180)
        cameraVector.chosenAxis = 'x'
    },
    left() {
        cameraVector.rotation = deegresToRadians(180)
        cameraVector.chosenAxis = 'x'
    },
    up() {
        cameraVector.position.y += cameraVector.flySpeed.y
    },
    down() {
        cameraVector.position.y -= cameraVector.flySpeed.y
    },
}

const creativeKeys = {
    KeyC: move.down,
    Space: move.up,
}

const movementKeys = {
    wa: move.left_forward,
    wd: move.right_forward,
    sa: move.left_backward,
    sd: move.right_backward,

    w: move.forward,
    a: move.left,
    s: move.backward,
    d: move.right,
}

const validAxes = ['x', 'z']

function reduceFirstPersonPositionAcceleration() {
    const key = 'acceleration'
    const obj = cameraVector
    validAxes.forEach((axis) => {
        const surpassingFriqtion = Math.abs(obj[key][axis]) > obj.friqtion[axis] / 2
        if (surpassingFriqtion) {
            obj[key][axis] += -Math.sign(obj[key][axis]) * (obj.friqtion[axis] / friqtionResistance)
        } else {
            obj[key][axis] = 0
        }
    })
}

function topFirstPersonPositionAcceleration() {
    validAxes.forEach((axis) => {
        if (cameraVector.acceleration[axis] > cameraVector.top.acceleration[axis]) {
            cameraVector.acceleration[axis] = cameraVector.top.acceleration[axis]
        }
        if (cameraVector.acceleration[axis] < -cameraVector.top.acceleration[axis]) {
            cameraVector.acceleration[axis] = -cameraVector.top.acceleration[axis]
        }
    })
}

function setMoveOnKeyDown() {
    if (movementKeys[keyController.chosenKey]) {
        movementKeys[keyController.chosenKey]()

        const { acceleration, friqtion, chosenAxis } = cameraVector

        acceleration[chosenAxis] += friqtion[chosenAxis] * friqtionResistance
    }
}

export function updateFirstPersonPosition() {
    setMoveOnKeyDown()
    reduceFirstPersonPositionAcceleration()
    topFirstPersonPositionAcceleration()

    const {
        camera,
        cameraDirection,
    } = mouseController
    const {
        acceleration,
        chosenAxis,
        rotation,
    } = cameraVector

    if (camera) {
        camera.position.x += acceleration[chosenAxis] * Math.sin(cameraDirection.x + rotation)
        camera.position.z += acceleration[chosenAxis] * Math.cos(cameraDirection.x + rotation)
        camera.position.y = cameraVector.position.y
    }

}

function chooseKey() {
    keyController.chosenKey = ""

    if (keyController.keyAxes.ws.length) {
        keyController.chosenKey = keyController.keyAxes.ws[
            keyController.keyAxes.ws.length - 1
        ]
    }

    if (keyController.keyAxes.ad.length) {
        keyController.chosenKey += keyController.keyAxes.ad[
            keyController.keyAxes.ad.length - 1
        ]
    }
}

function addKeyToQueue(key: string) {
    for (const keyAxis in keyController.keyAxes) {
        const keyAxisQueue = keyController.keyAxes[keyAxis]
        if (keyAxis.includes(key) && !keyAxisQueue.includes(key)) {
            keyAxisQueue.push(key)
            break
        }
    }
}

function deleteKeyFromQueue(key: string) {
    for (const keyAxis in keyController.keyAxes) {
        const keyAxisQueue = keyController.keyAxes[keyAxis]
        const isValidKey = keyAxis.includes(key) && keyAxisQueue.includes(key)

        if (isValidKey) {
            keyAxisQueue.splice(keyAxisQueue.indexOf(key), 1)
        }
    }
}

export function setFirstPersonPosition(canvas: HTMLCanvasElement) {
    canvas.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();

        addKeyToQueue(key)
        chooseKey()

        const validCode = creativeKeys[event.code]

        if (validCode) {
            validCode()
            event.preventDefault()
        }
    })
    canvas.addEventListener('keyup', (event) => {
        const key = event.key.toLowerCase();
        deleteKeyFromQueue(key)
        chooseKey()
    })
}