import React from 'react'

import Key from '../Key'

import './style.scss'

const index = () => {
    return (
        <div className='key-board'>
            <Key keyName='W'/>
            <Key keyName='A'/>
            <Key keyName='S'/>
            <Key keyName='D'/>
            <Key keyName='R'/>
            <Key keyName='F'/>
        </div>
    )
}

export default index
