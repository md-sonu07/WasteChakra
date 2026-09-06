import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  MATERIAL_COLORS,
  DESTINATION_COLORS,
  DESTINATION_LABELS,
  STAGE_IDS,
  STAGE_LABELS,
  SCENARIOS,
} from "./types";
import {
  STAGE_X,
  DESTINATIONS,
  wasteFractions,
  stageOutcome,
  computePurity,
  routeMaterial,
} from "./engine";

const toSimX = (s) => (s - 525) / 52;

const BIN_POS = {};
DESTINATIONS.forEach((d, i) => {
  const row = Math.floor(i / 2);
  const col = i % 2;
  BIN_POS[d] = {
    x: 10.8 + col * 2.5,
    z: -4.6 + row * 2.5,
    h: 1.3 + row * 0.22,
  };
});

const MAX_PARTICLES = 150;

let particleSeed = 0;

function makeParticle(material) {
  return {
    id: particleSeed++,
    material,
    color: new THREE.Color(MATERIAL_COLORS[material]),
    x: -9.7 + Math.random() * 1.2,
    y: 0.62,
    z: (Math.random() - 0.5) * 0.7,
    seed: Math.random() * 100,
    size: 0.34 + Math.random() * 0.12,
    speed: 1.05 + Math.random() * 0.35,
    stageIndex: 0,
    removed: false,
    routed: false,
    finalRouting: false,
    destination: null,
    dropPos: null,
  };
}

function buildParticlesFromParams(p) {
  const out = [];
  wasteFractions(p, 120).forEach((f) => {
    for (let i = 0; i < f.count; i++) out.push(makeParticle(f.material));
  });
  return out;
}

function updateParticles(ps, p, speed, dt, time) {
  const out = [];
  for (const part of ps) {
    if (part.removed) continue;
    const np = { ...part };

    if (np.routed && !np.finalRouting && np.dropPos) {
      const dx = np.dropPos.x - np.x;
      const dy = np.dropPos.y - np.y;
      const dz = np.dropPos.z - np.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const step = 2.6 * speed * dt;
      if (dist < step) {
        np.removed = true;
        out.push(np);
        continue;
      }
      np.x += (dx / dist) * step;
      np.y += (dy / dist) * step;
      np.z += (dz / dist) * step;
      out.push(np);
      continue;
    }

    if (np.routed && np.finalRouting && np.destination) {
      const t = BIN_POS[np.destination];
      const tx = t.x;
      const ty = t.h + 0.3;
      const tz = t.z;
      const dx = tx - np.x;
      const dy = ty - np.y;
      const dz = tz - np.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const step = 2.4 * speed * dt;
      if (dist < step) {
        np.removed = true;
        out.push(np);
        continue;
      }
      np.x += (dx / dist) * step;
      np.z += (dz / dist) * step;
      np.y += (ty - np.y) * Math.min(1, 3 * dt);
      out.push(np);
      continue;
    }

    np.x += np.speed * speed * dt;

    const stageId = STAGE_IDS[np.stageIndex];
    const stageX3 = toSimX(STAGE_X[stageId]);
    if (np.x >= stageX3) {
      const res = stageOutcome(np.material, stageId, p);
      if (res.action === "extract") {
        np.routed = true;
        np.destination = res.destination;
        np.dropPos = { x: stageX3 + 1.1, y: 0.08, z: 2.7 };
      } else if (np.stageIndex < STAGE_IDS.length - 1) {
        np.stageIndex += 1;
      } else {
        const purity = computePurity(np.material, p);
        const cont = 100 - purity;
        np.destination = routeMaterial(np.material, purity, cont, p.moisture);
        np.routed = true;
        np.finalRouting = true;
      }
    }

    np.y = 0.62 + Math.sin(time * 2.1 + np.seed) * 0.05;
    np.z += Math.sin(time * 1.7 + np.seed) * 0.004;
    out.push(np);
  }
  return out;
}

function makeLabelTexture(text, color = "#334155") {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = color;
  ctx.font = "700 72px 'Space Grotesk', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const words = text.toUpperCase().split(" ");
  let line = 0;
  const lines = ["", ""];
  words.forEach((w) => {
    const trial = (lines[line] ? lines[line] + " " : "") + w;
    if (trial.length > 26 && line < 1) {
      line += 1;
      lines[line] = w;
    } else {
      lines[line] = trial;
    }
  });
  ctx.fillText(lines[0], 512, lines[1] ? 100 : 128);
  if (lines[1]) {
    ctx.font = "700 46px 'Space Grotesk', monospace";
    ctx.fillText(lines[1], 512, 184);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeLabelSprite(text, color) {
  const mat = new THREE.SpriteMaterial({
    map: makeLabelTexture(text, color),
    transparent: true,
    depthWrite: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(3.4, 0.85, 1);
  return sprite;
}

function addBox(parent, w, h, d, x, y, z, material, shadow = true) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  if (shadow) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }
  parent.add(mesh);
  return mesh;
}

function buildMachineGraphics(stageId) {
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xcfd8e3,
    roughness: 0.8,
    metalness: 0.05,
    emissive: new THREE.Color(0x22c55e),
    emissiveIntensity: 0,
  });
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85, metalness: 0.1 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7, metalness: 0.15 });
  const accentCyan = new THREE.MeshStandardMaterial({
    color: 0x0891b2,
    roughness: 0.4,
    metalness: 0.3,
    emissive: new THREE.Color(0x0891b2),
    emissiveIntensity: 0.5,
  });
  const accentRed = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.6 });
  const accentAmber = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.5 });
  const accents = [accentCyan, accentRed, accentAmber];

  let bodyH = 1.7;
  switch (stageId) {
    case "reception":
      bodyH = 2.2;
      break;
    case "shredder":
      bodyH = 1.9;
      break;
    case "trommel":
      bodyH = 1.5;
      break;
    case "optical-sorter":
      bodyH = 1.9;
      break;
    case "routing":
      bodyH = 2;
      break;
  }

  const baseY = 0.5;
  addBox(group, 1.7, 0.18, 1.7, 0, baseY + 0.09, 0, baseMat);
  addBox(group, 1.45, bodyH, 1.45, 0, baseY + 0.18 + bodyH / 2, 0, bodyMat);

  if (stageId === "reception") {
    addBox(group, 1.2, 0.3, 1.2, 0, baseY + 0.18 + bodyH + 0.35, 0, darkMat);
    const funnel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.45, 0.7, 20, 1, true),
      darkMat
    );
    funnel.position.set(0, baseY + 0.18 + bodyH + 0.78, 0);
    group.add(funnel);
  } else if (stageId === "ai-scanner") {
    const cam = addBox(group, 0.38, 0.34, 0.14, 0, baseY + 0.18 + bodyH / 2 + 0.15, 0.75, accentCyan);
    cam.userData = {};
  } else if (stageId === "shredder") {
    for (const dx of [-0.42, 0.42]) {
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.5, 20), darkMat);
      cyl.rotation.z = Math.PI / 2;
      cyl.position.set(dx, baseY + 0.18 + bodyH + 0.22, 0);
      group.add(cyl);
    }
  } else if (stageId === "trommel") {
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 1.5, 26, 1, true), bodyMat);
    drum.rotation.z = Math.PI / 2;
    drum.position.set(0, baseY + 0.18 + bodyH / 2 + 0.12, 0);
    drum.castShadow = true;
    drum.receiveShadow = true;
    group.add(drum);
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.73, 0.73, 0.1, 26), accentAmber);
    ring.rotation.z = Math.PI / 2;
    ring.position.set(0.35, baseY + 0.18 + bodyH / 2 + 0.12, 0);
    group.add(ring);
  } else if (stageId === "magnetic") {
    addBox(group, 1.5, 0.26, 0.34, 0, baseY + 0.18 + bodyH + 0.16, 0, accentRed);
  } else if (stageId === "non-ferrous") {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.2, 24), accentAmber);
    disc.position.set(0, baseY + 0.18 + bodyH + 0.16, 0);
    group.add(disc);
  } else if (stageId === "optical-sorter") {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 20), accentCyan);
    eye.position.set(0, baseY + 0.18 + bodyH / 2 + 0.2, 0.78);
    group.add(eye);
  } else if (stageId === "quality") {
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.66, 0.44),
      new THREE.MeshStandardMaterial({
        color: 0x052e16,
        emissive: new THREE.Color(0x16a34a),
        emissiveIntensity: 0.9,
      })
    );
    screen.position.set(0, baseY + 0.18 + bodyH / 2 + 0.25, 0.74);
    group.add(screen);
  } else if (stageId === "routing") {
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 28, 28),
      new THREE.MeshStandardMaterial({
        color: 0x0c4a6e,
        emissive: new THREE.Color(0x0891b2),
        emissiveIntensity: 0.7,
        roughness: 0.25,
        metalness: 0.2,
      })
    );
    core.position.set(0, baseY + 0.18 + bodyH + 0.45, 0);
    group.add(core);
    core.userData.pulse = true;
    group.userData.pulseCore = core;
  }

  const label = makeLabelSprite(STAGE_LABELS[stageId], "#5b6b7b");
  label.position.set(0, baseY + 0.18 + bodyH + 1.35, 0);
  group.add(label);

  const materials = [bodyMat].concat(accents);
  group.userData.materials = materials;
  group.userData.id = stageId;
  group.userData.type = "stage";

  group.traverse((o) => {
    if (o.isMesh && !o.userData.pulse) o.userData = { id: stageId, type: "stage" };
  });

  return { group, x: toSimX(STAGE_X[stageId]) };
}

function buildBinGraphics(d) {
  const { x, z, h } = BIN_POS[d];
  const group = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(DESTINATION_COLORS[d]),
    roughness: 0.6,
    metalness: 0.1,
    emissive: new THREE.Color(0x22c55e),
    emissiveIntensity: 0,
  });
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.65 });

  addBox(group, 1.25, 0.18, 1.25, 0, 0.09, 0, baseMat);
  addBox(group, 1.02, h, 1.02, 0, 0.18 + h / 2, 0, bodyMat);
  addBox(group, 1.16, 0.1, 1.16, 0, 0.18 + h + 0.05, 0, rimMat);

  const label = makeLabelSprite(DESTINATION_LABELS[d], "#5b6b7b");
  label.scale.set(3.2, 0.8, 1);
  label.position.set(0, 0.28 + h + 0.75, 0);
  group.add(label);

  group.position.set(x, 0, z);
  group.userData.materials = [bodyMat];
  group.userData.id = d;
  group.userData.type = "dest";
  group.traverse((o) => {
    if (o.isMesh) o.userData = { id: d, type: "dest" };
  });
  return group;
}

export default function WasteChakraScene3D({
  running,
  speed,
  params,
  buildKey,
  resetKey,
  selectedNode,
  onHover,
  onSelect,
}) {
  const containerRef = useRef(null);
  const simRef = useRef(null);
  const propsRef = useRef({ running, speed, params: params ?? SCENARIOS["Normal Waste"], selectedNode });
  const emitHover = useRef(onHover);
  const emitSelect = useRef(onSelect);
  const firstBuild = useRef(true);
  const firstReset = useRef(true);

  useEffect(() => {
    propsRef.current = { running, speed, params: params ?? SCENARIOS["Normal Waste"], selectedNode };
  }, [running, speed, params, selectedNode]);

  useEffect(() => {
    emitHover.current = onHover;
    emitSelect.current = onSelect;
  }, [onHover, onSelect]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      container.textContent = "WebGL not supported in this browser.";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth || 800, container.clientHeight || 600, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.cursor = "grab";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(
      45,
      (container.clientWidth || 800) / (container.clientHeight || 600),
      0.1,
      120
    );
    camera.position.set(14, 10, 13.5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.2, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 5;
    controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI / 2.1;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffffff, 1.25);
    sun.position.set(11, 18, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    sun.shadow.camera.far = 60;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xbcd8ff, 0.5);
    fill.position.set(-9, 6, -10);
    scene.add(fill);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 1, metalness: 0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);
    const grid = new THREE.GridHelper(44, 44, 0xbfc9d4, 0xdde5ee);
    grid.position.y = 0.005;
    scene.add(grid);

    // Conveyor belt
    const beltDark = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9 });
    const beltTop = new THREE.MeshStandardMaterial({ color: 0xb7c5d4, roughness: 0.4, metalness: 0.3 });
    addBox(scene, 21, 0.2, 1.6, 0, 0.16, 0, beltDark);
    addBox(scene, 21, 0.05, 1.46, 0, 0.285, 0, beltTop);
    for (let x = -10.4; x <= 10.4; x += 2.6) {
      addBox(scene, 0.18, 0.32, 0.18, x, 0.16, -0.62, beltDark);
      addBox(scene, 0.18, 0.32, 0.18, x, 0.16, 0.62, beltDark);
    }
    for (const x of [-10.5, 10.5]) {
      const pulley = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 1.7, 24), beltDark);
      pulley.rotation.z = Math.PI / 2;
      pulley.position.set(x, 0.31, 0);
      scene.add(pulley);
    }

    // Conveyor line label
    const lineLabel = makeLabelSprite("WASTECHAKRA PROCESSING LINE", "#006e2f");
    lineLabel.scale.set(5, 1.25, 1);
    lineLabel.position.set(-8.2, 1.6, -1.6);
    scene.add(lineLabel);

    const endLabel = makeLabelSprite("END PATHWAYS", "#006e2f");
    endLabel.scale.set(4, 1, 1);
    endLabel.position.set(12.4, 2.4, -6.8);
    scene.add(endLabel);

    // Machines + bins
    const machineGroups = new Map();
    const objectById = new Map();
    STAGE_IDS.forEach((id) => {
      const { group, x } = buildMachineGraphics(id);
      group.position.set(x, 0, 0);
      scene.add(group);
      machineGroups.set(id, group);
      objectById.set(id, { group, type: "stage" });
    });
    DESTINATIONS.forEach((d) => {
      const g = buildBinGraphics(d);
      scene.add(g);
      machineGroups.set(d, g);
      objectById.set(d, { group: g, type: "dest" });
    });

    const interactives = [];
    scene.traverse((o) => {
      if (o.isMesh && o.userData && o.userData.id) interactives.push(o);
    });

    // Selection ring
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.15, 1.34, 64), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.47;
    ring.visible = false;
    scene.add(ring);

    // Particles (instanced)
    const instGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const instMaterial = new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.15 });
    const instMesh = new THREE.InstancedMesh(instGeometry, instMaterial, MAX_PARTICLES);
    instMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    instMesh.count = 0;
    scene.add(instMesh);

    const dummy = new THREE.Object3D();
    let particles = [];

    const syncInstances = (time) => {
      let i = 0;
      for (const p of particles) {
        if (p.removed || i >= MAX_PARTICLES) continue;
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(0, p.id * 1.9 + time * 0.6, (p.id % 5) * 0.11);
        dummy.scale.setScalar(p.size);
        dummy.updateMatrix();
        instMesh.setMatrixAt(i, dummy.matrix);
        instMesh.setColorAt(i, p.color);
        i += 1;
      }
      instMesh.count = i;
      instMesh.instanceMatrix.needsUpdate = true;
      if (instMesh.instanceColor) instMesh.instanceColor.needsUpdate = true;
    };

    const v3 = new THREE.Vector3();
    const projectPercent = (obj) => {
      v3.setFromMatrixPosition(obj.matrixWorld).project(camera);
      return {
        percentX: Math.min(95, Math.max(5, (v3.x * 0.5 + 0.5) * 100)),
        percentY: Math.min(92, Math.max(6, (1 - (v3.y * 0.5 + 0.5)) * 100)),
      };
    };

    // Hover / click
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let hoverId = null;
    let isDown = false;
    let moved = false;
    let downX = 0;
    let downY = 0;

    const pick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(interactives, false);
      if (hits.length === 0) return null;
      return hits[0].object.userData.id || null;
    };

    const onPointerMove = (e) => {
      if (isDown) return;
      const id = pick(e);
      if (id !== hoverId) {
        hoverId = id;
        renderer.domElement.style.cursor = id ? "pointer" : "grab";
        if (id && objectById.has(id)) {
          const obj = objectById.get(id);
          const pct = projectPercent(obj.group);
          emitHover.current({ id, type: obj.type, ...pct });
        } else {
          emitHover.current(null);
        }
      }
    };
    const onClick = (e) => {
      if (moved) return;
      const id = pick(e);
      emitSelect.current(id || null);
    };
    const onPointerDown = (e) => {
      isDown = true;
      moved = false;
      downX = e.clientX;
      downY = e.clientY;
    };
    const onWindowUp = () => {
      isDown = false;
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("click", onClick);
    renderer.domElement.addEventListener("pointerleave", () => {
      hoverId = null;
      renderer.domElement.style.cursor = "grab";
      emitHover.current(null);
    });
    window.addEventListener("pointerup", onWindowUp);

    // Resize
    const resize = () => {
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 600;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Animation loop
    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(0.05, clock.getDelta());
      const t = clock.elapsedTime;
      scene.updateMatrixWorld(true);
      const { running: r, speed: sp, params: p, selectedNode: sel } = propsRef.current;

      if (r && particles.length > 0) {
        particles = updateParticles(particles, p, sp, dt, t);
      }

      // Highlight lerp
      machineGroups.forEach((g) => {
        const selTarget = g.userData.id === sel ? 0.55 : 0;
        const hoverTarget = hoverId === g.userData.id ? 0.25 : 0;
        const target = Math.max(selTarget, hoverTarget);
        (g.userData.materials || []).forEach((m) => {
          m.emissiveIntensity += (target - m.emissiveIntensity) * Math.min(1, 8 * dt);
        });
        const targetScale = g.userData.id === sel ? 1.04 : 1;
        g.scale.x += (targetScale - g.scale.x) * Math.min(1, 6 * dt);
        g.scale.z += (targetScale - g.scale.z) * Math.min(1, 6 * dt);
      });

      // Routing core pulse
      const routingGroup = machineGroups.get("routing");
      if (routingGroup && routingGroup.userData.pulseCore) {
        routingGroup.userData.pulseCore.material.emissiveIntensity = 0.55 + Math.sin(t * 3) * 0.45;
      }

      // Selection ring
      if (sel && objectById.has(sel)) {
        ring.visible = true;
        ring.position.setFromMatrixPosition(objectById.get(sel).group.matrixWorld);
        ring.position.y = objectById.get(sel).type === "dest" ? 0.06 : 0.47;
        const s = 1 + Math.sin(t * 3) * 0.06;
        ring.scale.set(s, s, s);
      } else {
        ring.visible = false;
      }

      syncInstances(t);
      controls.update();
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    simRef.current = {
      build() {
        particles = buildParticlesFromParams(propsRef.current.params);
        instMesh.count = 0;
      },
      clear() {
        particles = [];
        instMesh.count = 0;
      },
    };

    return () => {
      cancelAnimationFrame(raf);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("click", onClick);
      window.removeEventListener("pointerup", onWindowUp);
      ro.disconnect();
      controls.dispose();
      scene.traverse((o) => {
        if (o.isMesh) {
          o.geometry && o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => {
            m.map && m.map.dispose();
            m.dispose();
          });
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      simRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (firstBuild.current) {
      firstBuild.current = false;
      return;
    }
    simRef.current && simRef.current.build();
  }, [buildKey]);

  useEffect(() => {
    if (firstReset.current) {
      firstReset.current = false;
      return;
    }
    simRef.current && simRef.current.clear();
  }, [resetKey]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[1100/620] overflow-hidden rounded-xl bg-surface"
    />
  );
}