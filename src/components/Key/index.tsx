import React, { useEffect, useState } from 'react'
import { events } from '../../scene-preset'
import './style.module.scss'

const index = ({ keyName, style }) => {
    const [isSelected, setIsSelected] = useState(false)
    
    useEffect(() => {
        events.onKey(keyName)
        .start(() => setIsSelected(true))
        .end(() => setIsSelected(false))
    }, [])

    return <button style={style} className={
        `key ${ keyName } ${ isSelected ? 'selected' : '' }`
    }>{ keyName.toUpperCase() }</button>
}

export default index
