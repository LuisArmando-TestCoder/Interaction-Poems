import React, { useEffect } from 'react'
import * as THREE from 'three'
import getSetupScene from '../scenes/getSetupScene'
import './global.css'

export default function Home() {
  useEffect(() => {
    getSetupScene({
      setup({ renderer, scene, camera }) {
      },
      animate({ renderer, scene, camera }) {

      },
    })
  }, [])
  return <canvas contentEditable="true"/>
}
