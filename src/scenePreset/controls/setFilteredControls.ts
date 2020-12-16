import { CanvasState } from '../canvasesState'

import setFirstPersonDirection from './camera/setFirstPersonDirection'
import setFirstPersonZoom from './camera/setFirstPersonZoom'
import setFirstPersonPosition from './camera/setFirstPersonPosition'

const controls = {
    setFirstPersonDirection,
    setFirstPersonZoom,
    setFirstPersonPosition,
}

function blacklistControls(controlsBlacklist: string[], controlNames: string[]) {
    controlsBlacklist.forEach(controlName => {
        if (controlNames.includes(controlName)) {
            delete controls[controlName]
        }
    })
}

function startControls(canvasState: CanvasState) {
    Object.keys(controls).forEach(controlName => {
        controls[controlName](canvasState)
    })
}

export default function setFilteredControls(canvasState: CanvasState) {
    const { controlsBlacklist } = canvasState.presetConfiguration
    const controlNames = Object.keys(controls)

    blacklistControls(controlsBlacklist, controlNames)
    startControls(canvasState)
}