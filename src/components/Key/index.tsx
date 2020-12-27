import React, { useEffect, useState } from 'react'
import { events } from '../../scenePreset'
import './style.scss'

const index = ({ keyName, style }) => {
    const [isSelected, setIsSelected] = useState(false)
    
    useEffect(() => {
        events.onKey(keyName).start(() => setIsSelected(true))
        events.onKey(keyName).end(() => setIsSelected(false))
    }, [])

    return <button style={style} className={
        `key ${ keyName } ${ isSelected ? 'selected' : '' }`
    }>{ keyName.toUpperCase() }</button>
}

export default index
