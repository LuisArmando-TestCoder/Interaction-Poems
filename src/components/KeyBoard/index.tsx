import React, { useEffect, useState } from 'react'
import { events } from '../../scenePreset'

import Key from '../Key'

import './style.scss'

const keyboardGrid = `
Q W E R T Y U I O P
A S D F G H J K L .
Z X C V B N M . . .
`.trim()

function getGridTemplateAreas(keysObject): string {
    const keys = Object.keys(keysObject)
    const keyRegex = new RegExp(`[${keys.join('')}]`, 'gmi')
    const excludedKeys = keyboardGrid
                                    .replace(keyRegex, '.')
                                    .replace(/[. \n]/gm, '')
                                    .split('')
    const exclusionRegex = new RegExp(`[${excludedKeys.join('')}]`, 'gmi')
    const excludedKeyboard = keyboardGrid.replace(exclusionRegex, '.')

    return excludedKeyboard
}

// const gridTemplateAreas = `
// . W . R . . U
// A S D F . . .
// `.trim()

function getGridRowLength(gridTemplateAreas: string): number {
    const [row] = gridTemplateAreas.split('\n')

    return row.replace(/[ ]/g, '').length
}

function getGridLetters(gridTemplateAreas: string): string[] {
    return gridTemplateAreas.replace(/[. \n]/g, '').split('')
}

function getGridTemplateAreasStyle(gridTemplateAreas: string): string {
    return gridTemplateAreas.split('\n').map(row => `'${row}'`).join(' ')
}

function getKeyBoardStyles(gridTemplateAreas: string): object {
    return {
        style: {
            gridTemplateAreas: getGridTemplateAreasStyle(gridTemplateAreas),
            gridTemplateColumns: `repeat(${getGridRowLength(gridTemplateAreas)}, 1fr)`,
        },
    }
}

function getKeyProperties(letter: string) {
    return {
        key: letter,
        style: {
            gridArea: letter,
        },
    }
}

function getKeys(gridTemplateAreas: string) {
    return getGridLetters(gridTemplateAreas).map(letter => {
        return (
            <Key {...getKeyProperties(letter)} keyName={letter}/>
        )
    })
}

const index = () => {
    const [keys, setKeys] = useState([])
    const [keyBoardStyles, setKeyBoardStyles] = useState({})

    useEffect(() => {
        events.onNewKey(keys => {
            const gridTemplateAreas = getGridTemplateAreas(keys)

            setKeys(getKeys(gridTemplateAreas))
            setKeyBoardStyles(getKeyBoardStyles(gridTemplateAreas))
        })
    }, []);

    return (
        <div {...keyBoardStyles} className='key-board'>
            {keys}
        </div>
    )
}

export default index
