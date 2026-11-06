import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface GymEnvironment3DProps {
  onSelectEquipment?: (name: string, description: string) => void;
}

export const GymEnvironment3D: React.FC<GymEnvironment3DProps> = ({ onSelectEquipment }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeCamPreset, setActiveCamPreset] = useState<'overview' | 'rack' | 'bench' | 'dumbbells'>('overview');
  const [lightingTheme, setLightingTheme] = useState<'cyber' | 'stealth' | 'competition'>('cyber');
  const [isExploded, setIsExploded] = useState(false);

  // Scene state references for loop & events
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPos = useRef(new THREE.Vector3(0, 3.2, 7.5));
  const targetCamLook = useRef(new THREE.Vector3(0, 1.4, 0));
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const orbitAngleRef = useRef({ theta: 0, phi: 0.35, radius: 8 });

  // Camera presets
  const setCameraPreset = (preset: 'overview' | 'rack' | 'bench' | 'dumbbells') => {
    setActiveCamPreset(preset);
    if (preset === 'overview') {
      targetCamPos.current.set(0, 3.5, 7.8);
      targetCamLook.current.set(0, 1.2, 0);
    } else if (preset === 'rack') {
      targetCamPos.current.set(-1.8, 2.0, 3.4);
      targetCamLook.current.set(-1.6, 1.8, 0);
      onSelectEquipment?.('Heavy Power Rack & Squat Station', 'Constructed from 3x3" 11-gauge structural steel with laser-cut numbered pinholes, multi-grip pull-up bar, and safety catches.');
    } else if (preset === 'bench') {
      targetCamPos.current.set(0.2, 1.6, 2.8);
      targetCamLook.current.set(0, 1.1, -0.4);
      onSelectEquipment?.('Olympic Competition Bench Press', 'High-density closed-cell vinyl padding, ergonomic lumbar support, rated for 1,200+ lbs capacity.');
    } else if (preset === 'dumbbells') {
      targetCamPos.current.set(2.4, 1.8, 3.2);
      targetCamLook.current.set(2.2, 1.1, 0.4);
      onSelectEquipment?.('Pro Hex Dumbbell Battery', 'Machined solid steel handles with medium-coarse knurling and virgin rubber hexagonal heads from 5 to 150 lbs.');
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
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
    const height = container.clientHeight || 650;

    // 1. Scene & Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080c, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 80);
    camera.position.set(0, 3.5, 7.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Lighting Rig
    // Overhead Gym Tube Lights
    const ceilingLight1 = new THREE.PointLight(0xff5500, 3.5, 14);
    ceilingLight1.position.set(-2, 4.2, 0);
    scene.add(ceilingLight1);

    const ceilingLight2 = new THREE.PointLight(0xff1a35, 3.5, 14);
    ceilingLight2.position.set(2, 4.2, 0);
    scene.add(ceilingLight2);

    const centerWhiteLight = new THREE.DirectionalLight(0xffffff, 2.5);
    centerWhiteLight.position.set(0, 6, 4);
    centerWhiteLight.castShadow = !isSoftwareGl;
    if (centerWhiteLight.shadow) {
      centerWhiteLight.shadow.mapSize.width = 1024;
      centerWhiteLight.shadow.mapSize.height = 1024;
      centerWhiteLight.shadow.bias = -0.0005;
    }
    scene.add(centerWhiteLight);

    const ambientLight = new THREE.AmbientLight(0x1a1a24, 1.2);
    scene.add(ambientLight);

    // Procedural Floor & Rubber Grid
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 128;
    floorCanvas.height = 128;
    const fCtx = floorCanvas.getContext('2d');
    if (fCtx) {
      fCtx.fillStyle = '#101014';
      fCtx.fillRect(0, 0, 128, 128);
      fCtx.strokeStyle = '#202028';
      fCtx.lineWidth = 2;
      fCtx.strokeRect(0, 0, 128, 128);
      // Speckles
      fCtx.fillStyle = '#2c2c36';
      for (let i = 0; i < 40; i++) {
        fCtx.fillRect(Math.random() * 128, Math.random() * 128, 2, 2);
      }
    }
    const floorTex = new THREE.CanvasTexture(floorCanvas);
    floorTex.wrapS = THREE.RepeatWrapping;
    floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(16, 16);

    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.65,
      metalness: 0.25,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = !isSoftwareGl;
    scene.add(floor);

    // Floor Glowing Track Lines (Neon Orange Edge runners)
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xff5500 });
    const lineGeo = new THREE.PlaneGeometry(0.1, 14);

    const lineLeft = new THREE.Mesh(lineGeo, lineMat);
    lineLeft.rotation.x = -Math.PI / 2;
    lineLeft.position.set(-3.5, 0.01, 0);
    scene.add(lineLeft);

    const lineRight = new THREE.Mesh(lineGeo, lineMat);
    lineRight.rotation.x = -Math.PI / 2;
    lineRight.position.set(3.5, 0.01, 0);
    scene.add(lineRight);

    // 4. Equipment Assemblies
    // Shared Materials
    const steelBlackMat = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      metalness: 0.85,
      roughness: 0.25,
    });
    const steelChromeMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.95,
      roughness: 0.1,
    });
    const redPlateMat = new THREE.MeshStandardMaterial({
      color: 0xff1a35,
      roughness: 0.35,
      metalness: 0.4,
    });
    const bluePlateMat = new THREE.MeshStandardMaterial({
      color: 0x0070ff,
      roughness: 0.35,
      metalness: 0.4,
    });
    const orangePlateMat = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      roughness: 0.35,
      metalness: 0.4,
    });
    const benchPadMat = new THREE.MeshStandardMaterial({
      color: 0x1f2025,
      roughness: 0.65,
      metalness: 0.15,
    });
    const neonGlowMat = new THREE.MeshBasicMaterial({ color: 0xff5500 });

    // A. Olympic Heavy Power Cage (Left Zone)
    const rackGroup = new THREE.Group();
    rackGroup.position.set(-1.8, 0, -0.2);

    // 4 Upright Steel Posts
    const postGeo = new THREE.BoxGeometry(0.12, 3.2, 0.12);
    const postPositions = [
      [-0.8, 1.6, -0.8],
      [0.8, 1.6, -0.8],
      [-0.8, 1.6, 0.8],
      [0.8, 1.6, 0.8],
    ];
    postPositions.forEach(([px, py, pz]) => {
      const post = new THREE.Mesh(postGeo, steelBlackMat);
      post.position.set(px, py, pz);
      post.castShadow = !isSoftwareGl;
      rackGroup.add(post);
    });

    // Crossmembers Top & Bottom
    const crossGeoZ = new THREE.BoxGeometry(0.1, 0.1, 1.6);
    const crossGeoX = new THREE.BoxGeometry(1.6, 0.1, 0.1);

    const cTopLeft = new THREE.Mesh(crossGeoZ, steelBlackMat);
    cTopLeft.position.set(-0.8, 3.15, 0);
    rackGroup.add(cTopLeft);

    const cTopRight = new THREE.Mesh(crossGeoZ, steelBlackMat);
    cTopRight.position.set(0.8, 3.15, 0);
    rackGroup.add(cTopRight);

    const cTopBack = new THREE.Mesh(crossGeoX, steelBlackMat);
    cTopBack.position.set(0, 3.15, -0.8);
    rackGroup.add(cTopBack);

    // Multi-Grip Chin-Up Bar
    const chinGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.6, 16);
    const chinBar = new THREE.Mesh(chinGeo, steelChromeMat);
    chinBar.rotation.z = Math.PI / 2;
    chinBar.position.set(0, 3.1, 0.8);
    rackGroup.add(chinBar);

    // Safety Spotter Bars
    const safetyGeo = new THREE.BoxGeometry(0.08, 0.08, 1.6);
    const safetyLeft = new THREE.Mesh(safetyGeo, steelChromeMat);
    safetyLeft.position.set(-0.8, 1.1, 0);
    rackGroup.add(safetyLeft);

    const safetyRight = new THREE.Mesh(safetyGeo, steelChromeMat);
    safetyRight.position.set(0.8, 1.1, 0);
    rackGroup.add(safetyRight);

    // Olympic Barbell in the Rack
    const barbellGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.4, 20);
    const barbell = new THREE.Mesh(barbellGeo, steelChromeMat);
    barbell.rotation.z = Math.PI / 2;
    barbell.position.set(0, 1.9, 0.2);
    rackGroup.add(barbell);

    // Bumper Plates on Barbell (Both sides)
    const plateGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.07, 24);
    [-0.95, -1.04, 0.95, 1.04].forEach((x, idx) => {
      const pMat = idx % 2 === 0 ? redPlateMat : orangePlateMat;
      const plate = new THREE.Mesh(plateGeo, pMat);
      plate.rotation.z = Math.PI / 2;
      plate.position.set(x, 1.9, 0.2);
      plate.castShadow = !isSoftwareGl;
      rackGroup.add(plate);
    });

    scene.add(rackGroup);

    // B. Center Competition Bench Press
    const benchGroup = new THREE.Group();
    benchGroup.position.set(0, 0, 0.6);

    // Bench Legs & Frame
    const bLegGeo = new THREE.BoxGeometry(0.1, 0.55, 0.1);
    const bLeg1 = new THREE.Mesh(bLegGeo, steelBlackMat);
    bLeg1.position.set(0, 0.28, -0.6);
    benchGroup.add(bLeg1);

    const bLeg2 = new THREE.Mesh(bLegGeo, steelBlackMat);
    bLeg2.position.set(0, 0.28, 0.6);
    benchGroup.add(bLeg2);

    const bBaseSpine = new THREE.BoxGeometry(0.12, 0.08, 1.4);
    const spineM = new THREE.Mesh(bBaseSpine, steelBlackMat);
    spineM.position.set(0, 0.45, 0);
    benchGroup.add(spineM);

    // High Density Leather Pad
    const padGeo = new THREE.BoxGeometry(0.42, 0.1, 1.45);
    const padMesh = new THREE.Mesh(padGeo, benchPadMat);
    padMesh.position.set(0, 0.54, 0);
    padMesh.castShadow = !isSoftwareGl;
    benchGroup.add(padMesh);

    // Incline Support adjustment bracket
    const bracketGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 12);
    const bracket = new THREE.Mesh(bracketGeo, steelChromeMat);
    bracket.position.set(0, 0.4, 0.2);
    benchGroup.add(bracket);

    scene.add(benchGroup);

    // C. Heavy Dumbbell Tier Rack (Right Zone)
    const dbRackGroup = new THREE.Group();
    dbRackGroup.position.set(2.0, 0, 0);

    // Two Tier Rails
    const rackStandGeo = new THREE.BoxGeometry(0.08, 1.1, 0.5);
    const stand1 = new THREE.Mesh(rackStandGeo, steelBlackMat);
    stand1.position.set(-1.1, 0.55, 0);
    dbRackGroup.add(stand1);

    const stand2 = new THREE.Mesh(rackStandGeo, steelBlackMat);
    stand2.position.set(1.1, 0.55, 0);
    dbRackGroup.add(stand2);

    const railGeo = new THREE.BoxGeometry(2.3, 0.06, 0.12);
    const rail1 = new THREE.Mesh(railGeo, steelBlackMat);
    rail1.position.set(0, 0.85, -0.1);
    rail1.rotation.x = 0.2;
    dbRackGroup.add(rail1);

    const rail2 = new THREE.Mesh(railGeo, steelBlackMat);
    rail2.position.set(0, 0.45, 0.08);
    rail2.rotation.x = 0.2;
    dbRackGroup.add(rail2);

    // Dumbbells lined up on the rack
    for (let i = -0.9; i <= 0.9; i += 0.38) {
      const db = new THREE.Group();
      const hGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.28, 12);
      const hMesh = new THREE.Mesh(hGeo, steelChromeMat);
      hMesh.rotation.z = Math.PI / 2;
      db.add(hMesh);

      const headGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 6);
      const h1 = new THREE.Mesh(headGeo, steelBlackMat);
      h1.rotation.z = Math.PI / 2;
      h1.position.x = -0.15;
      db.add(h1);

      const h2 = new THREE.Mesh(headGeo, steelBlackMat);
      h2.rotation.z = Math.PI / 2;
      h2.position.x = 0.15;
      db.add(h2);

      db.position.set(i, 0.93, -0.1);
      db.rotation.x = 0.2;
      dbRackGroup.add(db);
    }

    scene.add(dbRackGroup);

    // D. Overhead Cyber Neon Light Rigs
    const trussGeo = new THREE.BoxGeometry(7, 0.1, 0.1);
    const truss = new THREE.Mesh(trussGeo, steelBlackMat);
    truss.position.set(0, 4.3, 0);
    scene.add(truss);

    const neonBarGeo = new THREE.BoxGeometry(6.6, 0.04, 0.04);
    const neonBar = new THREE.Mesh(neonBarGeo, neonGlowMat);
    neonBar.position.set(0, 4.24, 0);
    scene.add(neonBar);

    // Mouse Dragging to Orbit Camera
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      orbitAngleRef.current.theta -= dx * 0.005;
      orbitAngleRef.current.phi = Math.max(0.1, Math.min(1.2, orbitAngleRef.current.phi - dy * 0.005));

      const r = orbitAngleRef.current.radius;
      targetCamPos.current.x = targetCamLook.current.x + r * Math.sin(orbitAngleRef.current.theta) * Math.cos(orbitAngleRef.current.phi);
      targetCamPos.current.z = targetCamLook.current.z + r * Math.cos(orbitAngleRef.current.theta) * Math.cos(orbitAngleRef.current.phi);
      targetCamPos.current.y = targetCamLook.current.y + r * Math.sin(orbitAngleRef.current.phi);
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera interpolation towards target preset
      camera.position.lerp(targetCamPos.current, 0.06);
      
      // Look at interpolation
      const currentLook = new THREE.Vector3();
      camera.getWorldDirection(currentLook);
      camera.lookAt(targetCamLook.current);

      // Subtle dynamic neon pulse
      const pulse = 2.5 + Math.sin(elapsed * 2.5) * 0.8;
      ceilingLight1.intensity = pulse;
      ceilingLight2.intensity = 3.8 - (pulse - 2.5);

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      canvasDom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      floorGeo.dispose();
      floorMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] lg:h-[700px] rounded-3xl overflow-hidden border border-white/10 bg-[#07070a] shadow-2xl">
      {/* 3D Canvas */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay Badge */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-3 bg-[#0e0e13]/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5500] animate-pulse" />
        <span className="text-xs font-mono-tech tracking-wider text-zinc-300 uppercase">
          KINETIX 3D Heavy Equipment Sim
        </span>
        <span className="text-[10px] bg-white/10 text-zinc-400 px-2 py-0.5 rounded font-mono">
          Drag to Orbit
        </span>
      </div>

      {/* Bottom Floating Control Dock */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-2xl bg-[#0b0b10]/90 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-[11px] font-mono-tech text-zinc-400 uppercase tracking-wider pr-1">
            Camera Tour:
          </span>
          {[
            { id: 'overview', label: 'Gym Overview' },
            { id: 'rack', label: 'Power Rack' },
            { id: 'bench', label: 'Olympic Bench' },
            { id: 'dumbbells', label: 'Dumbbell Tier' },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => setCameraPreset(preset.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeCamPreset === preset.id
                  ? 'bg-gradient-to-r from-[#ff5500] to-[#ff1a35] text-white shadow-lg shadow-[#ff5500]/30'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto text-xs font-mono-tech text-zinc-400">
          <span>Click & drag to explore</span>
        </div>
      </div>
    </div>
  );
};
