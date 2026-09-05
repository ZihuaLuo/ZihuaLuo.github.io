import * as THREE from "three";

/** Materials do not dispose their textures. Release each owned GPU resource exactly once. */
export function disposeScene(scene: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) geometries.add(mesh.geometry);
    if (Array.isArray(mesh.material)) mesh.material.forEach((material) => materials.add(material));
    else if (mesh.material) materials.add(mesh.material);
  });
  for (const material of materials) {
    for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value);
    if (material instanceof THREE.ShaderMaterial) {
      for (const uniform of Object.values(material.uniforms)) {
        if (uniform.value instanceof THREE.Texture) textures.add(uniform.value);
      }
    }
  }
  textures.forEach((texture) => texture.dispose());
  materials.forEach((material) => material.dispose());
  geometries.forEach((geometry) => geometry.dispose());
  scene.clear();
}
