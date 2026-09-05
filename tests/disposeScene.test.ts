import assert from 'node:assert/strict';
import { test } from 'node:test';
import * as THREE from 'three';
import { disposeScene } from '../src/scripts/disposeScene.ts';

test('shared geometries, materials, maps and shader textures are disposed exactly once', () => {
  const scene = new THREE.Scene();
  const geometry = new THREE.SphereGeometry();
  const texture = new THREE.Texture();
  const material = new THREE.MeshBasicMaterial({map: texture});
  const shader = new THREE.ShaderMaterial({uniforms: {map: {value: texture}}});
  const counts = new Map();
  for (const resource of [geometry, texture, material, shader]) resource.addEventListener('dispose', () => counts.set(resource, (counts.get(resource) ?? 0) + 1));
  scene.add(new THREE.Mesh(geometry, material), new THREE.Mesh(geometry, [material, shader]));
  disposeScene(scene);
  for (const resource of [geometry, texture, material, shader]) assert.equal(counts.get(resource), 1);
  assert.equal(scene.children.length, 0);
});
