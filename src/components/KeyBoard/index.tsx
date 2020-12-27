import React from 'react'

import Key from '../Key'

import './style.scss'

const gridTemplateAreas = `
. W . R . . U I O
A S D F . . . K L
`.trim()

function getGridRowLength(): number {
    const [row] = gridTemplateAreas.split('\n')

    return row.replace(/[ ]/g, '').length
}

function getGridLetters(): string[] {
    return gridTemplateAreas.replace(/[. \n]/g, '').split('')
}

function getGridTemplateAreasStyle(): string {
    return gridTemplateAreas.split('\n').map(row => `'${row}'`).join(' ')
}

function getKeyBoardStyles() {
    return {
        style: {
            gridTemplateAreas: getGridTemplateAreasStyle(),
            gridTemplateColumns: `repeat(${getGridRowLength()}, 1fr)`,
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

function getKeys() {
    return getGridLetters().map(letter => {
        return (
            <Key {...getKeyProperties(letter)} keyName={letter}/>
        )
    })
}

const index = () => {
    return (
        <div {...getKeyBoardStyles()} className='key-board'>
            {getKeys()}
        </div>
    )
}

export default index
