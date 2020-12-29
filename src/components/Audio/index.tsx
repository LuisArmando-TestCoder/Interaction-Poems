import React, { useEffect } from 'react'

import { events } from '../../scenePreset'

function toggleAudio() {
    events.onKey('i').end(() => {
        const audio = document.getElementById('audio') as HTMLMediaElement

        if (audio.paused) {
            audio.play()

            return
        }

        audio.pause()
    })
}

const index = ({ src }) => {
    useEffect(toggleAudio, [])

    return <audio controls={true} id='audio' src={src}/>
}

export default index
