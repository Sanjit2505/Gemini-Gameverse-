import React, { useState, useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 165;
const FRAME_DIR = 'frames_optimized';
const FRAME_PREFIX = 'frame_';
const FRAME_EXT = '.webp';
const REGISTER_URL = 'https://forms.gle/qoKKkdprx7mh9sQh6';

const PILLARS = [
  {
    num: '01',
    heading: 'Idea & Concept',
    icon: '💡',
    type: 'p-spark',
    desc: 'Use Google Gemini to build your game concept, storyline, characters, and gameplay mechanics.',
    tag: 'Google Gemini'
  },
  {
    num: '02',
    heading: 'Poster Design',
    icon: '🎨',
    type: 'p-realm',
    desc: 'Generate an original visual poster using Nano Banana showing characters and setting. No text allowed.',
    tag: 'Nano Banana'
  },
  {
    num: '03',
    heading: '60-Second Pitch',
    icon: '⏱️',
    type: 'p-pitch',
    desc: 'Present your game idea and show your poster to the audience in a quick 1-minute pitch.',
    tag: '1-Minute Pitch'
  },
  {
    num: '04',
    heading: 'Audience Voting',
    icon: '🗳️',
    type: 'p-verdict',
    desc: 'The audience votes live on your idea: Would Play or Wouldn\'t Play.',
    tag: 'Audience Vote'
  }
];

const SERPENTINE_TRACK = [
  // Row 1: Left to Right
  {
    path: 'M 40 60 L 300 60',
    color: '#eab308',
    title: '01 REGISTER',
    desc: 'Sign up & pre-survey',
    tx: 165,
    tyTitle: 52,
    tyDesc: 72,
    badge: { num: '01', x: 300, y: 60, color: '#eab308' }
  },
  {
    path: 'M 300 60 L 570 60',
    color: '#22c55e',
    title: '02 EXPLORE',
    desc: 'Google Play Arena',
    tx: 435,
    tyTitle: 52,
    tyDesc: 72,
    badge: { num: '02', x: 570, y: 60, color: '#22c55e' }
  },
  {
    path: 'M 570 60 L 850 60 A 70 70 0 0 1 920 130',
    color: '#06b6d4',
    title: '03 CREATE',
    desc: 'Build with Gemini',
    tx: 710,
    tyTitle: 52,
    tyDesc: 72,
    badge: { num: '03', x: 920, y: 130, color: '#06b6d4' }
  },

  // Row 2: Right to Left
  {
    path: 'M 920 130 A 70 70 0 0 1 850 200 L 610 200',
    color: '#0284c7',
    title: '04 DOCUMENT',
    desc: 'Google Docs concept',
    tx: 730,
    tyTitle: 192,
    tyDesc: 212,
    badge: { num: '04', x: 610, y: 200, color: '#0284c7' }
  },
  {
    path: 'M 610 200 L 370 200',
    color: '#3b82f6',
    title: '05 DESIGN',
    desc: 'Nano Banana poster',
    tx: 490,
    tyTitle: 192,
    tyDesc: 212,
    badge: { num: '05', x: 370, y: 200, color: '#3b82f6' }
  },
  {
    path: 'M 370 200 L 170 200 A 70 70 0 0 0 100 270',
    color: '#8b5cf6',
    title: '06 PITCH',
    desc: '60-second pitch',
    tx: 270,
    tyTitle: 192,
    tyDesc: 212,
    badge: { num: '06', x: 100, y: 270, color: '#8b5cf6' }
  },

  // Row 3: Left to Right
  {
    path: 'M 100 270 A 70 70 0 0 0 170 340 L 440 340',
    color: '#d946ef',
    title: '07 VOTE',
    desc: "Would Play / Wouldn't",
    tx: 305,
    tyTitle: 332,
    tyDesc: 352,
    badge: { num: '07', x: 440, y: 340, color: '#d946ef' }
  },
  {
    path: 'M 440 340 L 710 340',
    color: '#f43f5e',
    title: '08 COMPLETE',
    desc: 'Submit feedback',
    tx: 575,
    tyTitle: 332,
    tyDesc: 352,
    badge: { num: '08', x: 710, y: 340, color: '#f43f5e' }
  },
  {
    path: 'M 710 340 L 980 340',
    color: '#f97316',
    title: 'VICTORY ARENA',
    desc: 'Results & Winners',
    tx: 845,
    tyTitle: 332,
    tyDesc: 352,
    badge: null
  }
];

const FULL_ROAD_PATH = 'M 40 60 L 850 60 A 70 70 0 0 1 850 200 L 170 200 A 70 70 0 0 0 170 340 L 980 340';

const RULES = [
  {
    num: '01',
    category: 'PARTICIPATION RULES',
    badge: 'MANDATORY',
    tagClass: 'rtag-amber',
    items: [
      'Individual participation only.',
      'Each participant must complete event registration.',
      'Pre-event survey and final feedback are compulsory.'
    ]
  },
  {
    num: '02',
    category: 'GAME CREATION RULES',
    badge: 'REQUIRED SPECS',
    tagClass: 'rtag-cyan',
    items: [
      'Create an original game concept.',
      'Every game must contain: Game Name, Tagline, Mission, One Goal, One Enemy, One Deadline, Characters, and Game Mode (Solo / Duo / Squad / 5v5).'
    ]
  },
  {
    num: '03',
    category: 'AI TOOLS USAGE',
    badge: 'APPROVED TOOLS',
    tagClass: 'rtag-cyan',
    items: [
      'Google Gemini Chat – Game ideation and development.',
      'Google Docs – Document your game concept.',
      'Google Nano Banana – Generate your game poster.'
    ]
  },
  {
    num: '04',
    category: 'POSTER CREATION RULES',
    badge: 'DESIGN RULES',
    tagClass: 'rtag-cyan',
    items: [
      'Must show characters, setting, enemies and action scenes.',
      'No text, game name or tagline on the poster.',
      'Must be original, creative and visually appealing.'
    ]
  },
  {
    num: '05',
    category: 'SAFETY & CONTENT RULES',
    badge: 'STRICT POLICY',
    tagClass: 'rtag-red',
    items: [
      'No guns or weapons.',
      'No graphic violence or inappropriate content.',
      'Keep everything positive and campus-friendly.'
    ]
  },
  {
    num: '06',
    category: 'SUBMISSION RULES',
    badge: 'REQUIRED LINKS',
    tagClass: 'rtag-amber',
    items: [
      'Gemini Chat conversation link.',
      'Google Docs concept link.',
      'Nano Banana generated poster image.',
      'Ensure all shared links are accessible to organizers.'
    ]
  },
  {
    num: '07',
    category: 'PRESENTATION RULES',
    badge: '60 SECONDS',
    tagClass: 'rtag-cyan',
    items: [
      'Each participant gets 60 seconds to pitch.',
      'Explain your game concept clearly and showcase your poster.',
      'Stay strictly within the allocated time.'
    ]
  },
  {
    num: '08',
    category: 'VOTING & EVALUATION RULES',
    badge: 'VOTING',
    tagClass: 'rtag-cyan',
    items: [
      'Audience voting: WOULD PLAY / WOULDN\'T PLAY.',
      'Judged on originality, creativity and clear execution.',
      'Follow organizer evaluation instructions; copying others is strictly prohibited.'
    ]
  }
];

function getFramePath(idx) {
  const padded = String(idx).padStart(3, '0');
  return `${FRAME_DIR}/${FRAME_PREFIX}${padded}${FRAME_EXT}`;
}

export default function GameverseApp() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const isLockedRef = useRef(true);
  const accumulatedDeltaRef = useRef(0);
  const isTouchActiveRef = useRef(false);
  const touchStartYRef = useRef(0);
  const rafIdRef = useRef(null);

  // Preload 165 WebP Frames
  useEffect(() => {
    let loadedCount = 0;
    const imgArray = new Array(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImages(imgArray);
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImages(imgArray);
          setImagesLoaded(true);
        }
      };

      imgArray[i] = img;
    }
  }, []);

  // Draw active frame to Canvas with DPR scaling
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayWidth / displayHeight;
    let renderW, renderH, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderW = displayWidth;
      renderH = displayWidth / imgRatio;
      offsetX = 0;
      offsetY = (displayHeight - renderH) / 2;
    } else {
      renderH = displayHeight;
      renderW = displayHeight * imgRatio;
      offsetX = (displayWidth - renderW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  }, [images]);

  useEffect(() => {
    if (imagesLoaded && images.length > 0) {
      drawFrame(0);
    }
  }, [imagesLoaded, images, drawFrame]);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Intercept Wheel on Page 1 until all 165 frames scrub
  useEffect(() => {
    const handleWheel = (e) => {
      const scrollY = window.scrollY || window.pageYOffset;

      if (scrollY > 5) {
        isLockedRef.current = false;
        return;
      }

      if (e.deltaY > 0 && isLockedRef.current) {
        if (targetFrameRef.current < TOTAL_FRAMES - 1) {
          e.preventDefault();
          accumulatedDeltaRef.current += e.deltaY;
          const threshold = 18;

          if (Math.abs(accumulatedDeltaRef.current) >= threshold) {
            const framesToAdvance = Math.floor(accumulatedDeltaRef.current / threshold);
            targetFrameRef.current = Math.min(
              TOTAL_FRAMES - 1,
              targetFrameRef.current + framesToAdvance
            );
            accumulatedDeltaRef.current %= threshold;
          }
        } else {
          isLockedRef.current = false;
        }
      } else if (e.deltaY < 0 && scrollY <= 2) {
        if (targetFrameRef.current > 0) {
          e.preventDefault();
          isLockedRef.current = true;
          accumulatedDeltaRef.current += e.deltaY;
          const threshold = 18;

          if (Math.abs(accumulatedDeltaRef.current) >= threshold) {
            const framesToRewind = Math.floor(Math.abs(accumulatedDeltaRef.current) / threshold);
            targetFrameRef.current = Math.max(
              0,
              targetFrameRef.current - framesToRewind
            );
            accumulatedDeltaRef.current %= threshold;
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Handle Mobile Touch Swiping on Page 1
  useEffect(() => {
    const handleTouchStart = (e) => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY <= 5) {
        isTouchActiveRef.current = true;
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!isTouchActiveRef.current) return;
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 5) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;

      if (deltaY > 0 && isLockedRef.current) {
        if (targetFrameRef.current < TOTAL_FRAMES - 1) {
          e.preventDefault();
          const step = Math.floor(deltaY / 12);
          if (step > 0) {
            targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, targetFrameRef.current + step);
            touchStartYRef.current = currentY;
          }
        } else {
          isLockedRef.current = false;
        }
      } else if (deltaY < 0 && scrollY <= 2) {
        if (targetFrameRef.current > 0) {
          e.preventDefault();
          isLockedRef.current = true;
          const step = Math.floor(Math.abs(deltaY) / 12);
          if (step > 0) {
            targetFrameRef.current = Math.max(0, targetFrameRef.current - step);
            touchStartYRef.current = currentY;
          }
        }
      }
    };

    const handleTouchEnd = () => {
      isTouchActiveRef.current = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Smooth RAF Animation Loop
  useEffect(() => {
    let lastRendered = -1;

    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.22;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const roundIdx = Math.round(currentFrameRef.current);
      if (roundIdx !== lastRendered) {
        drawFrame(roundIdx);
        lastRendered = roundIdx;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  return (
    <div className="app-root">
      {/* Top Header HUD */}
      <header className="top-hud">
        <div className="brand-label">
          <span className="brand-dot" />
          <span>GEMINI GAMEVERSE</span>
        </div>
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="register-btn"
        >
          <span>REGISTER NOW</span>
          <span>→</span>
        </a>
      </header>

      {/* PAGE 1: Interactive Pinned Scroll Frame */}
      <section className="frame-section">
        <canvas ref={canvasRef} className="frame-canvas" />
      </section>

      {/* PAGE 2: Competition Overview */}
      <section className="crt-section" id="concept-page">
        <div className="concept-wrapper">
          <div className="concept-hero">
            <div className="concept-pill">COMPETITION OVERVIEW</div>
            <h2 className="concept-title">CREATE YOUR GAME IDEA &amp; PITCH IT LIVE</h2>
            <p className="concept-tagline">
              Brainstorm an original game concept, design its visual poster using Nano Banana, and present your idea in a 60-second pitch to the audience.
            </p>
          </div>

          <div className="concept-pillars-grid">
            {PILLARS.map((p) => (
              <div key={p.num} className={`pillar-card ${p.type}`}>
                <div className="pillar-top-row">
                  <span className="pillar-num">{p.num}</span>
                  <span className="pillar-icon">{p.icon}</span>
                </div>
                <h3 className="pillar-heading">{p.heading}</h3>
                <p className="pillar-desc">{p.desc}</p>
                <div className="pillar-tag">{p.tag}</div>
              </div>
            ))}
          </div>

          <div className="concept-interactive-dock">
            <div className="dock-stat">
              <span className="dock-label">PITCH DURATION</span>
              <span className="dock-val accent-amber">60 SECONDS</span>
              <span className="dock-sub">1 minute to present your idea</span>
            </div>
            <div className="dock-divider" />
            <div className="dock-stat">
              <span className="dock-label">KEY FOCUS</span>
              <span className="dock-val accent-blue">GAME CONCEPT</span>
              <span className="dock-sub">Originality, rules &amp; story</span>
            </div>
            <div className="dock-divider" />
            <div className="dock-stat">
              <span className="dock-label">AUDIENCE VOTE</span>
              <div className="dock-vote-row">
                <span className="vote-badge vote-yes">WOULD PLAY ▲</span>
                <span className="vote-badge vote-no">WOULDN'T PLAY ▼</span>
              </div>
              <span className="dock-sub">Instant audience decision</span>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 3: Serpentine Single-Page Roadmap */}
      <section className="crt-section" id="stages-page">
        <div className="crt-terminal-box">
          <div className="terminal-header">
            <h2 className="terminal-title">EVENT ROADMAP</h2>
            <span className="terminal-badge">8 SIMPLE STEPS</span>
          </div>

          <div className="serpentine-container">
            <svg className="serpentine-svg" viewBox="0 0 1020 400" fill="none">
              <path
                d={FULL_ROAD_PATH}
                stroke="#ffffff"
                strokeWidth="72"
                strokeLinecap="round"
                fill="none"
              />

              {SERPENTINE_TRACK.map((seg, idx) => (
                <path
                  key={idx}
                  d={seg.path}
                  stroke={seg.color}
                  strokeWidth="64"
                  strokeLinecap={idx === 0 || idx === 8 ? 'round' : 'butt'}
                  fill="none"
                />
              ))}

              <circle cx="10" cy="60" r="16" fill="#080c16" stroke="#ffffff" strokeWidth="4" />
              <circle cx="1010" cy="340" r="16" fill="#080c16" stroke="#ffffff" strokeWidth="4" />

              {SERPENTINE_TRACK.map((seg, idx) => (
                <g key={`txt-${idx}`}>
                  <text x={seg.tx} y={seg.tyTitle} className="serp-title">
                    {seg.title}
                  </text>
                  <text x={seg.tx} y={seg.tyDesc} className="serp-desc">
                    {seg.desc}
                  </text>
                </g>
              ))}

              {SERPENTINE_TRACK.map(
                (seg, idx) =>
                  seg.badge && (
                    <g key={`badge-${idx}`}>
                      <circle
                        cx={seg.badge.x}
                        cy={seg.badge.y}
                        r="22"
                        fill={seg.badge.color}
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <text x={seg.badge.x} y={seg.badge.y} className="serp-badge-num">
                        {seg.badge.num}
                      </text>
                    </g>
                  )
              )}
            </svg>
          </div>
        </div>
      </section>

      {/* PAGE 4: Event Rules */}
      <section className="crt-section" id="rules-page">
        <div className="crt-terminal-box">
          <div className="terminal-header">
            <h2 className="terminal-title">EVENT RULES</h2>
            <span className="terminal-badge">OFFICIAL GUIDELINES</span>
          </div>

          <div className="rules-list">
            {RULES.map((cat) => (
              <div key={cat.num} className="rule-item">
                <div className="rule-header-row">
                  <div className="rule-title-group">
                    <span className="rule-code">{cat.num}.</span>
                    <span className="rule-title">{cat.category}</span>
                  </div>
                  <span className={`rule-tag ${cat.tagClass}`}>{cat.badge}</span>
                </div>
                <ul className="rule-sublist">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="rule-subitem">
                      <span className="rule-submarker">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE 5: Event Coordinators */}
      <section className="crt-section" id="contact-page">
        <div className="crt-terminal-box">
          <div className="terminal-header">
            <h2 className="terminal-title">EVENT COORDINATORS</h2>
            <span className="terminal-badge">CONTACT INFO</span>
          </div>

          <div className="comms-grid">
            <div className="comms-card">
              <span className="comms-channel">SANTHAA KUMAR</span>
              <span className="comms-status">● Lead Coordinator</span>
              <span className="comms-detail">Event planning, schedule, and general queries</span>
              <a href="tel:+919952799159" className="comms-phone-btn">
                <span>📞 +91 9952799159</span>
              </a>
            </div>

            <div className="comms-card">
              <span className="comms-channel">SANJIT SRUJAN G A</span>
              <span className="comms-status">● Event Coordinator</span>
              <span className="comms-detail">Participant support, registrations &amp; rules</span>
              <a href="tel:+918838053657" className="comms-phone-btn">
                <span>📞 +91 8838053657</span>
              </a>
            </div>

            <div className="comms-card">
              <span className="comms-channel">PRITHIK</span>
              <span className="comms-status">● Event Coordinator</span>
              <span className="comms-detail">Presentation timing, venue and submissions</span>
              <a href="tel:+916369402201" className="comms-phone-btn">
                <span>📞 +91 6369402201</span>
              </a>
            </div>
          </div>

          <div className="comms-prompt">
            <span>Have any questions or need help? Tap any coordinator number above to call directly.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
