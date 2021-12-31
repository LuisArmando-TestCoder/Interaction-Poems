export const fragmentShader = /* cs */ `
uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D trance;
uniform vec2 iGeometryResolution;

// http://www.pouet.net/prod.php?which=57245
// If you intend to reuse this shader, please add credits to 'Danilo Guanabara'
// https://www.shadertoy.com/view/XsXXDn

void main() {
  vec2 frequency = texture(trance, vec2(10.0)).xy / 64.;
	vec3 haloColors;
	float distance;
    float brightnessDiffuse = 2. * frequency;
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