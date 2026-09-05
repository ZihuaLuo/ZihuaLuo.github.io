export const planetVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const planetFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform float uFocus;
  uniform vec3 uColor;
  uniform vec3 uSecondary;
  uniform vec3 uDeep;
  uniform vec3 uLightDirection;
  uniform vec3 uCenter;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = p * 2.03 + vec2(4.7, 1.9);
      amplitude *= 0.48;
    }
    return value;
  }

  float ridgedFbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.56;
    for (int i = 0; i < 4; i++) {
      float ridge = 1.0 - abs(noise(p) * 2.0 - 1.0);
      value += ridge * ridge * amplitude;
      p = mat2(0.82, -0.57, 0.57, 0.82) * p * 2.14 + vec2(3.1, 6.7);
      amplitude *= 0.47;
    }
    return value;
  }

  void main() {
    vec3 geometricNormal = normalize(vWorldNormal);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 keyLight = normalize(uLightDirection);
    vec2 distortion = vec2(
      fbm(vUv * 5.4 + vec2(uTime * 0.006, -uTime * 0.003)),
      fbm(vUv.yx * 6.1 + vec2(-uTime * 0.004, uTime * 0.002))
    );
    vec2 movingUv = vUv * vec2(7.4, 6.2) + (distortion - 0.5) * 0.74;
    float continents = fbm(movingUv + vec2(uTime * 0.004, 0.0));
    float terrain = ridgedFbm(movingUv * 1.24 - vec2(uTime * 0.003, 0.0));
    float micro = fbm(movingUv * 3.35 + vec2(11.7, -4.3));
    float macroTerrain = fbm(movingUv * 0.52 + vec2(7.4, -3.1));
    float height = continents * 0.42 + terrain * 0.4 + micro * 0.18;
    // Surface-gradient bump mapping: real normal response, not a color-only noise overlay.
    vec3 dpdx = dFdx(vWorldPosition);
    vec3 dpdy = dFdy(vWorldPosition);
    vec3 r1 = cross(dpdy, geometricNormal);
    vec3 r2 = cross(geometricNormal, dpdx);
    float determinant = dot(dpdx, r1);
    vec3 gradient = (r1 * dFdx(height) + r2 * dFdy(height)) / max(abs(determinant), 0.0000001);
    vec3 normal = normalize(geometricNormal - gradient * sign(determinant) * 0.075);

    float lightFacing = dot(geometricNormal, keyLight);
    float terminator = smoothstep(-0.11, 0.16, lightFacing);
    float diffuse = max(dot(normal, keyLight), 0.0) * terminator;
    float landMask = smoothstep(0.42, 0.65, continents * 0.78 + terrain * 0.3);
    float ridge = smoothstep(0.56, 0.86, terrain * 0.74 + micro * 0.35);
    float roughness = mix(0.8, 0.56, ridge * (0.5 + micro * 0.5));
    float cavityAO = mix(0.7, 1.0, smoothstep(0.3, 0.69, height));
    vec3 ocean = mix(uDeep * 0.48, uSecondary * 0.17, macroTerrain);
    vec3 land = mix(uSecondary * 0.2, uColor * 0.62, macroTerrain * 0.6 + ridge * 0.4);
    vec3 albedo = mix(ocean, land, landMask);
    vec3 surface = albedo * (0.022 + diffuse * 1.55) * cavityAO;

    vec3 halfVector = normalize(keyLight + viewDirection);
    float specular = pow(max(dot(normal, halfVector), 0.0), mix(66.0, 24.0, roughness));
    surface += mix(uColor, vec3(0.86, 0.96, 1.0), 0.38) * specular * diffuse * (0.08 + ridge * 0.28);
    float fresnel = pow(1.0 - max(dot(geometricNormal, viewDirection), 0.0), 5.8);
    float rimLight = smoothstep(-0.18, 0.66, lightFacing);
    surface += mix(uColor, vec3(0.76, 0.91, 1.0), 0.2) * fresnel * (0.035 + rimLight * 0.56) * (1.0 + uFocus * 0.12);

    // A faint central bounce ties the bodies to the same environment without filling their shadows.
    vec3 bounceDirection = normalize(vec3(0.0, 0.23, 0.0) - uCenter);
    float bounce = max(dot(normal, bounceDirection), 0.0);
    surface += uSecondary * bounce * (1.0 - terminator) * 0.018 * cavityAO;
    // Opaque even while forming: stars and the rear ring must never shine through the body.
    gl_FragColor = vec4(surface * uReveal, 1.0);
  }
`;

export const atmosphereVertexShader = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uFocus;
  uniform vec3 uLightDirection;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float facing = abs(dot(normalize(vWorldNormal), viewDirection));
    float rim = pow(1.0 - facing, 7.8);
    float halo = pow(1.0 - facing, 13.0);
    float lightSide = smoothstep(-0.2, 0.7, dot(normalize(vWorldNormal), normalize(uLightDirection)));
    float alpha = (rim * 0.7 + halo * 0.42) * uOpacity * (0.12 + lightSide * 0.88) * (0.72 + uFocus * 0.26);
    vec3 atmosphere = mix(uColor, vec3(0.82, 0.97, 1.0), halo * 0.66);
    gl_FragColor = vec4(atmosphere, alpha);
  }
`;

export const pointVertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vStar;
  varying float vOrbitalDepth;
  varying float vTwinkle;
  varying float vClearSpace;
  uniform float uScale;
  uniform float uPointSizeScale;
  uniform float uTime;
  uniform float uTwinkle;
  uniform vec3 uClearCenter;
  uniform vec2 uClearRadius;
  void main() {
    vColor = aColor;
    vStar = smoothstep(0.15, 0.3, aSize);
    // A subset of stars gently switches between near-dark and bright every 2–3.5 seconds.
    float seed = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453);
    float wave = 0.5 + 0.5 * sin(uTime * (1.8 + seed * 1.1) + seed * 6.283185);
    float sparkle = step(0.18, aSize) * step(0.42, seed) * uTwinkle;
    float flicker = mix(0.08, 3.0, smoothstep(0.58, 0.94, wave));
    vTwinkle = mix(1.0, flicker, sparkle);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vOrbitalDepth = (mvPosition.z - (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).z)
      / max(length(modelMatrix[0].xyz), 0.001);
    gl_PointSize = clamp(aSize * uScale * (470.0 / max(5.0, -mvPosition.z)), 1.0, 6.0) * uPointSizeScale;
    gl_Position = projectionMatrix * mvPosition;
    // Keep the black hole and its immediate surroundings free of background points.
    // Project the exclusion area with the camera so it stays aligned through resize/parallax.
    vec4 clearView = viewMatrix * vec4(uClearCenter, 1.0);
    vec4 clearClip = projectionMatrix * clearView;
    vec4 clearEdge = projectionMatrix * (clearView + vec4(uClearRadius, 0.0, 0.0));
    vec2 center = clearClip.xy / clearClip.w;
    vec2 radius = max(abs(clearEdge.xy / clearEdge.w - center), vec2(0.0001));
    float separation = length((gl_Position.xy / gl_Position.w - center) / radius);
    vClearSpace = mix(1.0, smoothstep(1.0, 1.15, separation), step(0.001, uClearRadius.x));
  }
`;

export const pointFragmentShader = /* glsl */ `
  uniform float uOpacity;
  uniform float uOrbitalDepth;
  varying vec3 vColor;
  varying float vStar;
  varying float vOrbitalDepth;
  varying float vTwinkle;
  varying float vClearSpace;
  void main() {
    vec2 centered = gl_PointCoord - vec2(0.5);
    float distanceToCenter = length(centered);
    float core = 1.0 - smoothstep(0.02, 0.23, distanceToCenter);
    float glow = 1.0 - smoothstep(0.05, 0.5, distanceToCenter);
    float rayX = exp(-abs(centered.x) * 42.0) * (1.0 - smoothstep(0.05, 0.5, abs(centered.y)));
    float rayY = exp(-abs(centered.y) * 42.0) * (1.0 - smoothstep(0.05, 0.5, abs(centered.x)));
    float starburst = (rayX + rayY) * vStar;
    float front = smoothstep(-0.28, 0.32, vOrbitalDepth);
    float depthOpacity = mix(1.0, mix(0.28, 1.0, front), uOrbitalDepth);
    float alpha = (core + glow * 0.72 + starburst * 0.86) * uOpacity * depthOpacity * vTwinkle * vClearSpace;
    if (alpha < 0.015) discard;
    gl_FragColor = vec4(mix(vColor, vec3(0.96, 0.995, 1.0), core * 0.54 + starburst * 0.42), alpha);
  }
`;

export const nebulaVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const nebulaFragmentShader = /* glsl */ `
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.52;
    for (int i = 0; i < 5; i++) {
      value += noise(p) * amplitude;
      p = mat2(0.86, -0.51, 0.51, 0.86) * p * 2.03 + vec2(2.7, 5.1);
      amplitude *= 0.48;
    }
    return value;
  }

  void main() {
    vec2 centered = vUv - 0.5;
    float cyanCloud = fbm(vUv * 3.2 + vec2(1.4, -0.8)) * (1.0 - smoothstep(0.1, 0.76, length(centered - vec2(-0.18, 0.12))));
    float violetCloud = fbm(vUv * 4.0 + vec2(-3.2, 4.1)) * (1.0 - smoothstep(0.04, 0.62, length(centered - vec2(0.24, -0.08))));
    vec3 color = vec3(0.02, 0.24, 0.42) * cyanCloud * 0.09 + vec3(0.25, 0.07, 0.45) * violetCloud * 0.075;
    float alpha = clamp((cyanCloud + violetCloud) * 0.022, 0.0, 0.036);
    gl_FragColor = vec4(color, alpha);
  }
`;

export const ringRibbonVertexShader = /* glsl */ `
  varying vec2 vRingPosition;
  varying float vOrbitalDepth;
  void main() {
    vRingPosition = position.xy;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vOrbitalDepth = (viewPosition.z - (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).z)
      / max(length(modelMatrix[0].xyz), 0.001);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export const ringRibbonFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uSecondary;
  uniform float uOpacity;
  varying vec2 vRingPosition;
  varying float vOrbitalDepth;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  void main() {
    float radius = length(vRingPosition);
    float angle = atan(vRingPosition.y, vRingPosition.x);
    float normalizedRadius = clamp((radius - 1.14) / 0.65, 0.0, 1.0);
    float edge = smoothstep(1.14, 1.19, radius) * (1.0 - smoothstep(1.73, 1.79, radius));
    float front = smoothstep(-0.28, 0.32, vOrbitalDepth);
    float broadRibbon = exp(-pow((normalizedRadius - 0.48) * mix(4.1, 3.15, front), 2.0));
    float brightCore = exp(-pow((normalizedRadius - 0.48) * mix(19.0, 15.0, front), 2.0));
    float outerTrace = exp(-pow((normalizedRadius - 0.78) * 17.0, 2.0));
    float striation = 0.72 + 0.28 * sin(normalizedRadius * 105.0 + noise(vec2(angle * 4.0, radius * 18.0)) * 3.0);
    float azimuth = 0.76 + 0.24 * sin(angle * 3.0 + normalizedRadius * 5.0);
    float alpha = edge * (broadRibbon * 0.13 * striation + brightCore * 0.48 + outerTrace * 0.08) * azimuth * uOpacity * mix(0.38, 1.0, front);
    vec3 color = mix(uSecondary * 0.64, uColor, brightCore * 0.75 + normalizedRadius * 0.22);
    color = mix(color, vec3(0.91, 0.985, 1.0), brightCore * 0.52);
    color *= mix(0.5, 1.0, front);
    if (alpha < 0.008) discard;
    gl_FragColor = vec4(color, alpha);
  }
`;

export const accretionVertexShader = /* glsl */ `
  varying vec2 vDiskPosition;
  varying float vOrbitalDepth;
  void main() {
    vDiskPosition = position.xy;
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vOrbitalDepth = (viewPosition.z - (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).z)
      / max(length(modelMatrix[0].xyz), 0.001);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

export const accretionFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uRotation;
  uniform vec3 uCyan;
  uniform vec3 uViolet;
  uniform float uLayerOpacity;
  varying vec2 vDiskPosition;
  varying float vOrbitalDepth;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.52;
    for (int i = 0; i < 5; i++) {
      value += noise(p) * amplitude;
      p = mat2(0.84, -0.54, 0.54, 0.84) * p * 2.03 + vec2(3.7, 1.9);
      amplitude *= 0.48;
    }
    return value;
  }

  void main() {
    float radius = length(vDiskPosition);
    float spinCos = cos(uRotation);
    float spinSin = sin(uRotation);
    vec2 flowPosition = mat2(spinCos, -spinSin, spinSin, spinCos) * vDiskPosition;
    float angle = atan(flowPosition.y, flowPosition.x);
    float radialMask = smoothstep(0.205, 0.285, radius) * (1.0 - smoothstep(1.02, 1.155, radius));
    float coarse = fbm(vec2(angle * 1.82 - uTime * 0.018, radius * 8.2 + uTime * 0.025));
    float detail = fbm(vec2(angle * 4.75 + coarse * 1.7, radius * 23.0 - uTime * 0.055));
    float spiralPhase = angle * 5.0 - radius * 18.0 + uTime * 0.19 + coarse * 2.8;
    float wideFlow = 0.5 + 0.5 * sin(spiralPhase);
    float fineFlow = 0.5 + 0.5 * sin(angle * 11.0 - radius * 42.0 - uTime * 0.12 + detail * 2.2);
    float filamentA = pow(0.5 + 0.5 * sin(angle * 8.0 - radius * 35.0 + uTime * 0.16 + coarse * 2.4), 12.0);
    float filamentB = pow(0.5 + 0.5 * sin(angle * 14.0 + radius * 58.0 - uTime * 0.1 + detail * 2.0), 16.0);
    float bandA = exp(-pow((radius - 0.42) * 8.8, 2.0));
    float bandB = exp(-pow((radius - 0.67) * 6.2, 2.0));
    float bandC = exp(-pow((radius - 0.91) * 8.0, 2.0));
    float flow = mix(0.34, 1.0, smoothstep(0.22, 0.82, wideFlow * 0.63 + fineFlow * 0.2 + detail * 0.42));
    float gaps = 0.66 + 0.34 * smoothstep(0.33, 0.75, detail);
    float asymmetry = 0.66 + 0.34 * cos(angle - 0.65);
    float innerHeat = 1.0 - smoothstep(0.29, 0.72, radius);
    float front = smoothstep(-0.3, 0.3, vOrbitalDepth);
    float alpha = radialMask * ((bandA * 0.58 + bandB * 0.36 + bandC * 0.2 + 0.035) * flow * gaps
      + filamentA * 0.22 + filamentB * 0.11) * asymmetry * mix(0.38, 1.0, front) * uLayerOpacity;
    vec3 plasma = mix(uViolet * 0.72, uCyan, clamp(detail * 0.58 + innerHeat * 0.55, 0.0, 1.0));
    plasma = mix(plasma, vec3(0.92, 0.985, 1.0), clamp(innerHeat * bandA * 0.64 + filamentA * 0.32, 0.0, 0.76));
    plasma *= mix(0.52, 1.0, front);
    if (alpha < 0.009) discard;
    gl_FragColor = vec4(plasma, alpha);
  }
`;
