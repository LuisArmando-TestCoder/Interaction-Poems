import React, { useEffect, useState } from 'react'
import { events } from '../../scenePreset'
import './style.scss'

const index = ({ keyName }) => {
    const [isSelected, setIsSelected] = useState(null)
    
    useEffect(() => {
        events.onKey(keyName).start(() => setIsSelected(true))
        events.onKey(keyName).end(() => setIsSelected(null))
    }, [])

    return <button className={
        `key ${ keyName } ${ isSelected && 'selected' }`
    }>{ keyName.toUpperCase() }</button>
}

export default index
