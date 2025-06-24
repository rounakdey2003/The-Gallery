uniform sampler2D tDiffuse;
uniform float uVelocity;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    
    
    float waveAmplitude = uVelocity * 0.0009;
    float waveFrequency = 4.0 + uVelocity * 0.01;
    
    
    vec2 waveUv = uv;
    waveUv.x += sin(uv.y * waveFrequency + uTime) * waveAmplitude;
    waveUv.y += sin(uv.x * waveFrequency * 5. + uTime * 0.8) * waveAmplitude;
    
    
    float r = texture2D(tDiffuse, vec2(waveUv.x, waveUv.y + uVelocity * 0.0005)).r;
    vec2 gb = texture2D(tDiffuse, waveUv).gb;

    gl_FragColor = vec4(r, gb, r);
}