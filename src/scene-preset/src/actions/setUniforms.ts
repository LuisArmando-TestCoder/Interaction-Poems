import * as THREE from "three"

import { materials, animations, customUniforms, audiosState } from "../state"
import { CustomUniform, AudioChannels } from "../types/state"
import { audioChannels } from "../state/audios"
import { consulters } from ".."

// uniform vec3      iResolution;           // viewport resolution (in pixels)
// uniform float     iTime;                 // shader playback time (in seconds)
// uniform float     iTimeDelta;            // render time (in seconds)
// uniform int       iFrame;                // shader playback frame
// uniform float     iChannelTime[4];       // channel playback time (in seconds)
// uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
// uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click
// uniform samplerXX <<AnyName>>;           // input channel. XX = 2D/Cube
// uniform vec4      iDate;                 // (year, month, day, time in seconds)
// uniform float     iSampleRate;           // sound sample rate (i.e., 44100)

export type TextureChannels = { [index: string]: () => THREE.DataTexture2DArray };

const iMouse = new THREE.Vector4()

let iTime = 0

function getEmptyAudioTexture(): THREE.DataTexture2DArray {
  const width = 512
  const height = 2
  const depth = 1
  const size = width * height
  const data = new Uint8Array(size * depth)
  const texture = new THREE.DataTexture2DArray(data, width, height, depth)

  texture.format = THREE.RGBFormat
  texture.needsUpdate = true

  return texture
}

function getTextureChannels(channels: AudioChannels): TextureChannels {
  const textureChannels: TextureChannels = {}

  for (const [channelName, audio] of Object.entries(channels)) {
    const audioProperties = consulters.getAudioProperties(audio);
    const audioTexture = getEmptyAudioTexture();
    textureChannels[channelName] = () => {
      if (audioProperties.frequencies) {
        audioTexture.image.data = audioProperties.frequencies;
      }

      return audioTexture
    }
  }

  return textureChannels
}

function getBaseUniforms(material: THREE.ShaderMaterial): CustomUniform {
  return {
    iResolution: () => new THREE.Vector2(window.innerWidth, window.innerHeight),
    iTime: () => parseFloat(iTime.toFixed(3)),
    iTimeDelta: () => new Date().getSeconds() / 60,
    iMouse: () => iMouse,
    // iFrame: () => null,
    // iChannelTime: () => null,
    // iChannelResolution: () => null,
    // <<AnyName>> for samplerXX 
    ...getTextureChannels(audioChannels),
    // iDate: () => null,
    // iSampleRate: () => null,
  }
}

function setUniformsWatcher() {
  const shaderMaterials = materials as THREE.ShaderMaterial[]

  iTime += 0.01

  shaderMaterials.forEach(assignUniforms)
}

function assignUniforms(material: THREE.ShaderMaterial, materialIndex: number) {
  const baseUniforms = getBaseUniforms(material)

  for (const uniformName in baseUniforms) {
    assignUniformValue(material, uniformName, baseUniforms[uniformName]())
  }

  for (const uniformName in customUniforms[materialIndex]) {
    assignUniformValue(
      material,
      uniformName,
      customUniforms[materialIndex][uniformName]()
    )
  }
}

function assignUniformValue(
  material: THREE.ShaderMaterial,
  uniformName: string,
  value: any
) {
  if (!material.uniforms[uniformName]) {
    material.uniforms[uniformName] = { value }

    return
  }

  material.uniforms[uniformName].value = value
}

function overrideCustomUniforms(
  customUniform: CustomUniform,
  materialIndex: number
) {
  const uniform = customUniforms[materialIndex]

  for (const uniformName in customUniform) {
    uniform[uniformName] = customUniform[uniformName]
  }
}

function setIMouseWatchers() {
  window.addEventListener("mousemove", (event: MouseEvent) => {
    iMouse.set(event.clientX, event.clientY, iMouse.z, iMouse.w)
  })

  window.addEventListener("click", (event: MouseEvent) => {
    iMouse.set(iMouse.x, iMouse.y, event.clientX, event.clientY)
  })
}

export default function setUniforms(
  material: THREE.ShaderMaterial,
  customUniform: CustomUniform = {}
) {
  if (!animations.includes(setUniformsWatcher)) {
    animations.push(setUniformsWatcher)
    setIMouseWatchers()
  }

  if (!materials.includes(material)) {
    materials.push(material)
    customUniforms.push(customUniform)
  }

  const materialIndex = materials.indexOf(material)

  overrideCustomUniforms(customUniform, materialIndex)

  // first assignment of the uniforms without animations
  assignUniforms(material, materialIndex)
}
