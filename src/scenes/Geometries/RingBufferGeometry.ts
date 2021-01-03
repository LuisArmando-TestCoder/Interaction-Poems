import * as THREE from 'three'

import presetScene, { events, actions } from '../../scenePreset'

// https://threejs.org/docs/api/en/geometries/RingBufferGeometry.html
const fragmentShader = /* cs */ `
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iGeometryResolution;

// http://www.pouet.net/prod.php?which=57245
// If you intend to reuse this shader, please add credits to 'Danilo Guanabara'
// https://www.shadertoy.com/view/XsXXDn

void main() {
	vec3 haloColors;
	float distance;
    float brightnessDiffuse = 2.;
    float waveNear = 1.;
    float fov = 15.;
    float wavingSpeed = .5;
    float timeStepOffset = .5;

	for(int index = 0; index < 3; index++) {
    float time = iTime + timeStepOffset * float(index);
		vec2 coordinates2D, aspectRatio = gl_FragCoord.xy / iResolution.xy;

    // assign aspect ratio to, uv
		coordinates2D = aspectRatio;

    // centering aspect ratio
		aspectRatio -= .5;

    // scaling aspect ratio axis to fit square coordinates
		aspectRatio.x *= iResolution.x / iResolution.y;

    // offsets time for each axis
		time += timeStepOffset;
        
    // gets distance from vec2(0,0)
    distance = length(aspectRatio);
        
    // magic 1: study
		coordinates2D += aspectRatio / distance * (sin(time) + waveNear) * abs(sin(distance * fov - time));

    // magic 2: study again
		haloColors[index] = length(abs(mod(coordinates2D, 1.) - .5));
	}

  // dividing for distance to get light
  gl_FragColor = vec4(haloColors / distance / brightnessDiffuse, 1.);
}
`

const colorPalette = [
  '#f00',
  '#f99',
]
const height = 25
const amount = 100

function getSpinRings(amount: number): THREE.Group {
  const group = new THREE.Group()
  for (let itemIndex = 0; itemIndex < amount; itemIndex++) {
    const ring = getRing({
      color: colorPalette[Math.round(Math.random() * colorPalette.length)],
      y: height
    })
    const portion = itemIndex / amount
    const spins = 100
    const spiralRadius = Math.sin(portion * Math.PI) * height

    ring.position.set(
      Math.sin(portion * spins) * spiralRadius,
      0,
      Math.cos(portion * spins) * spiralRadius
    )

    group.name = 'spinningRings'
    
    group.add(ring)
  }

  return group
}

function updateSpinRings(waveRings: THREE.Group) {
  waveRings.children.forEach((ring, itemIndex) => {
    spinSphereRings(ring, itemIndex, waveRings)
  })
}

function spinSphereRings(ring, itemIndex, waveRings) {
  const spins = Date.now() / 1000
  const portion = itemIndex / waveRings.children.length
  const spiralRadius = Math.sin(portion * Math.PI) * height
  const portionSineDistribution = Math.sin((portion - 0.5) * 2 * (Math.PI / 2))
  const heightCenter = height * 2

  ring.lookAt(0, heightCenter, 0)

  ring.position.set(
    Math.sin(portion * spins) * spiralRadius,
    portionSineDistribution * height + heightCenter,
    Math.cos(portion * spins) * spiralRadius
  )

}

function getRing({
  innerRadius = 0.5,
  outerRadius = 2,
  thetaSegments = 3,
  phiSegments = 1,
  thetaStart = 1,
  thetaLength = Math.PI * 2,
  color = 'rgb(255, 68, 68)',
  y = 10
}): THREE.Object3D {
  const geometry = new THREE.RingBufferGeometry(
    innerRadius, outerRadius, thetaSegments,
    phiSegments, thetaStart, thetaLength
  )
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material)

  actions.setUniforms(material)

  mesh.position.y = y

  return mesh
}

export default function RingBufferGeometry() {
  const spinRings = getSpinRings(amount)

  presetScene({
    setup({ scene }) {
      scene.add(spinRings)
    },
    animate() {
      updateSpinRings(spinRings)
    },
  })
}