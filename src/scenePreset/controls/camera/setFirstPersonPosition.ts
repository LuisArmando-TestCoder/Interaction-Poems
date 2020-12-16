import { mouseController } from './setFirstPersonDirection'
import { CanvasState } from '../../canvasesState'

export const keyController = {
    keyAxes: {
        ws: [],
        ad: []
    },
    chosenKey: "",
    flyingKeys: [],
}

const auxiliarCameraDirection = { x: Math.PI, y: Math.PI }

const friqtionResistance = 2

const cameraVector = {
    position: {
        x: 0,
        z: 0,
        y: 2,
        min: {
            y: 2
        }
    },
    flySpeed: {
        force: 0.005,
        direction: 0,
        friction: 0.0025,
        acceleration: 0,
        max: {
            acceleration: 0.1
        }
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
        cameraVector.flySpeed.direction = -1
    },
    down() {
        cameraVector.flySpeed.direction = 1
    },
}

const flyingKeys = {
    KeyR: move.up,
    KeyF: move.down,
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

function deegresToRadians(degrees) {
    const normalizedDegrees = degrees / 360
    return normalizedDegrees * Math.PI
}

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

function triggerFlyCode() {
    if (keyController.flyingKeys.length) {
        // fly force increase
        cameraVector.flySpeed.acceleration = Math.min(
            cameraVector.flySpeed.max.acceleration,
            cameraVector.flySpeed.acceleration
          + cameraVector.flySpeed.force
        )

        flyingKeys[
            keyController.flyingKeys[
                keyController.flyingKeys.length - 1
            ]
        ]()
    }
}

function deleteFliyingKeyFromQueue(event: KeyboardEvent) {
    const isKeyAlreadyInQueue = keyController.flyingKeys.includes(event.code)

    if (isKeyAlreadyInQueue) {
        keyController.flyingKeys.splice(keyController.flyingKeys.indexOf(event.code), 1)
    }
}

function addFlyingKeyToQueue(event: KeyboardEvent) {
    const validFlyingCode = flyingKeys[event.code]

    if (validFlyingCode) {
        const isKeyAlreadyInQueue = keyController.flyingKeys.includes(event.code)

        if (!isKeyAlreadyInQueue) {
            keyController.flyingKeys.push(event.code)
        }

        event.preventDefault()
    }

}

function updateFirstPersonPosition(canvasState: CanvasState) {
    setMoveOnKeyDown()
    reduceFirstPersonPositionAcceleration()
    topFirstPersonPositionAcceleration()
    triggerFlyCode()


    const { cameraDirection } = mouseController
    const direction = cameraDirection || auxiliarCameraDirection

    const { camera } = canvasState
    const { acceleration, chosenAxis, rotation } = cameraVector
    
    if (camera) {
        camera.position.x += acceleration[chosenAxis] * Math.sin(direction.x + rotation)
        camera.position.z += acceleration[chosenAxis] * Math.cos(direction.x + rotation)
        
        cameraVector.flySpeed.acceleration = Math.max(
            0,
            cameraVector.flySpeed.acceleration
          - cameraVector.flySpeed.friction
        )
        cameraVector.position.y = Math.max(
            cameraVector.position.min.y,
            cameraVector.position.y
          - cameraVector.flySpeed.acceleration
          * cameraVector.flySpeed.direction
        )
        camera.position.y = cameraVector.position.y
    }

}

function setControlOnKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    addKeyToQueue(key)
    chooseKey()

    addFlyingKeyToQueue(event)
}

function setControlOnKeyUp(event: KeyboardEvent) {
    const key = event.key.toLowerCase();
    deleteKeyFromQueue(key)
    chooseKey()

    deleteFliyingKeyFromQueue(event)
}

export default function setFirstPersonPosition(canvasState: CanvasState) {
    canvasState.animations.push(updateFirstPersonPosition)

    canvasState.canvas.addEventListener('keydown', setControlOnKeyDown)
    canvasState.canvas.addEventListener('keyup', setControlOnKeyUp)
}