import { useState, useEffect } from 'react';
import { Film } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  // Phase 0: Pure black
  // Phase 1: Logo appears (fade in + scale)
  // Phase 2: Logo pulses with glow
  // Phase 3: Curtain wipes away, reveal app

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),   // Logo fade-in starts
      setTimeout(() => setPhase(2), 1400),  // Logo glow pulse
      setTimeout(() => setPhase(3), 2200),  // Curtain wipe begins
      setTimeout(() => onComplete(), 3000), // Done, remove splash
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className={`splash-overlay ${phase >= 3 ? 'splash-exit' : ''}`}>
      {/* Background particles / film grain texture */}
      <div className="splash-grain" />

      {/* Central logo block */}
      <div className={`splash-logo-group ${phase >= 1 ? 'visible' : ''} ${phase >= 2 ? 'glow' : ''}`}>
        {/* Logo icon */}
        <div className="splash-icon">
          <Film style={{ width: 40, height: 40, color: '#000' }} />
        </div>

        {/* Logo text */}
        <h1 className="splash-title">CineRate</h1>

        {/* Tagline */}
        <p className={`splash-tagline ${phase >= 2 ? 'visible' : ''}`}>
          Discover &amp; Rate Movies
        </p>
      </div>

      {/* Horizontal scanner line */}
      <div className={`splash-scanline ${phase >= 1 ? 'active' : ''}`} />
    </div>
  );
};

export default SplashScreen;
