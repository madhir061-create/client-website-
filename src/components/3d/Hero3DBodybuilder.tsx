import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface Hero3DBodybuilderProps {
  activeMuscleGroup?: string;
  onSelectMuscle?: (muscle: string) => void;
}

export const Hero3DBodybuilder: React.FC<Hero3DBodybuilderProps> = ({
  activeMuscleGroup = 'all',
  onSelectMuscle,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [materialTheme, setMaterialTheme] = useState<'cyber' | 'titanium' | 'gold'>('cyber');
  const [isRotating, setIsRotating] = useState(true);

  // Keep references to update across frames without re-instantiating scene
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const muscleMeshesRef = useRef<{ [key: string]: THREE.Mesh[] }>({});
  const floatingPropsRef = useRef<THREE.Group[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const activeMuscleRef = useRef(activeMuscleGroup);
  const materialThemeRef = useRef(materialTheme);

  activeMuscleRef.current = activeMuscleGroup;
  materialThemeRef.current = materialTheme;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as per Three.js guidelines
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 750;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x070709, 0.04);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 6.2);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    // Warm Key Light (Front-Right Neon Orange)
    const keyLight = new THREE.DirectionalLight(0xff5500, 3.2);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 15;
    }
    scene.add(keyLight);

    // Cool Electric Red Rim / Backlight (Back-Left)
    const rimLight = new THREE.DirectionalLight(0xff1a35, 4.0);
    rimLight.position.set(-4, 4, -3);
    scene.add(rimLight);

    // Top Overhead Light (Aggressive Bodybuilder Stage Lighting)
    const topSpot = new THREE.SpotLight(0xffffff, 4.5, 15, Math.PI / 4, 0.4);
    topSpot.position.set(0, 6, 1);
    scene.add(topSpot);

    // Soft Fill Light
    const hemiLight = new THREE.HemisphereLight(0x221133, 0x050508, 1.2);
    scene.add(hemiLight);

    // Floor Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 5, 64, 64, 60);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.01;
    scene.add(shadowPlane);

    // Procedural knurled / carbon texture for fitness gear
    const makeKnurlTexture = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#141416';
        ctx.fillRect(0, 0, 64, 64);
        ctx.strokeStyle = '#32323a';
        ctx.lineWidth = 1;
        for (let i = -64; i < 128; i += 6) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + 64, 64);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(i, 64);
          ctx.lineTo(i + 64, 0);
          ctx.stroke();
        }
      }
      const t = new THREE.CanvasTexture(c);
      t.wrapS = THREE.RepeatWrapping;
      t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(4, 4);
      return t;
    };
    const knurlMap = makeKnurlTexture();

    // 5. Materials Factory
    const getMaterials = () => {
      const isGold = materialThemeRef.current === 'gold';
      const isTitanium = materialThemeRef.current === 'titanium';

      // Base muscle tone
      const bodyColor = isGold ? 0xcc9a22 : isTitanium ? 0x6e7888 : 0x16181d;
      const bodyRoughness = isGold ? 0.25 : isTitanium ? 0.35 : 0.45;
      const bodyMetalness = isGold ? 0.85 : isTitanium ? 0.9 : 0.6;

      const baseMuscleMat = new THREE.MeshStandardMaterial({
        color: bodyColor,
        roughness: bodyRoughness,
        metalness: bodyMetalness,
        bumpScale: 0.05,
      });

      // Highlighted muscle material (glowing neon orange/electric red)
      const highlightMuscleMat = new THREE.MeshStandardMaterial({
        color: 0xff3b00,
        emissive: 0xff2a00,
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.8,
      });

      // Biomechanical joints & chrome accents
      const chromeMat = new THREE.MeshStandardMaterial({
        color: 0xdde5ee,
        roughness: 0.12,
        metalness: 0.95,
      });

      // Neon conduits
      const neonOrangeMat = new THREE.MeshBasicMaterial({
        color: 0xff5500,
      });

      const plateBlackMat = new THREE.MeshStandardMaterial({
        color: 0x121316,
        roughness: 0.6,
        metalness: 0.3,
        bumpMap: knurlMap,
        bumpScale: 0.08,
      });

      return {
        baseMuscleMat,
        highlightMuscleMat,
        chromeMat,
        neonOrangeMat,
        plateBlackMat,
      };
    };

    let currentMats = getMaterials();

    // 6. Assemble the 3D Muscular Bodybuilder Hero (Composite THREE.Group of 25+ anatomical parts)
    const athleteGroup = new THREE.Group();
    modelGroupRef.current = athleteGroup;
    athleteGroup.position.set(0, 0, 0);

    const muscleMap: { [key: string]: THREE.Mesh[] } = {
      chest: [],
      arms: [],
      core: [],
      back: [],
      legs: [],
    };
    muscleMeshesRef.current = muscleMap;

    // Helper to create anatomical muscle parts
    const addMuscle = (
      geo: THREE.BufferGeometry,
      pos: [number, number, number],
      rot: [number, number, number],
      scale: [number, number, number],
      groupKey: 'chest' | 'arms' | 'core' | 'back' | 'legs',
      customMat?: THREE.Material
    ) => {
      const mesh = new THREE.Mesh(geo, customMat || currentMats.baseMuscleMat);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      mesh.scale.set(...scale);
      mesh.castShadow = !isSoftwareGl;
      mesh.receiveShadow = !isSoftwareGl;
      athleteGroup.add(mesh);
      muscleMap[groupKey].push(mesh);
      return mesh;
    };

    // A. Head & Traps & Neck
    // Head: chiseled jaw athletic head
    const headGeo = new THREE.DodecahedronGeometry(0.24, 1);
    const head = new THREE.Mesh(headGeo, currentMats.chromeMat);
    head.position.set(0, 3.42, 0);
    head.scale.set(0.9, 1.15, 0.95);
    athleteGroup.add(head);

    // Visor / Cyber Eye Glow
    const visorGeo = new THREE.BoxGeometry(0.22, 0.05, 0.1);
    const visor = new THREE.Mesh(visorGeo, currentMats.neonOrangeMat);
    visor.position.set(0, 3.46, 0.2);
    athleteGroup.add(visor);

    // Muscular Neck
    const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.28, 16);
    const neck = new THREE.Mesh(neckGeo, currentMats.baseMuscleMat);
    neck.position.set(0, 3.2, 0);
    athleteGroup.add(neck);

    // Massive Trapezius muscles (Left & Right)
    const trapGeo = new THREE.ConeGeometry(0.3, 0.42, 5);
    const leftTrap = new THREE.Mesh(trapGeo, currentMats.baseMuscleMat);
    leftTrap.position.set(-0.24, 3.12, -0.05);
    leftTrap.rotation.set(0.2, 0, 0.35);
    athleteGroup.add(leftTrap);
    muscleMap.back.push(leftTrap);

    const rightTrap = new THREE.Mesh(trapGeo, currentMats.baseMuscleMat);
    rightTrap.position.set(0.24, 3.12, -0.05);
    rightTrap.rotation.set(0.2, 0, -0.35);
    athleteGroup.add(rightTrap);
    muscleMap.back.push(rightTrap);

    // B. Chest (Pectoralis Major - Left & Right heavy plates)
    const chestGeo = new THREE.BoxGeometry(0.48, 0.42, 0.28);
    const leftChest = addMuscle(chestGeo, [-0.26, 2.78, 0.18], [0.1, 0.15, 0.05], [1, 1, 1], 'chest');
    const rightChest = addMuscle(chestGeo, [0.26, 2.78, 0.18], [0.1, -0.15, -0.05], [1, 1, 1], 'chest');

    // Sternum seam glow line
    const sternumGeo = new THREE.BoxGeometry(0.04, 0.38, 0.04);
    const sternum = new THREE.Mesh(sternumGeo, currentMats.neonOrangeMat);
    sternum.position.set(0, 2.78, 0.29);
    athleteGroup.add(sternum);

    // C. Back & Latissimus Dorsi (V-Taper wings)
    const latGeo = new THREE.ConeGeometry(0.45, 0.85, 6);
    const leftLat = addMuscle(latGeo, [-0.55, 2.65, -0.1], [0.2, 0.3, 0.65], [1, 1.1, 0.7], 'back');
    const rightLat = addMuscle(latGeo, [0.55, 2.65, -0.1], [0.2, -0.3, -0.65], [1, 1.1, 0.7], 'back');

    // Upper Spine / Thoracic Armor
    const spineGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.8, 8);
    const spine = new THREE.Mesh(spineGeo, currentMats.chromeMat);
    spine.position.set(0, 2.68, -0.22);
    athleteGroup.add(spine);

    // D. Core & 8-Pack Abs
    const abGeo = new THREE.BoxGeometry(0.2, 0.16, 0.12);
    for (let row = 0; row < 4; row++) {
      const yPos = 2.44 - row * 0.18;
      // left pack
      addMuscle(abGeo, [-0.12, yPos, 0.17 - row * 0.015], [0, 0.05, 0], [1, 0.9, 1], 'core');
      // right pack
      addMuscle(abGeo, [0.12, yPos, 0.17 - row * 0.015], [0, -0.05, 0], [1, 0.9, 1], 'core');
    }

    // Serratus anterior & Obliques (Rib cuts)
    const obliqueGeo = new THREE.BoxGeometry(0.16, 0.08, 0.15);
    for (let i = 0; i < 3; i++) {
      const y = 2.38 - i * 0.15;
      addMuscle(obliqueGeo, [-0.38, y, 0.1], [0, 0, 0.3], [1, 1, 1], 'core');
      addMuscle(obliqueGeo, [0.38, y, 0.1], [0, 0, -0.3], [1, 1, 1], 'core');
    }

    // Heavy Weightlifting Belt
    const beltGeo = new THREE.CylinderGeometry(0.42, 0.44, 0.22, 16);
    const beltMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f26,
      roughness: 0.3,
      metalness: 0.7,
      bumpMap: knurlMap,
    });
    const belt = new THREE.Mesh(beltGeo, beltMat);
    belt.position.set(0, 1.82, 0);
    athleteGroup.add(belt);

    // Belt Buckle (Gold / Chrome lever)
    const buckleGeo = new THREE.BoxGeometry(0.2, 0.14, 0.08);
    const buckle = new THREE.Mesh(buckleGeo, currentMats.chromeMat);
    buckle.position.set(0, 1.82, 0.43);
    athleteGroup.add(buckle);

    // E. Shoulders (Massive 3D Deltoid Caps)
    const deltGeo = new THREE.SphereGeometry(0.26, 12, 12);
    const leftDelt = addMuscle(deltGeo, [-0.78, 2.98, 0.02], [0, 0, 0.2], [1.1, 1.25, 1], 'arms');
    const rightDelt = addMuscle(deltGeo, [0.78, 2.98, 0.02], [0, 0, -0.2], [1.1, 1.25, 1], 'arms');

    // F. Arms: Biceps & Triceps (In iconic front-double or power pose)
    // Left Bicep & Tricep
    const bicepGeo = new THREE.CylinderGeometry(0.18, 0.15, 0.52, 10);
    const leftUpperArm = addMuscle(bicepGeo, [-1.02, 2.7, 0.15], [-0.4, 0.2, 0.6], [1.1, 1, 1.2], 'arms');
    const rightUpperArm = addMuscle(bicepGeo, [1.02, 2.7, 0.15], [-0.4, -0.2, -0.6], [1.1, 1, 1.2], 'arms');

    // Forearms with athletic taper
    const forearmGeo = new THREE.CylinderGeometry(0.15, 0.1, 0.55, 10);
    const leftForearm = addMuscle(forearmGeo, [-1.22, 2.25, 0.32], [0.6, 0.2, 0.3], [1, 1, 1], 'arms');
    const rightForearm = addMuscle(forearmGeo, [1.22, 2.25, 0.32], [0.6, -0.2, -0.3], [1, 1, 1], 'arms');

    // Clenched Fists with lifting wraps
    const fistGeo = new THREE.BoxGeometry(0.16, 0.16, 0.18);
    const leftFist = new THREE.Mesh(fistGeo, currentMats.chromeMat);
    leftFist.position.set(-1.35, 1.95, 0.52);
    athleteGroup.add(leftFist);

    const rightFist = new THREE.Mesh(fistGeo, currentMats.chromeMat);
    rightFist.position.set(1.35, 1.95, 0.52);
    athleteGroup.add(rightFist);

    // G. Legs: Heavy Quadriceps, Hamstrings & Calves
    // Quadriceps (Teardrop vastus medialis & rectus femoris)
    const quadGeo = new THREE.CylinderGeometry(0.24, 0.18, 0.85, 10);
    const leftThigh = addMuscle(quadGeo, [-0.28, 1.28, 0.05], [0.1, 0, 0.1], [1.15, 1, 1.15], 'legs');
    const rightThigh = addMuscle(quadGeo, [0.28, 1.28, 0.05], [0.1, 0, -0.1], [1.15, 1, 1.15], 'legs');

    // Knee Caps
    const kneeGeo = new THREE.BoxGeometry(0.14, 0.16, 0.1);
    const leftKnee = new THREE.Mesh(kneeGeo, currentMats.chromeMat);
    leftKnee.position.set(-0.28, 0.82, 0.18);
    athleteGroup.add(leftKnee);

    const rightKnee = new THREE.Mesh(kneeGeo, currentMats.chromeMat);
    rightKnee.position.set(0.28, 0.82, 0.18);
    athleteGroup.add(rightKnee);

    // Calves (Gastrocnemius diamond cut)
    const calfGeo = new THREE.ConeGeometry(0.22, 0.75, 10);
    const leftCalf = addMuscle(calfGeo, [-0.28, 0.42, -0.05], [Math.PI, 0, 0.05], [1, 1, 0.9], 'legs');
    const rightCalf = addMuscle(calfGeo, [0.28, 0.42, -0.05], [Math.PI, 0, -0.05], [1, 1, 0.9], 'legs');

    // Athletic Training Shoes
    const shoeGeo = new THREE.BoxGeometry(0.24, 0.16, 0.48);
    const shoeMat = new THREE.MeshStandardMaterial({
      color: 0x111116,
      roughness: 0.3,
      metalness: 0.8,
    });
    const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
    leftShoe.position.set(-0.28, 0.08, 0.1);
    athleteGroup.add(leftShoe);

    const rightShoe = new THREE.Mesh(shoeGeo, shoeMat);
    rightShoe.position.set(0.28, 0.08, 0.1);
    athleteGroup.add(rightShoe);

    scene.add(athleteGroup);

    // 7. Floating 3D Fitness Elements: Heavy Hex Dumbbells & Olympic Plates
    const floatingProps: THREE.Group[] = [];
    floatingPropsRef.current = floatingProps;

    // Helper: Build procedural 3D Dumbbell
    const create3DDumbbell = (scale = 1) => {
      const g = new THREE.Group();
      // Handle with knurling
      const handleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 16);
      const handle = new THREE.Mesh(handleGeo, currentMats.chromeMat);
      handle.rotation.z = Math.PI / 2;
      g.add(handle);

      // Hex heads on left and right
      const hexGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.18, 6);
      const leftHex = new THREE.Mesh(hexGeo, currentMats.plateBlackMat);
      leftHex.rotation.z = Math.PI / 2;
      leftHex.position.x = -0.32;
      g.add(leftHex);

      const rightHex = new THREE.Mesh(hexGeo, currentMats.plateBlackMat);
      rightHex.rotation.z = Math.PI / 2;
      rightHex.position.x = 0.32;
      g.add(rightHex);

      // Neon accent rings on dumbbell edges
      const ringGeo = new THREE.TorusGeometry(0.18, 0.015, 8, 16);
      const leftRing = new THREE.Mesh(ringGeo, currentMats.neonOrangeMat);
      leftRing.rotation.y = Math.PI / 2;
      leftRing.position.x = -0.38;
      g.add(leftRing);

      const rightRing = new THREE.Mesh(ringGeo, currentMats.neonOrangeMat);
      rightRing.rotation.y = Math.PI / 2;
      rightRing.position.x = 0.38;
      g.add(rightRing);

      g.scale.set(scale, scale, scale);
      return g;
    };

    // Helper: Build procedural 3D Olympic Plate (45 LB / 20 KG)
    const create3DPlate = (colorHex = 0xff3b00, scale = 1) => {
      const g = new THREE.Group();
      // Main bumper disk
      const plateGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.08, 32);
      const plateMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.35,
        metalness: 0.4,
      });
      const disc = new THREE.Mesh(plateGeo, plateMat);
      disc.rotation.x = Math.PI / 2;
      g.add(disc);

      // Steel center hub
      const centerGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.09, 24);
      const center = new THREE.Mesh(centerGeo, currentMats.chromeMat);
      center.rotation.x = Math.PI / 2;
      g.add(center);

      // Center hole
      const holeGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.1, 16);
      const holeMat = new THREE.MeshBasicMaterial({ color: 0x050507 });
      const hole = new THREE.Mesh(holeGeo, holeMat);
      hole.rotation.x = Math.PI / 2;
      g.add(hole);

      // Raised outer lip
      const lipGeo = new THREE.TorusGeometry(0.44, 0.035, 12, 32);
      const lip = new THREE.Mesh(lipGeo, plateMat);
      g.add(lip);

      g.scale.set(scale, scale, scale);
      return g;
    };

    // Spawn 5 floating items around the athlete
    const db1 = create3DDumbbell(1.1);
    db1.position.set(-2.6, 2.8, -0.4);
    db1.userData = { speedX: 0.4, speedY: 0.6, baseY: 2.8, floatOffset: 0 };
    scene.add(db1);
    floatingProps.push(db1);

    const db2 = create3DDumbbell(0.85);
    db2.position.set(2.4, 1.4, 0.6);
    db2.userData = { speedX: -0.5, speedY: 0.7, baseY: 1.4, floatOffset: 1.8 };
    scene.add(db2);
    floatingProps.push(db2);

    const pl1 = create3DPlate(0xff5500, 1.0);
    pl1.position.set(2.5, 3.2, -0.6);
    pl1.userData = { speedX: 0.3, speedY: -0.4, baseY: 3.2, floatOffset: 3.2 };
    scene.add(pl1);
    floatingProps.push(pl1);

    const pl2 = create3DPlate(0xff1a35, 0.8);
    pl2.position.set(-2.2, 1.1, 0.8);
    pl2.userData = { speedX: -0.4, speedY: 0.5, baseY: 1.1, floatOffset: 4.5 };
    scene.add(pl2);
    floatingProps.push(pl2);

    // Kinetic cyber ring around base
    const ringGeo = new THREE.TorusGeometry(2.2, 0.025, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      emissive: 0xff3b00,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
    });
    const kineticRing = new THREE.Mesh(ringGeo, ringMat);
    kineticRing.rotation.x = Math.PI / 2.2;
    kineticRing.position.set(0, 0.12, 0);
    scene.add(kineticRing);

    // 8. Mouse parallax listener
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePosRef.current.targetX = x;
      mousePosRef.current.targetY = y;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 9. Resize Listener
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse damping
      mousePosRef.current.x = THREE.MathUtils.damp(
        mousePosRef.current.x,
        mousePosRef.current.targetX,
        4.0,
        delta
      );
      mousePosRef.current.y = THREE.MathUtils.damp(
        mousePosRef.current.y,
        mousePosRef.current.targetY,
        4.0,
        delta
      );

      // Bodybuilder gentle rotation and breathing
      if (athleteGroup) {
        // Continuous slow idle spin plus mouse tracking
        const idleRot = isRotating ? elapsed * 0.18 : 0;
        athleteGroup.rotation.y = idleRot + mousePosRef.current.x * 0.45;
        athleteGroup.rotation.x = mousePosRef.current.y * 0.12;
        // Subtle rhythmic respiratory expansion in chest
        const breath = Math.sin(elapsed * 2.2) * 0.02;
        leftChest.scale.set(1 + breath, 1 + breath, 1 + breath * 1.5);
        rightChest.scale.set(1 + breath, 1 + breath, 1 + breath * 1.5);
      }

      // Floating gear animation
      floatingProps.forEach((item) => {
        const u = item.userData;
        item.rotation.x += u.speedX * delta;
        item.rotation.y += u.speedY * delta;
        item.position.y = u.baseY + Math.sin(elapsed * 1.8 + u.floatOffset) * 0.22;
      });

      // Kinetic ring spin
      if (kineticRing) {
        kineticRing.rotation.z += 0.25 * delta;
      }

      // Camera parallax
      camera.position.x = THREE.MathUtils.damp(camera.position.x, mousePosRef.current.x * 0.6, 2.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 1.8 + mousePosRef.current.y * 0.35, 2.5, delta);
      camera.lookAt(0, 1.9, 0);

      // Update muscle glow highlight based on active selection
      const currentActive = activeMuscleRef.current;
      Object.keys(muscleMap).forEach((groupKey) => {
        const isTargeted = currentActive === 'all' || currentActive === groupKey;
        const targetMat = isTargeted && currentActive !== 'all' ? currentMats.highlightMuscleMat : currentMats.baseMuscleMat;
        muscleMap[groupKey].forEach((m) => {
          if (m.material !== targetMat) {
            m.material = targetMat;
          }
        });
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[650px] lg:h-[780px] flex items-center justify-center overflow-hidden">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" />

      {/* Atmospheric ambient glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-b from-[#ff5500]/20 via-[#ff1a35]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[700px] h-[150px] bg-[#ff5500]/15 blur-2xl rounded-full pointer-events-none" />

      {/* Interactive 3D HUD Dock at the bottom (Skill Directive: Collapsible bottom center dock with zero side occlusion) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-2xl bg-[#0c0c10]/90 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-3">
        {/* Muscle Anatomy Focus Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <span className="text-[11px] font-mono-tech text-zinc-400 uppercase tracking-widest pl-1 mr-1">
            Focus:
          </span>
          {[
            { id: 'all', label: 'Full Physique' },
            { id: 'chest', label: 'Chest' },
            { id: 'arms', label: 'Arms' },
            { id: 'core', label: 'Abs' },
            { id: 'back', label: 'Back' },
            { id: 'legs', label: 'Quads' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectMuscle?.(m.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeMuscleGroup === m.id
                  ? 'bg-gradient-to-r from-[#ff5500] to-[#ff1a35] text-white shadow-lg shadow-[#ff5500]/30'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Viewport controls (Rotate Toggle & Material Shader) */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            title="Toggle 3D Auto Spin"
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono-tech border cursor-pointer transition-colors ${
              isRotating
                ? 'border-[#ff5500]/50 text-[#ff5500] bg-[#ff5500]/10'
                : 'border-white/10 text-zinc-400 bg-white/5 hover:text-white'
            }`}
          >
            {isRotating ? 'Auto-Orbit: ON' : 'Auto-Orbit: OFF'}
          </button>

          <select
            value={materialTheme}
            onChange={(e) => setMaterialTheme(e.target.value as 'cyber' | 'titanium' | 'gold')}
            className="bg-[#17171e] text-zinc-200 border border-white/10 rounded-lg text-xs font-mono-tech px-2 py-1.5 focus:outline-none focus:border-[#ff5500]"
          >
            <option value="cyber">Cyber Matte</option>
            <option value="titanium">Titanium Carbon</option>
            <option value="gold">Champion Gold</option>
          </select>
        </div>
      </div>
    </div>
  );
};
