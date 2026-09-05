import { planetVertexShader, planetFragmentShader, atmosphereVertexShader, atmosphereFragmentShader, pointVertexShader, pointFragmentShader, nebulaVertexShader, nebulaFragmentShader, ringRibbonVertexShader, ringRibbonFragmentShader, accretionVertexShader, accretionFragmentShader } from "./aiLabShaders";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { getProjectSpawnState, getProjectSpawnTiming, getScanProgress, LAB_SCAN_DURATION_MS } from "./aiLabSequence";
import { createProjectFlightPath, getAccretionRotation, getMotionBlend, updateProjectFlightPath } from "./aiLabMotion";
import { createVisibleAnimationLoop, type AnimationFrameState } from "./animationLifecycle";
import { disposeScene } from "./disposeScene";
import { initializeLabFallback } from "./aiLabFallback";

type ProjectDefinition = {
  id: string;
  number: string;
  category: string;
  title: string;
  titleLines: string[];
  icon: string;
  color: string;
  secondaryColor: string;
  deepColor: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  ringTiltX: number;
  ringTiltZ: number;
  ringDensity: number;
  lightDirection?: [number, number, number];
  position?: [number, number, number?];
};

type PlanetSystem = {
  definition: ProjectDefinition;
  root: THREE.Group;
  core: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
  hitTarget: THREE.Mesh;
  textShell: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  atmosphere: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>;
  ringRoot: THREE.Group;
  ringMeshes: THREE.Object3D[];
  ringMaterials: THREE.Material[];
  particleLayers: THREE.Points[];
  particleMaterials: THREE.ShaderMaterial[];
  selectionArc: THREE.Line;
  target: THREE.Vector3;
  flightTarget: THREE.Vector3;
  flightPath: THREE.CubicBezierCurve3;
  spawnStartedAt: number;
  spawnDuration: number;
  reveal: number;
  focus: number;
  focusTarget: number;
  pulse: number;
};

type LabElement = HTMLElement & {
  spawnProjectPlanet?: (project: ProjectDefinition) => void;
};

type AILabWindow = Window & {
  __aiLabConstellationLoad?: () => void;
};

const setMaterialOpacity = (material: THREE.Material, opacity: number) => {
  if (material instanceof THREE.ShaderMaterial && material.uniforms.uOpacity) {
    material.uniforms.uOpacity.value = opacity;
    return;
  }
  if ("opacity" in material) {
    (material as THREE.Material & { opacity: number }).opacity = opacity;
  }
};

// Shared by the thin secondary curves and sparse debris; the main ribbon uses the same depth cue.
const applyOrbitalDepth = (material: THREE.MeshBasicMaterial | THREE.LineBasicMaterial) => {
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying float vOrbitalDepth;")
      .replace("#include <project_vertex>", `#include <project_vertex>
        vOrbitalDepth = (mvPosition.z - (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).z)
          / max(length(modelMatrix[0].xyz), 0.001);`);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying float vOrbitalDepth;")
      .replace("#include <color_fragment>", `#include <color_fragment>
        float orbitalFront = smoothstep(-0.28, 0.32, vOrbitalDepth);
        diffuseColor.rgb *= mix(0.5, 1.0, orbitalFront);
        diffuseColor.a *= mix(0.38, 1.0, orbitalFront);`);
  };
  material.customProgramCacheKey = () => "orbital-depth-v1";
};

const seededRandom = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
};

const createPointMaterial = (opacity: number, scale = 1) => new THREE.ShaderMaterial({
  vertexShader: pointVertexShader,
  fragmentShader: pointFragmentShader,
  uniforms: {
    uOpacity: { value: opacity },
    uScale: { value: scale },
    uPointSizeScale: { value: 1 },
    uOrbitalDepth: { value: 0 },
    uTime: { value: 0 },
    uTwinkle: { value: 0 },
    uClearCenter: { value: new THREE.Vector3() },
    uClearRadius: { value: new THREE.Vector2() },
  },
  transparent: true,
  depthTest: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const createPointCloud = (
  positions: number[],
  colors: number[],
  sizes: number[],
  opacity: number,
  scale = 1,
) => {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aColor", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new THREE.Float32BufferAttribute(sizes, 1));
  return new THREE.Points(geometry, createPointMaterial(opacity, scale));
};

const makeTextTexture = (project: ProjectDefinition, renderer: THREE.WebGLRenderer) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 768;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);

  const accent = new THREE.Color(project.color);
  const accentCss = `rgb(${Math.round(accent.r * 255)}, ${Math.round(accent.g * 255)}, ${Math.round(accent.b * 255)})`;
  const centerX = canvas.width * 0.25;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.shadowColor = accentCss;
  context.shadowBlur = 0;
  context.strokeStyle = "#E9FCFF";
  context.lineWidth = 4.5;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.globalAlpha = 0.97;

  const iconY = 202;
  if (project.id === "agent-research") {
    const radius = 45;
    context.beginPath();
    for (let index = 0; index < 6; index += 1) {
      const angle = -Math.PI / 2 + (index / 6) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = iconY + Math.sin(angle) * radius;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
    context.globalAlpha = 0.76;
    context.lineWidth = 2.7;
    context.beginPath();
    for (let index = 0; index < 6; index += 1) {
      const angle = -Math.PI / 2 + (index / 6) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * 25;
      const y = iconY + Math.sin(angle) * 25;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
    for (let index = 0; index < 6; index += 1) {
      const angle = -Math.PI / 2 + (index / 6) * Math.PI * 2;
      context.beginPath();
      context.moveTo(centerX + Math.cos(angle) * 25, iconY + Math.sin(angle) * 25);
      context.lineTo(centerX + Math.cos(angle) * 39, iconY + Math.sin(angle) * 39);
      context.stroke();
    }
  } else if (project.id === "retention-lab") {
    context.beginPath();
    context.moveTo(centerX, iconY + 35);
    context.bezierCurveTo(centerX - 12, iconY + 23, centerX - 48, iconY - 1, centerX - 43, iconY - 25);
    context.bezierCurveTo(centerX - 39, iconY - 47, centerX - 10, iconY - 52, centerX, iconY - 29);
    context.bezierCurveTo(centerX + 10, iconY - 52, centerX + 39, iconY - 47, centerX + 43, iconY - 25);
    context.bezierCurveTo(centerX + 48, iconY - 1, centerX + 12, iconY + 23, centerX, iconY + 35);
    context.stroke();
  } else {
    context.beginPath();
    context.moveTo(centerX, iconY - 48);
    context.bezierCurveTo(centerX - 17, iconY - 36, centerX - 31, iconY - 31, centerX - 43, iconY - 29);
    context.lineTo(centerX - 40, iconY + 5);
    context.bezierCurveTo(centerX - 37, iconY + 31, centerX - 18, iconY + 45, centerX, iconY + 54);
    context.bezierCurveTo(centerX + 18, iconY + 45, centerX + 37, iconY + 31, centerX + 40, iconY + 5);
    context.lineTo(centerX + 43, iconY - 29);
    context.bezierCurveTo(centerX + 31, iconY - 31, centerX + 17, iconY - 36, centerX, iconY - 48);
    context.stroke();
    context.globalAlpha = 0.82;
    context.lineWidth = 3.1;
    context.beginPath();
    for (let index = 0; index < 10; index += 1) {
      const radius = index % 2 === 0 ? 20 : 8;
      const angle = -Math.PI / 2 + (index / 10) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = iconY + 3 + Math.sin(angle) * radius;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
  }

  const lineCount = project.titleLines.length;
  const lineHeight = lineCount === 3 ? 74 : 84;
  const firstY = lineCount === 3 ? 310 : 342;
  context.globalAlpha = 0.98;
  context.fillStyle = "#EAFBFF";
  context.shadowBlur = 0;
  context.font = `${lineCount === 3 ? 800 : 820} ${lineCount === 3 ? 67 : 69}px "Arial Narrow", Inter, ui-sans-serif, system-ui, sans-serif`;
  project.titleLines.forEach((line, index) => {
    const curveOffset = Math.abs(index - (lineCount - 1) / 2) * 2;
    context.save();
    context.translate(centerX, firstY + index * lineHeight + curveOffset);
    context.scale(1 - curveOffset * 0.004, 1);
    context.fillText(line.toUpperCase(), 0, 0, 520);
    context.restore();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  texture.needsUpdate = true;
  return texture;
};

const createIrregularRing = (radius: number, seed: number, thickness: number) => {
  const random = seededRandom(seed);
  const points: THREE.Vector3[] = [];
  const phaseOne = random() * Math.PI * 2;
  const phaseTwo = random() * Math.PI * 2;
  for (let index = 0; index < 128; index += 1) {
    const angle = (index / 128) * Math.PI * 2;
    const wobble = Math.sin(angle * 5 + phaseOne) * 0.024
      + Math.sin(angle * 11 + phaseTwo) * 0.011
      + Math.sin(angle * 23 + phaseOne * 0.6) * 0.004;
    const localRadius = radius + wobble;
    points.push(new THREE.Vector3(
      Math.cos(angle) * localRadius,
      Math.sin(angle) * localRadius,
      Math.sin(angle * 7 + phaseTwo) * 0.009 + (random() - 0.5) * 0.014,
    ));
  }
  const curve = new THREE.CatmullRomCurve3(points, true, "centripetal", 0.45);
  return new THREE.TubeGeometry(curve, 256, thickness, 5, true);
};

const createArcGeometry = (radius: number, start: number, length: number, seed: number) => {
  const random = seededRandom(seed);
  const points: THREE.Vector3[] = [];
  for (let index = 0; index <= 36; index += 1) {
    const amount = index / 36;
    const angle = start + amount * length;
    const irregularity = Math.sin(amount * Math.PI * 3 + seed) * 0.015 + (random() - 0.5) * 0.008;
    points.push(new THREE.Vector3(
      Math.cos(angle) * (radius + irregularity),
      Math.sin(angle) * (radius + irregularity),
      (random() - 0.5) * 0.012,
    ));
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 72, 0.006, 4, false);
};

const createSpiralArcGeometry = (
  radius: number,
  start: number,
  length: number,
  radialDrift: number,
  seed: number,
  thickness = 0.006,
) => {
  const random = seededRandom(seed);
  const points: THREE.Vector3[] = [];
  const phase = random() * Math.PI * 2;
  for (let index = 0; index <= 52; index += 1) {
    const amount = index / 52;
    const angle = start + amount * length;
    const turbulence = Math.sin(amount * Math.PI * 5 + phase) * 0.012 + (random() - 0.5) * 0.007;
    const localRadius = radius + radialDrift * amount + turbulence;
    points.push(new THREE.Vector3(
      Math.cos(angle) * localRadius,
      Math.sin(angle) * localRadius,
      Math.sin(amount * Math.PI * 3 + phase) * 0.012 + (random() - 0.5) * 0.012,
    ));
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 96, thickness, 4, false);
};

const createDashedOrbit = (radius: number, color: THREE.Color) => {
  const positions: number[] = [];
  for (let index = 0; index <= 160; index += 1) {
    const angle = (index / 160) * Math.PI * 2;
    positions.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.LineDashedMaterial({
    color,
    transparent: true,
    opacity: 0.2,
    dashSize: 0.035,
    gapSize: 0.065,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const line = new THREE.Line(geometry, material);
  line.computeLineDistances();
  return line;
};

const createParticleBelt = (project: ProjectDefinition, count: number, layer: number) => {
  const random = seededRandom(Number(project.number) * 991 + layer * 173);
  const positions: number[] = [];
  const colors: number[] = [];
  const sizes: number[] = [];
  const primary = new THREE.Color(project.color);
  const secondary = new THREE.Color(project.secondaryColor);
  const white = new THREE.Color(0xe8fbff);
  const clusterCenters = Array.from({ length: 5 }, () => random() * Math.PI * 2);
  const gaps = Array.from({ length: 2 }, () => ({
    center: random() * Math.PI * 2,
    width: 0.14 + random() * 0.17,
  }));
  for (let index = 0; index < count; index += 1) {
    const center = clusterCenters[Math.floor(random() * clusterCenters.length)];
    let angle = random() < 0.82
      ? center + (random() - random()) * (0.22 + random() * 0.42)
      : random() * Math.PI * 2;
    const wraps = (value: number) => Math.abs(Math.atan2(Math.sin(value), Math.cos(value)));
    for (const gap of gaps) {
      if (wraps(angle - gap.center) < gap.width) angle += gap.width * 1.75;
    }
    const clustered = Math.pow(random(), 1.8);
    const radius = 1.35 + layer * 0.13 + (random() - 0.5) * (0.38 + clustered * 0.28);
    const height = (random() - 0.5) * (0.055 + clustered * 0.12);
    positions.push(Math.cos(angle) * radius, Math.sin(angle) * radius, height);
    const category = random();
    const color = category > 0.97 ? white : primary.clone().lerp(secondary, random() * 0.74);
    colors.push(color.r, color.g, color.b);
    const size = category < 0.82
      ? 0.018 + random() * 0.025
      : category < 0.97
        ? 0.046 + random() * 0.032
        : 0.085 + random() * 0.035;
    sizes.push(size);
  }
  return createPointCloud(positions, colors, sizes, 0.82 - layer * 0.11, 1);
};

const createDebrisBelt = (project: ProjectDefinition, count: number, layer: number) => {
  const random = seededRandom(17611 + Number(project.number) * 601 + layer * 97);
  const geometry = new THREE.IcosahedronGeometry(0.052, 0);
  const material = new THREE.MeshBasicMaterial({
    color: project.color,
    transparent: true,
    opacity: 0,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    vertexColors: true,
  });
  material.userData.baseOpacity = 0.24 - layer * 0.05;
  const debris = new THREE.InstancedMesh(geometry, material, count);
  const matrix = new THREE.Matrix4();
  const quaternion = new THREE.Quaternion();
  const position = new THREE.Vector3();
  const scale = new THREE.Vector3();
  const euler = new THREE.Euler();
  const primary = new THREE.Color(project.color);
  const secondary = new THREE.Color(project.secondaryColor);
  const clusterCenters = Array.from({ length: 4 }, () => random() * Math.PI * 2);
  for (let index = 0; index < count; index += 1) {
    const angle = clusterCenters[Math.floor(random() * clusterCenters.length)] + (random() - random()) * 0.46;
    const radius = 1.36 + layer * 0.17 + (random() - 0.5) * 0.4;
    position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (random() - 0.5) * 0.14);
    euler.set(random() * Math.PI, random() * Math.PI, random() * Math.PI);
    quaternion.setFromEuler(euler);
    const base = 0.25 + random() * 0.68;
    scale.set(base * (0.45 + random()), base * (0.32 + random() * 0.7), base * (0.38 + random() * 0.65));
    matrix.compose(position, quaternion, scale);
    debris.setMatrixAt(index, matrix);
    debris.setColorAt(index, primary.clone().lerp(secondary, random() * 0.72));
  }
  debris.instanceMatrix.needsUpdate = true;
  if (debris.instanceColor) debris.instanceColor.needsUpdate = true;
  return debris;
};

const computeOrbitalTargets = (definitions: ProjectDefinition[], aspect: number, compact: boolean) => {
  const count = definitions.length;
  const worldHeight = compact ? 7.35 : 6.15;
  const worldWidth = worldHeight * aspect;
  const halfWidth = (worldHeight * aspect) / 2;
  const safeX = Math.max(1.45, halfWidth - (compact ? 1.05 : 1.42));
  const safeY = worldHeight / 2 - (compact ? 1.1 : 1.4);
  const targets: THREE.Vector3[] = [];

  if (count <= 4) {
    const presets = [
      [0.25, 0.27],
      [0.75, 0.29],
      [0.42, 0.73],
      [0.74, 0.75],
    ];
    for (let index = 0; index < count; index += 1) {
      const [normalizedX, normalizedY, z = 0.12 + (index % 2) * 0.04] = definitions[index].position ?? presets[index];
      targets.push(new THREE.Vector3(
        (normalizedX - 0.5) * worldWidth,
        (0.5 - normalizedY) * worldHeight,
        z,
      ));
    }
    return { targets, worldHeight };
  }

  if (count <= 8) {
    for (let index = 0; index < count; index += 1) {
      const band = index % 2;
      const angle = index * 2.3999632297 + (band ? 0.34 : -0.16);
      const orbitScale = THREE.MathUtils.clamp(definitions[index].orbitRadius / 2.5, 0.82, 1.14);
      const radiusX = safeX * (band ? 0.94 : 0.64) * orbitScale;
      const radiusY = safeY * (band ? 0.88 : 0.62) * orbitScale;
      targets.push(new THREE.Vector3(Math.cos(angle) * radiusX, Math.sin(angle) * radiusY, band * 0.08));
    }
    return { targets, worldHeight };
  }

  const shells = Math.ceil(count / 5);
  for (let index = 0; index < count; index += 1) {
    const shell = index % shells;
    const shellScale = 0.5 + (shell / Math.max(1, shells - 1)) * 0.48;
    const orbitScale = THREE.MathUtils.clamp(definitions[index].orbitRadius / 2.5, 0.8, 1.16);
    const angle = index * 2.3999632297 + shell * 0.43;
    targets.push(new THREE.Vector3(
      Math.cos(angle) * safeX * shellScale * orbitScale,
      Math.sin(angle) * safeY * shellScale * orbitScale,
      shell * 0.035,
    ));
  }
  return { targets, worldHeight };
};

const createBackgroundLayer = (
  count: number,
  width: number,
  height: number,
  depth: number,
  seed: number,
  opacity: number,
  sizeScale: number,
) => {
  const random = seededRandom(seed);
  const clusters = Array.from({ length: 7 }, () => ({
    x: (random() - 0.5) * width,
    y: (random() - 0.5) * height,
  }));
  const positions: number[] = [];
  const colors: number[] = [];
  const sizes: number[] = [];
  const cyan = new THREE.Color(0x67e8f9);
  const violet = new THREE.Color(0xa78bfa);
  for (let index = 0; index < count; index += 1) {
    const cluster = clusters[Math.floor(random() * clusters.length)];
    let x = cluster.x + (random() - 0.5) * width * Math.pow(random(), 0.48) * 0.52;
    let y = cluster.y + (random() - 0.5) * height * Math.pow(random(), 0.48) * 0.48;
    if (random() < 0.18) {
      x = (random() - 0.5) * width;
      y = (random() - 0.5) * height;
    }
    const centerDistance = Math.hypot(x / width, y / height);
    if (centerDistance < 0.12 && random() < 0.72) x += Math.sign(x || 1) * width * 0.15;
    const brightStar = depth < -3 && index % 13 === 0;
    if (brightStar) {
      // Spread the few glints across open space instead of clustering behind planets.
      x = (((index * 0.618034 + 0.23) % 1) - 0.5) * width * 0.9;
      y = (((index * 0.754878 + 0.41) % 1) - 0.5) * height * 0.9;
    }
    const edgeFragment = depth > -3 && index < 3;
    positions.push(
      edgeFragment ? (index % 2 ? 1 : -1) * width * 0.28 : x,
      edgeFragment ? (index === 2 ? -1 : 1) * height * 0.24 : y,
      edgeFragment ? 2.0 + index * 0.25 : depth + (random() - 0.5) * 1.4,
    );
    const color = cyan.clone().lerp(violet, random() * 0.72);
    if (brightStar) color.lerp(new THREE.Color(0xe8f6ff), 0.8);
    colors.push(color.r, color.g, color.b);
    const sizeNoise = random();
    sizes.push((brightStar ? 0.3 + sizeNoise * 0.14 : 0.025 + sizeNoise * 0.055) * sizeScale);
  }
  const stars = createPointCloud(positions, colors, sizes, opacity, 1);
  stars.material.uniforms.uTwinkle.value = 1;
  stars.material.uniforms.uPointSizeScale.value = 0.9;
  return stars;
};

const createSingularity = () => {
  const root = new THREE.Group();
  root.position.set(0, 0.23, -0.02);

  const disk = new THREE.Group();
  disk.name = "TiltedAccretionDisk";
  disk.rotation.order = "ZXY";
  disk.rotation.x = THREE.MathUtils.degToRad(-66);
  disk.rotation.z = THREE.MathUtils.degToRad(-12);
  // Spin inside this fixed plane, not around the screen's Z axis (which would tumble it).
  const diskFlow = new THREE.Group();
  diskFlow.name = "RotatingAccretionFlow";
  disk.add(diskFlow);
  const diskPlaneMaterial = new THREE.ShaderMaterial({
    vertexShader: accretionVertexShader,
    fragmentShader: accretionFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uRotation: { value: 0 },
      uCyan: { value: new THREE.Color(0x44bcff) },
      uViolet: { value: new THREE.Color(0x7866ff) },
      uLayerOpacity: { value: 1 },
    },
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const diskPlane = new THREE.Mesh(new THREE.RingGeometry(0.205, 1.16, 384, 64), diskPlaneMaterial);
  diskPlane.position.z = -0.015;
  diskFlow.add(diskPlane);
  const diskMaterials: THREE.MeshBasicMaterial[] = [];
  const random = seededRandom(481516);
  for (let index = 0; index < 7; index += 1) {
    const radius = 0.27 + random() * 0.78;
    const arcLength = 0.34 + random() * 1.62;
    const start = random() * Math.PI * 2;
    const colorPick = random();
    const geometry = createSpiralArcGeometry(
      radius,
      start,
      arcLength,
      (random() - 0.5) * 0.16,
      3400 + index * 31,
      index === 0 ? 0.007 : 0.0025 + random() * 0.0025,
    );
    const material = new THREE.MeshBasicMaterial({
      color: colorPick > 0.9 ? 0xf4fbff : colorPick > 0.65 ? 0x8f6cff : 0x32dfff,
      transparent: true,
      opacity: 0.08 + random() * 0.2,
      depthTest: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    });
    diskMaterials.push(material);
    applyOrbitalDepth(material);
    const streak = new THREE.Mesh(geometry, material);
    streak.position.z = (random() - 0.5) * 0.052;
    diskFlow.add(streak);
  }

  const streamGroups: THREE.Points[] = [];
  for (let layer = 0; layer < 1; layer += 1) {
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    const cyan = new THREE.Color(0x44bcff);
    const violet = new THREE.Color(0x7866ff);
    const white = new THREE.Color(0xddf8ff);
    const count = 42;
    for (let index = 0; index < count; index += 1) {
      const angle = random() * Math.PI * 2;
      const radiusBias = Math.pow(random(), 0.66);
      const radius = 0.24 + radiusBias * (0.82 + layer * 0.035);
      const spiral = angle + (1.12 - radius) * (2.65 + layer * 0.24) + Math.sin(angle * 3.0) * 0.035;
      positions.push(
        Math.cos(spiral) * radius,
        Math.sin(spiral) * radius,
        (random() - 0.5) * (0.045 + layer * 0.014),
      );
      const colorChoice = random();
      const color = colorChoice > 0.9 ? white.clone() : colorChoice > 0.65 ? violet.clone() : cyan.clone();
      if (radius < 0.42) color.lerp(white, 0.58);
      colors.push(color.r, color.g, color.b);
      const highlight = colorChoice > 0.97 ? 1.5 : 1;
      sizes.push((0.016 + random() * 0.032) * (radius < 0.45 ? 1.18 : 1) * highlight);
    }
    const stream = createPointCloud(positions, colors, sizes, 0.26, 0.82);
    stream.material.uniforms.uOrbitalDepth.value = 1;
    streamGroups.push(stream);
    diskFlow.add(stream);
  }
  root.add(disk);

  // A dim, curved image of the rear plasma is lensed above the horizon. No new particles.
  const rearDiskMaterial = diskPlaneMaterial.clone();
  rearDiskMaterial.uniforms.uLayerOpacity.value = 0.45;
  const rearDiskGeometry = new THREE.RingGeometry(0.34, 0.7, 192, 20, 0, Math.PI);
  const rearPositions = rearDiskGeometry.getAttribute("position");
  for (let index = 0; index < rearPositions.count; index += 1) {
    const x = rearPositions.getX(index);
    const y = rearPositions.getY(index);
    rearPositions.setXYZ(index, x * 0.93, y * 0.72 + 0.025, -0.14 - y * 0.12);
  }
  rearDiskGeometry.computeVertexNormals();
  const rearDisk = new THREE.Mesh(rearDiskGeometry, rearDiskMaterial);
  rearDisk.name = "LensedRearDiskLayer";
  rearDisk.rotation.z = THREE.MathUtils.degToRad(-12);
  root.add(rearDisk);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 64, 64),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: false,
      depthTest: true,
      depthWrite: true,
      toneMapped: false,
    }),
  );
  core.name = "EventHorizon";
  core.userData.bloomOccluder = true;
  root.add(core);

  const photonMaterial = new THREE.MeshBasicMaterial({
    color: 0xddf8ff,
    transparent: true,
    opacity: 0.96,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const photonRing = new THREE.Mesh(new THREE.TorusGeometry(0.322, 0.009, 10, 224), photonMaterial);
  photonRing.position.z = 0.04;
  root.add(photonRing);

  const lensMaterial = new THREE.MeshBasicMaterial({
    color: 0xb7f3ff,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  [-1, 1].forEach((direction, lensIndex) => {
    const lensPoints: THREE.Vector3[] = [];
    for (let index = 0; index <= 88; index += 1) {
      const angle = Math.PI * 0.08 + (index / 88) * Math.PI * 0.84;
      lensPoints.push(new THREE.Vector3(
        Math.cos(angle) * (0.34 + lensIndex * 0.03),
        direction * (Math.sin(angle) * 0.25 + 0.015),
        0.125,
      ));
    }
    const lensGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(lensPoints), 128, 0.007, 4, false);
    const lensArc = new THREE.Mesh(lensGeometry, lensMaterial);
    root.add(lensArc);
  });

  return { root, disk, diskFlow, photonRing, diskPlane, photonMaterial, lensMaterial, diskMaterials, diskPlaneMaterial, rearDiskMaterial, streamGroups };
};

const initializeLab = (lab: LabElement) => {
  if (lab.dataset.labBound === "true") return;
  lab.dataset.labBound = "true";

  const canvas = lab.querySelector<HTMLCanvasElement>("[data-ai-lab-canvas]");
  const projectJson = lab.querySelector<HTMLScriptElement>("[data-ai-projects]");
  const status = lab.querySelector<HTMLElement>("[data-lab-status]");
  const panel = lab.querySelector<HTMLElement>("[data-project-detail-panel]");
  const closeButton = lab.querySelector<HTMLButtonElement>("[data-detail-close]");
  const accessibleButtons = [...lab.querySelectorAll<HTMLButtonElement>("[data-project-node]")];
  if (!canvas || !projectJson || !panel || !closeButton) return;

  let projects: ProjectDefinition[] = [];
  try {
    projects = JSON.parse(projectJson.textContent || "[]") as ProjectDefinition[];
  } catch {
    initializeLabFallback(lab);
    return;
  }

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    initializeLabFallback(lab);
    return;
  }

  renderer.setPixelRatio(THREE.MathUtils.clamp(window.devicePixelRatio || 1, 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x02040d, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 12);
  camera.lookAt(0, 0, 0);

  const BLOOM_LAYER = 1;
  const bloomSelection = new THREE.Layers();
  bloomSelection.set(BLOOM_LAYER);
  const bloomOccluderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, depthTest: true, depthWrite: true, toneMapped: false });
  const makeRenderTarget = () => {
    const target = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      depthBuffer: true,
    });
    target.samples = renderer.capabilities.isWebGL2 ? 4 : 0;
    return target;
  };
  const bloomComposer = new EffectComposer(renderer, makeRenderTarget());
  bloomComposer.renderToScreen = false;
  bloomComposer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.22, 0.16, 0.88);
  bloomPass.threshold = 0.88;
  bloomPass.strength = 0.22;
  bloomPass.radius = 0.16;
  bloomComposer.addPass(bloomPass);

  const finalComposer = new EffectComposer(renderer, makeRenderTarget());
  finalComposer.addPass(new RenderPass(scene, camera));
  const bloomComposite = new ShaderPass(new THREE.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D baseTexture;
      uniform sampler2D bloomTexture;
      varying vec2 vUv;
      void main() {
        vec4 base = texture2D(baseTexture, vUv);
        vec3 bloom = texture2D(bloomTexture, vUv).rgb;
        gl_FragColor = vec4(base.rgb + bloom, base.a);
      }
    `,
    depthTest: false,
    depthWrite: false,
  }), "baseTexture");
  finalComposer.addPass(bloomComposite);
  finalComposer.addPass(new OutputPass());

  const deepLayer = new THREE.Group();
  const midLayer = new THREE.Group();
  const worldLayer = new THREE.Group();
  const foregroundLayer = new THREE.Group();
  deepLayer.name = "FarStarLayer";
  midLayer.name = "MidStarLayer";
  foregroundLayer.name = "NearStarLayer";
  worldLayer.name = "ConstellationScene";
  scene.add(deepLayer, midLayer, worldLayer, foregroundLayer);

  const nebulaMaterial = new THREE.ShaderMaterial({
    vertexShader: nebulaVertexShader,
    fragmentShader: nebulaFragmentShader,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  const nebula = new THREE.Mesh(new THREE.PlaneGeometry(14, 9), nebulaMaterial);
  nebula.position.z = -6;
  deepLayer.add(nebula);

  const farStars = createBackgroundLayer(390, 28, 22, -18, 1049, 0.3, 0.75);
  const midDust = createBackgroundLayer(140, 18, 14, -8, 2053, 0.21, 0.82);
  const foregroundDust = createBackgroundLayer(24, 12, 9, -2, 8111, 0.12, 1.08);
  deepLayer.add(farStars);
  midLayer.add(midDust);
  foregroundLayer.add(foregroundDust);

  const singularity = createSingularity();
  // The black hole is part of the initial backdrop, not the project release sequence.
  singularity.root.scale.setScalar(1.02);
  singularity.photonRing.layers.enable(BLOOM_LAYER);
  worldLayer.add(singularity.root);

  const planetSystems: PlanetSystem[] = [];
  const hitTargets: THREE.Mesh[] = [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  for (const stars of [farStars, midDust, foregroundDust]) {
    stars.material.uniforms.uClearCenter.value.copy(singularity.root.position);
    stars.material.uniforms.uClearRadius.value.set(1.45, 0.85);
    stars.material.uniforms.uTwinkle.value = reduceMotion ? 0 : 1;
  }
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(4, 4);
  const pointerTarget = new THREE.Vector2();
  const pointerCurrent = new THREE.Vector2();
  const events = new AbortController();
  const eventOptions = { signal: events.signal };
  let width = 1;
  let height = 1;
  let compact = false;
  let worldHeight = 6.15;
  let animation: ReturnType<typeof createVisibleAnimationLoop> | undefined;
  let sequenceStart = -1;
  let hoveredIndex = -1;
  let selectedIndex = -1;
  let projectTrigger: HTMLElement = canvas;
  let pointerDownX = 0;
  let pointerDownY = 0;
  let destroyed = false;
  let stableAnnounced = false;
  const deepLinkedProjectId = new URLSearchParams(window.location.search).get("project");
  let deepLinkOpened = false;
  compact = lab.getBoundingClientRect().width < 520;

  const setStatus = (value: "SCANNING" | "STABLE") => {
    if (status && status.textContent !== value) status.textContent = value;
  };

  const spawnProjectPlanet = (project: ProjectDefinition, index = planetSystems.length) => {
    const primary = new THREE.Color(project.color);
    const secondary = new THREE.Color(project.secondaryColor);
    const deep = new THREE.Color(project.deepColor);
    const brightPrimary = primary.clone().lerp(new THREE.Color(0xeafcff), 0.58);
    const lightDirection = new THREE.Vector3(...(project.lightDirection ?? [-0.82, 0.72, 0.2])).normalize();
    const root = new THREE.Group();
    root.name = `ProjectPlanet/${project.id}`;
    root.position.copy(singularity.root.position);
    root.visible = reduceMotion;
    root.scale.setScalar(reduceMotion ? project.size : 0.001);

    const coreMaterial = new THREE.ShaderMaterial({
      vertexShader: planetVertexShader,
      fragmentShader: planetFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uReveal: { value: reduceMotion ? 1 : 0 },
        uFocus: { value: 0 },
        uColor: { value: primary },
        uSecondary: { value: secondary },
        uDeep: { value: deep },
        uLightDirection: { value: lightDirection },
        uCenter: { value: new THREE.Vector3() },
      },
      transparent: false,
      depthTest: true,
      depthWrite: true,
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.9, 72, 56), coreMaterial);
    core.scale.setScalar(1.22);
    core.userData.planetIndex = index;
    core.userData.bloomOccluder = true;
    root.add(core);

    const textTexture = makeTextTexture(project, renderer);
    const textMaterial = new THREE.MeshBasicMaterial({
      map: textTexture,
      transparent: true,
      opacity: reduceMotion ? 1 : 0,
      alphaTest: 0.035,
      depthTest: true,
      depthWrite: false,
      toneMapped: false,
    });
    const textShell = new THREE.Mesh(new THREE.SphereGeometry(0.908, 72, 56), textMaterial);
    textShell.scale.setScalar(1.22);
    textShell.renderOrder = 2;
    root.add(textShell);

    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        uColor: { value: primary },
        uOpacity: { value: reduceMotion ? 0.09 : 0 },
        uFocus: { value: 0 },
        uLightDirection: { value: lightDirection },
      },
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
    });
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(0.9 * 1.22 * 1.03, 72, 56), atmosphereMaterial);
    atmosphere.layers.enable(BLOOM_LAYER);
    root.add(atmosphere);

    const ringRoot = new THREE.Group();
    ringRoot.rotation.order = "ZXY";
    ringRoot.rotation.x = THREE.MathUtils.degToRad(project.ringTiltX);
    ringRoot.rotation.z = THREE.MathUtils.degToRad(project.ringTiltZ);
    ringRoot.scale.setScalar(0.94);
    root.add(ringRoot);
    const ringMeshes: THREE.Object3D[] = [];
    const ringMaterials: THREE.Material[] = [];

    const ribbonMaterial = new THREE.ShaderMaterial({
      vertexShader: ringRibbonVertexShader,
      fragmentShader: ringRibbonFragmentShader,
      uniforms: {
        uColor: { value: primary },
        uSecondary: { value: secondary },
        uOpacity: { value: reduceMotion ? 0.68 : 0 },
      },
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      toneMapped: false,
    });
    ribbonMaterial.userData.baseOpacity = 0.68;
    const ribbonGeometry = new THREE.TorusGeometry(1.465, 0.325, 12, 320);
    ribbonGeometry.scale(1, 1, 0.07);
    const ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
    ribbon.layers.enable(BLOOM_LAYER);
    ringRoot.add(ribbon);
    ringMeshes.push(ribbon);
    ringMaterials.push(ribbonMaterial);

    [
      { radius: 1.31, tube: 0.0045, opacity: 0.24, color: brightPrimary },
      { radius: 1.86, tube: 0.0035, opacity: 0.16, color: secondary },
    ].forEach((layer, ringIndex) => {
      const material = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: reduceMotion ? layer.opacity : 0,
        depthTest: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      });
      material.userData.baseOpacity = layer.opacity;
      const ring = new THREE.Mesh(createIrregularRing(layer.radius, index * 503 + ringIndex * 71, layer.tube), material);
      ring.position.z = (ringIndex - 0.5) * 0.006;
      ringRoot.add(ring);
      ringMeshes.push(ring);
      ringMaterials.push(material);
    });

    const dashedOrbit = createDashedOrbit(1.75, primary);
    (dashedOrbit.material as THREE.LineDashedMaterial).opacity = reduceMotion ? 0.12 : 0;
    (dashedOrbit.material as THREE.LineDashedMaterial).userData.baseOpacity = 0.12;
    ringRoot.add(dashedOrbit);
    ringMeshes.push(dashedOrbit);
    ringMaterials.push(dashedOrbit.material as THREE.Material);

    const arcRandom = seededRandom(8800 + index * 223);
    for (let arcIndex = 0; arcIndex < 2; arcIndex += 1) {
      const baseOpacity = 0.12 + arcRandom() * 0.14;
      const material = new THREE.MeshBasicMaterial({
        color: arcIndex === 0 ? secondary : primary,
        transparent: true,
        opacity: reduceMotion ? baseOpacity : 0,
        depthTest: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      });
      material.userData.baseOpacity = baseOpacity;
      const arc = new THREE.Mesh(
        createArcGeometry(1.34 + arcRandom() * 0.48, arcRandom() * Math.PI * 2, 0.22 + arcRandom() * 0.48, 9300 + arcIndex * 37 + index),
        material,
      );
      arc.position.z = (arcRandom() - 0.5) * 0.035;
      ringRoot.add(arc);
      ringMeshes.push(arc);
      ringMaterials.push(material);
    }

    const particleLayers: THREE.Points[] = [];
    const particleMaterials: THREE.ShaderMaterial[] = [];
    [0, 1].forEach((layer) => {
      const count = Math.round((project.ringDensity * (layer === 0 ? 34 : 22)) * (compact ? 0.78 : 1));
      const belt = createParticleBelt(project, count, layer);
      const material = belt.material as THREE.ShaderMaterial;
      material.uniforms.uOrbitalDepth.value = 1;
      material.uniforms.uOpacity.value = reduceMotion ? 0.34 - layer * 0.08 : 0;
      belt.position.z = (layer - 0.5) * 0.018;
      ringRoot.add(belt);
      particleLayers.push(belt);
      particleMaterials.push(material);
    });

    [0, 1].forEach((layer) => {
      const debris = createDebrisBelt(project, Math.round((layer === 0 ? 10 : 6) * (compact ? 0.72 : 1)), layer);
      if (reduceMotion) debris.material.opacity = debris.material.userData.baseOpacity;
      debris.position.z = (layer - 0.5) * 0.025;
      ringRoot.add(debris);
      ringMeshes.push(debris);
      ringMaterials.push(debris.material);
    });

    const selectionArcGeometry = new THREE.BufferGeometry();
    const selectionPositions: number[] = [];
    for (let arcIndex = 0; arcIndex <= 44; arcIndex += 1) {
      const angle = -0.32 + (arcIndex / 44) * 1.15;
      selectionPositions.push(Math.cos(angle) * 1.92, Math.sin(angle) * 1.92, 0.02);
    }
    selectionArcGeometry.setAttribute("position", new THREE.Float32BufferAttribute(selectionPositions, 3));
    const selectionArc = new THREE.Line(selectionArcGeometry, new THREE.LineBasicMaterial({
      color: primary,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    ringRoot.add(selectionArc);
    ringMaterials.forEach((material) => {
      if (material instanceof THREE.MeshBasicMaterial || material instanceof THREE.LineBasicMaterial) applyOrbitalDepth(material);
    });

    const hitTarget = core;
    hitTargets.push(hitTarget);
    worldLayer.add(root);

    const spawnTiming = getProjectSpawnTiming(index, projects.length);
    const system: PlanetSystem = {
      definition: project,
      root,
      core,
      hitTarget,
      textShell,
      atmosphere,
      ringRoot,
      ringMeshes,
      ringMaterials,
      particleLayers,
      particleMaterials,
      selectionArc,
      target: new THREE.Vector3(),
      flightTarget: singularity.root.position.clone(),
      flightPath: createProjectFlightPath(singularity.root.position, singularity.root.position),
      spawnStartedAt: spawnTiming.start,
      spawnDuration: spawnTiming.duration,
      reveal: reduceMotion ? 1 : 0,
      focus: 0,
      focusTarget: 0,
      pulse: 0,
    };
    planetSystems.push(system);
    return system;
  };

  projects.forEach((project, index) => spawnProjectPlanet(project, index));
  lab.spawnProjectPlanet = (project) => {
    projects.push(project);
    const system = spawnProjectPlanet(project);
    system.spawnStartedAt = sequenceStart > 0 ? performance.now() - sequenceStart + 80 : 0;
    resize();
  };

  const fillDetailPanel = (project: ProjectDefinition) => {
    const button = accessibleButtons.find((item) => item.dataset.projectId === project.id);
    if (!button) return;
    accessibleButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    const title = panel.querySelector<HTMLElement>("[data-detail-title]");
    if (title) title.textContent = project.title;
    panel.hidden = false;
    lab.dataset.panelOpen = "true";
    animation?.setPaused(true);
    lab.dispatchEvent(new CustomEvent("projectselect", { detail: { project } }));
    closeButton.focus({ preventScroll: true });
  };

  const selectProject = (index: number, updateUrl = true, trigger: HTMLElement = canvas) => {
    if (index < 0 || index >= planetSystems.length || planetSystems[index].reveal < 1) return;
    projectTrigger = trigger;
    selectedIndex = index;
    planetSystems[index].pulse = 1;
    fillDetailPanel(planetSystems[index].definition);
    deepLinkOpened = true;
    if (updateUrl) {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("project", planetSystems[index].definition.id);
      nextUrl.hash = "ai-lab-title";
      window.history.replaceState(window.history.state, "", nextUrl);
    }
  };

  const openDeepLinkedProject = () => {
    if (deepLinkOpened || !deepLinkedProjectId) return;
    const projectIndex = planetSystems.findIndex((system) => system.definition.id === deepLinkedProjectId);
    if (projectIndex < 0) {
      deepLinkOpened = true;
      return;
    }
    if (planetSystems[projectIndex].reveal >= 1) selectProject(projectIndex, false);
  };

  const closeProject = () => {
    panel.hidden = true;
    delete lab.dataset.panelOpen;
    animation?.setPaused(false);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete("project");
    window.history.replaceState(window.history.state, "", nextUrl);
    accessibleButtons.forEach((button) => button.setAttribute("aria-pressed", "false"));
    selectedIndex = -1;
    // Pointer/deep-link entry returns to the canvas; keyboard entry returns to its button.
    // Focusing a clipped keyboard button after a pointer click would reveal it over the planets.
    if (projectTrigger === canvas) canvas.tabIndex = -1;
    projectTrigger.focus({ preventScroll: true });
  };

  accessibleButtons.forEach((button, index) => {
    button.addEventListener("click", () => selectProject(index, true, button), eventOptions);
    button.addEventListener("focus", () => { hoveredIndex = index; animation?.invalidate(); }, eventOptions);
    button.addEventListener("blur", () => { if (hoveredIndex === index) hoveredIndex = -1; animation?.invalidate(); }, eventOptions);
  });
  closeButton.addEventListener("click", closeProject, eventOptions);

  const resize = () => {
    const bounds = lab.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    compact = width < 520;
    const targetPixelRatio = THREE.MathUtils.clamp(window.devicePixelRatio || 1, 1, compact ? 1.75 : 2);
    renderer.setPixelRatio(targetPixelRatio);
    renderer.setSize(width, height, false);
    bloomComposer.setPixelRatio(targetPixelRatio);
    bloomComposer.setSize(width, height);
    finalComposer.setPixelRatio(targetPixelRatio);
    finalComposer.setSize(width, height);
    const layout = computeOrbitalTargets(projects, width / height, compact);
    worldHeight = layout.worldHeight;
    camera.aspect = width / height;
    camera.position.z = worldHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    camera.updateProjectionMatrix();
    layout.targets.forEach((target, index) => {
      // Preserve the triangular screen composition while keeping genuine Z-dependent scale.
      const depthFraming = (camera.position.z - target.z) / camera.position.z;
      target.x *= depthFraming;
      target.y *= depthFraming;
      const system = planetSystems[index];
      if (!system) return;
      system.target.copy(target);
      if (sequenceStart < 0 || reduceMotion) {
        system.flightTarget.copy(target);
        updateProjectFlightPath(system.flightPath, singularity.root.position, target);
      }
    });
    animation?.invalidate();
  };

  const updatePointer = (event: PointerEvent) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    pointerTarget.x = THREE.MathUtils.clamp(pointer.x, -1, 1);
    pointerTarget.y = THREE.MathUtils.clamp(pointer.y, -1, 1);
    raycaster.setFromCamera(pointer, camera);
    const readyTargets = hitTargets.filter((target) => planetSystems[Number(target.userData.planetIndex)]?.reveal >= 1);
    const intersection = raycaster.intersectObjects(readyTargets, false)[0];
    hoveredIndex = intersection ? Number(intersection.object.userData.planetIndex) : -1;
    canvas.style.cursor = hoveredIndex >= 0 ? "pointer" : "default";
    animation?.invalidate();
  };

  canvas.addEventListener("pointermove", updatePointer, eventOptions);
  canvas.addEventListener("pointerleave", () => {
    pointer.set(4, 4);
    pointerTarget.set(0, 0);
    hoveredIndex = -1;
    canvas.style.cursor = "default";
    animation?.invalidate();
  }, eventOptions);
  canvas.addEventListener("pointerdown", (event) => {
    updatePointer(event);
    pointerDownX = event.clientX;
    pointerDownY = event.clientY;
  }, eventOptions);
  canvas.addEventListener("pointerup", (event) => {
    updatePointer(event);
    if (Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY) < 7) selectProject(hoveredIndex);
  }, eventOptions);
  lab.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) closeProject();
    // The placeholder dialog currently has just one interactive control.
    if (event.key === "Tab" && !panel.hidden) { event.preventDefault(); closeButton.focus({ preventScroll: true }); }
  }, eventOptions);

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(lab);
  resize();

  const startSequence = () => {
    if (sequenceStart >= 0) return;
    sequenceStart = performance.now();
    lab.style.setProperty("--lab-scan-progress", reduceMotion ? "1" : "0");
    lab.dataset.labStage = reduceMotion ? "galaxy" : "scan";
    if (reduceMotion) {
      setStatus("STABLE");
      stableAnnounced = true;
      openDeepLinkedProject();
    } else {
      setStatus("SCANNING");
    }
  };

  const render = (frame: AnimationFrameState) => {
    if (destroyed || !lab.isConnected) return;
    const frameDelta = frame.delta;
    const delta = Math.min(frameDelta, 0.035);
    const time = frame.elapsed;
    const now = performance.now();
    const elapsedMs = sequenceStart >= 0 ? now - sequenceStart : -1;

    pointerCurrent.lerp(pointerTarget, reduceMotion ? 1 : 0.045);
    const selected = selectedIndex >= 0 ? planetSystems[selectedIndex] : null;
    const attentionX = selected ? -selected.target.x * 0.038 : 0;
    const attentionY = selected ? -selected.target.y * 0.028 : 0;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, (reduceMotion ? 0 : pointerCurrent.x * 0.12) + attentionX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, (reduceMotion ? 0 : pointerCurrent.y * 0.08) + attentionY, 0.035);
    camera.lookAt(camera.position.x * 0.12, camera.position.y * 0.12, 0);
    deepLayer.position.set(camera.position.x * -0.08, camera.position.y * -0.08, 0);
    midLayer.position.set(camera.position.x * -0.28, camera.position.y * -0.24, 0);
    foregroundLayer.position.set(camera.position.x * -0.58, camera.position.y * -0.52, 0);

    farStars.material.uniforms.uTime.value = reduceMotion ? 0 : time;
    midDust.material.uniforms.uTime.value = reduceMotion ? 0 : time;
    if (!reduceMotion) {
      farStars.rotation.z += delta * 0.0015;
      midDust.rotation.z -= delta * 0.003;
      foregroundDust.rotation.z += delta * 0.006;
    }

    if (sequenceStart >= 0 && !reduceMotion) {
      if (!stableAnnounced) {
        // One clock drives the scan and every complete project; there is no looping CSS animation.
        lab.style.setProperty("--lab-scan-progress", String(getScanProgress(elapsedMs)));
        if (planetSystems.some((system) => elapsedMs >= system.spawnStartedAt)) lab.dataset.labStage = "release";
      }
      if (elapsedMs >= LAB_SCAN_DURATION_MS && !stableAnnounced) {
        stableAnnounced = true;
        lab.dataset.labStage = "galaxy";
        setStatus("STABLE");
      }
    }

    // The halo keeps orbiting after the one-shot scan; its tilt and event horizon stay fixed.
    const accretionTime = reduceMotion ? 0 : time;
    const accretionRotation = getAccretionRotation(time, reduceMotion);
    singularity.diskFlow.rotation.z = accretionRotation;
    singularity.diskPlaneMaterial.uniforms.uTime.value = accretionTime;
    singularity.rearDiskMaterial.uniforms.uTime.value = accretionTime;
    // The lensed rear silhouette stays put, while its texture follows the same orbit.
    singularity.rearDiskMaterial.uniforms.uRotation.value = accretionRotation;
    singularity.streamGroups.forEach((stream, index) => {
      stream.rotation.z = accretionTime * (0.028 + (singularity.streamGroups.length - index) * 0.012);
    });
    singularity.diskMaterials.forEach((material, index) => {
      material.opacity *= 0.997;
      material.opacity += (0.07 + (Math.sin(time * (0.31 + index * 0.013) + index) * 0.5 + 0.5) * 0.16 - material.opacity) * 0.03;
    });
    singularity.photonMaterial.opacity = 0.83 + Math.sin(time * 1.35) * 0.07;
    singularity.lensMaterial.opacity = 0.25 + Math.sin(time * 0.62) * 0.06;

    planetSystems.forEach((system, index) => {
      const spawn = reduceMotion
        ? { visible: true, progress: 1, travel: 1, appearance: 1 }
        : getProjectSpawnState(elapsedMs, system.spawnStartedAt, system.spawnDuration);
      system.root.visible = spawn.visible;
      system.reveal = spawn.progress;
      const ready = spawn.progress >= 1;
      const active = ready && (hoveredIndex === index || selectedIndex === index);
      const distant = ready && hoveredIndex >= 0 && planetSystems[hoveredIndex]?.reveal >= 1 && hoveredIndex !== index && selectedIndex !== index;
      system.focusTarget = active ? 1 : distant ? -0.78 : 0;
      system.focus = THREE.MathUtils.lerp(system.focus, system.focusTarget, getMotionBlend(frameDelta, 0.145));
      const positiveFocus = Math.max(0, system.focus);
      const visibility = system.focus < 0 ? 1 + system.focus * 0.36 : 1;
      const hoverScale = 1 + positiveFocus * 0.035;
      const { appearance, travel } = spawn;
      if (system.flightTarget.distanceToSquared(system.target) > 1e-12) {
        system.flightTarget.lerp(system.target, reduceMotion ? 1 : getMotionBlend(frameDelta));
        if (system.flightTarget.distanceToSquared(system.target) < 1e-12) system.flightTarget.copy(system.target);
        updateProjectFlightPath(system.flightPath, singularity.root.position, system.flightTarget);
      }
      // One pose writer for departure, flight, arrival, and hover. Arc-length sampling
      // keeps curvature from introducing speed bumps; the shared clock is frame-rate independent.
      system.flightPath.getPointAt(travel, system.root.position);
      system.root.scale.setScalar(system.definition.size * Math.max(0.0001, appearance) * hoverScale);
      system.core.material.uniforms.uTime.value = time + index * 7.3;
      system.core.material.uniforms.uCenter.value.copy(system.root.position);
      // Keep the curved lettering centered on the camera-facing hemisphere, not a flat sprite.
      system.textShell.lookAt(camera.position);
      system.textShell.rotateZ([0.08, -0.1, 0.06][index % 3]);
      system.core.material.uniforms.uFocus.value = positiveFocus;
      system.core.material.uniforms.uReveal.value = appearance * visibility;
      system.atmosphere.material.uniforms.uFocus.value = positiveFocus;
      system.atmosphere.material.uniforms.uOpacity.value = appearance * 0.09 * visibility;
      system.textShell.material.opacity = appearance * visibility;
      system.ringMaterials.forEach((material, materialIndex) => {
        const base = Number(material.userData.baseOpacity ?? (materialIndex === 0 ? 0.68 : 0.2));
        setMaterialOpacity(material, base * appearance * visibility * (1 + positiveFocus * 0.2));
      });
      (system.selectionArc.material as THREE.LineBasicMaterial).opacity = THREE.MathUtils.lerp(
        (system.selectionArc.material as THREE.LineBasicMaterial).opacity,
        active ? 0.58 : 0,
        0.08,
      );
      system.core.rotation.y += delta * (0.011 + index * 0.002);
      // Ring/debris travel stays within its tilted plane; the plane itself must not tumble.
      const particleSpeed = 1 + positiveFocus * 0.08;
      system.particleLayers.forEach((layer, layerIndex) => {
        layer.rotation.z += delta * system.definition.orbitSpeed * (0.065 + layerIndex * 0.027) * particleSpeed;
        (layer.material as THREE.ShaderMaterial).uniforms.uOpacity.value = (0.34 - layerIndex * 0.08) * appearance * visibility * (1 + positiveFocus * 0.14);
      });
      if (system.pulse > 0.001) {
        system.pulse = Math.max(0, system.pulse - delta * 0.9);
        const pulse = Math.sin((1 - system.pulse) * Math.PI) * system.pulse;
        (system.selectionArc.material as THREE.LineBasicMaterial).opacity = Math.max(
          (system.selectionArc.material as THREE.LineBasicMaterial).opacity,
          pulse,
        );
      }
    });

    openDeepLinkedProject();

    const bloomHidden: THREE.Object3D[] = [];
    const bloomOccluders: Array<{ mesh: THREE.Mesh; material: THREE.Material | THREE.Material[] }> = [];
    scene.traverse((object) => {
      const renderable = object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points;
      if (renderable && object.visible && !bloomSelection.test(object.layers)) {
        if (object instanceof THREE.Mesh && object.userData.bloomOccluder) {
          bloomOccluders.push({ mesh: object, material: object.material });
          object.material = bloomOccluderMaterial;
        } else {
          bloomHidden.push(object);
          object.visible = false;
        }
      }
    });
    bloomComposer.render(delta);
    bloomOccluders.forEach(({ mesh, material }) => { mesh.material = material; });
    bloomHidden.forEach((object) => { object.visible = true; });
    finalComposer.render(delta);
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      startSequence();
      animation?.invalidate();
      observer.disconnect();
    }
  }, { threshold: 0.22 });
  observer.observe(lab);

  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    animation?.destroy();
    events.abort();
    resizeObserver.disconnect();
    observer.disconnect();
    bloomComposer.passes.forEach((pass) => pass.dispose());
    finalComposer.passes.forEach((pass) => pass.dispose());
    bloomComposer.dispose();
    finalComposer.dispose();
    renderer.dispose();
    bloomOccluderMaterial.dispose();
    disposeScene(scene);
    delete lab.spawnProjectPlanet;
  };
  window.addEventListener("pagehide", (event) => { if (!event.persisted) destroy(); }, eventOptions);
  document.addEventListener("astro:before-swap", destroy, { once: true, ...eventOptions });
  // Establish the backdrop once, then render only when the scene can actually be seen.
  render({ delta: 0, elapsed: 0 });
  animation = createVisibleAnimationLoop(lab, render, { continuous: !reduceMotion });
  if (!panel.hidden) animation.setPaused(true);
};

export const initializeAILabConstellations = () => {
  document.querySelectorAll<LabElement>("[data-ai-lab-map]").forEach(initializeLab);
};

export const bindAILabConstellations = () => {
  const aiLabWindow = window as AILabWindow;
  if (aiLabWindow.__aiLabConstellationLoad) {
    document.removeEventListener("astro:page-load", aiLabWindow.__aiLabConstellationLoad);
  }
  aiLabWindow.__aiLabConstellationLoad = initializeAILabConstellations;
  document.addEventListener("astro:page-load", initializeAILabConstellations);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAILabConstellations, { once: true });
  } else {
    initializeAILabConstellations();
  }
};
