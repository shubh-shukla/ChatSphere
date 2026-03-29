let audioContext = null;

export const playNotificationSound = () => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Resume context if suspended (browser autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const now = audioContext.currentTime;

    // Create two quick tones for a pleasant notification
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    const gain2 = audioContext.createGain();

    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);

    // First tone - higher pitch
    osc1.frequency.setValueAtTime(880, now);
    osc1.type = "sine";
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    // Second tone - slightly lower, delayed
    osc2.frequency.setValueAtTime(660, now + 0.12);
    osc2.type = "sine";
    gain2.gain.setValueAtTime(0.01, now);
    gain2.gain.setValueAtTime(0.12, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc1.start(now);
    osc1.stop(now + 0.15);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.3);
  } catch (e) {
    // Silently fail - audio is non-critical
    console.warn("Could not play notification sound:", e);
  }
};
