import React, { useEffect } from 'react'

import { events } from '../../scene-preset'

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

const index = ({ src, id = 'audio' }) => {
    useEffect(toggleAudio, [])

    return <audio id={id} src={src}/>
}

export default index
