// Zero external audio dependency - pure procedural Web Audio API sound generator

let audioCtx: AudioContext | null = null;
let ambientOscillator: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let isAudioActive = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPlateClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Deep metallic clank
  const osc = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(450, now);
  osc2.frequency.exponentialRampToValueAtTime(150, now + 0.08);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

  osc.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc2.start(now);
  osc.stop(now + 0.2);
  osc2.stop(now + 0.2);
}

export function playSuccessChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const noteTime = now + idx * 0.07;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, noteTime);

    gain.gain.setValueAtTime(0.08, noteTime);
    gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteTime);
    osc.stop(noteTime + 0.4);
  });
}

export function toggleAmbientGymDrone(enabled: boolean) {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (enabled) {
    if (ambientOscillator) return true;
    const now = ctx.currentTime;
    
    // Deep cinematic gym pulse (55Hz low bass sub + subtle filter)
    ambientOscillator = ctx.createOscillator();
    ambientOscillator.type = 'sine';
    ambientOscillator.frequency.setValueAtTime(55, now);

    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.001, now);
    ambientGain.gain.linearRampToValueAtTime(0.025, now + 2); // very subtle

    ambientOscillator.connect(ambientGain);
    ambientGain.connect(ctx.destination);
    ambientOscillator.start(now);
    isAudioActive = true;
    return true;
  } else {
    if (ambientOscillator && ambientGain) {
      const now = ctx.currentTime;
      ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
      setTimeout(() => {
        try {
          ambientOscillator?.stop();
          ambientOscillator?.disconnect();
          ambientOscillator = null;
          ambientGain = null;
        } catch {
          // ignore
        }
      }, 500);
    }
    isAudioActive = false;
    return false;
  }
}

export function getIsAudioActive(): boolean {
  return isAudioActive;
}
