/**
 * GEMINI GAMEVERSE — CRT MULTI-PAGE REACT ENGINE
 * Jersey 10 Typography | Concept Summary & Serpentine Single-Page Roadmap
 * Page 1: Scroll Frame Scrub | Page 2: Competition Summary | Page 3: Single-Page Roadmap | Page 4: Rules | Page 5: Comms
 */

(function () {
  'use strict';

  const { useState, useEffect, useRef, useCallback } = React;

  const TOTAL_FRAMES = 165;
  const FRAME_DIR = 'frames_optimized';
  const FRAME_PREFIX = 'frame_';
  const FRAME_EXT = '.webp';
  const REGISTER_URL = 'https://forms.gle/qoKKkdprx7mh9sQh6';

  const PILLARS = [
    {
      num: '01',
      heading: 'SPARK THE VISION',
      icon: '⚡',
      type: 'p-spark',
      desc: 'Craft your game title, tagline, universe mission, core loop, and enemy factions. Build the comprehensive game blueprint using Gemini Chat.',
      tag: 'POWERED BY GEMINI'
    },
    {
      num: '02',
      heading: 'FORGE THE REALM',
      icon: '🎨',
      type: 'p-realm',
      desc: 'Generate an awe-inspiring poster using Nano Banana. Showcase environments, boss battles, and action sequences with zero text or logos.',
      tag: 'NANO BANANA ENGINE'
    },
    {
      num: '03',
      heading: '60-SECOND PITCH',
      icon: '⏱️',
      type: 'p-pitch',
      desc: 'Step into the arena spotlight. Deliver a 60-second high-octane elevator pitch that sells your game\'s unique mechanic and emotional hook.',
      tag: 'LIVE ARENA STAGE'
    },
    {
      num: '04',
      heading: 'AUDIENCE VERDICT',
      icon: '⚔️',
      type: 'p-verdict',
      desc: 'The audience decides your fate. Live crowd voting across two high-stakes binary choices: WOULD PLAY vs WOULDN\'T PLAY.',
      tag: 'LIVE CROWD VOTE'
    }
  ];

  const SERPENTINE_TRACK = [
    // Row 1: Left to Right
    {
      path: 'M 40 60 L 300 60',
      color: '#eab308',
      title: '01 REGISTER',
      desc: 'Pre-survey & form',
      tx: 165,
      tyTitle: 51,
      tyDesc: 71,
      badge: { num: '01', x: 300, y: 60, color: '#eab308' }
    },
    {
      path: 'M 300 60 L 570 60',
      color: '#16a34a',
      title: '02 EXPLORE',
      desc: 'Google Play Arena',
      tx: 435,
      tyTitle: 51,
      tyDesc: 71,
      badge: { num: '02', x: 570, y: 60, color: '#16a34a' }
    },
    {
      path: 'M 570 60 L 850 60 A 70 70 0 0 1 920 130',
      color: '#06b6d4',
      title: '03 CREATE',
      desc: 'Build with Gemini',
      tx: 710,
      tyTitle: 51,
      tyDesc: 71,
      badge: { num: '03', x: 920, y: 130, color: '#06b6d4' }
    },

    // Row 2: Right to Left
    {
      path: 'M 920 130 A 70 70 0 0 1 850 200 L 610 200',
      color: '#0284c7',
      title: '04 DOCUMENT',
      desc: 'Google Docs',
      tx: 735,
      tyTitle: 191,
      tyDesc: 211,
      badge: { num: '04', x: 610, y: 200, color: '#0284c7' }
    },
    {
      path: 'M 610 200 L 370 200',
      color: '#2563eb',
      title: '05 DESIGN',
      desc: 'Nano Banana poster',
      tx: 490,
      tyTitle: 191,
      tyDesc: 211,
      badge: { num: '05', x: 370, y: 200, color: '#2563eb' }
    },
    {
      path: 'M 370 200 L 170 200 A 70 70 0 0 0 100 270',
      color: '#7c3aed',
      title: '06 PITCH',
      desc: '60-second pitch',
      tx: 265,
      tyTitle: 191,
      tyDesc: 211,
      badge: { num: '06', x: 100, y: 270, color: '#7c3aed' }
    },

    // Row 3: Left to Right
    {
      path: 'M 100 270 A 70 70 0 0 0 170 340 L 440 340',
      color: '#c026d3',
      title: '07 VOTE',
      desc: "Would Play / Wouldn't",
      tx: 295,
      tyTitle: 331,
      tyDesc: 351,
      badge: { num: '07', x: 440, y: 340, color: '#c026d3' }
    },
    {
      path: 'M 440 340 L 710 340',
      color: '#e11d48',
      title: '08 COMPLETE',
      desc: 'Submit feedback',
      tx: 575,
      tyTitle: 331,
      tyDesc: 351,
      badge: { num: '08', x: 710, y: 340, color: '#e11d48' }
    },
    {
      path: 'M 710 340 L 980 340',
      color: '#f59e0b',
      title: 'VICTORY ARENA',
      desc: 'Mission Complete',
      tx: 845,
      tyTitle: 331,
      tyDesc: 351,
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
      badge: 'CORE SPECS',
      tagClass: 'rtag-cyan',
      items: [
        'Create an original game concept.',
        'Every game must contain: Game Name, Tagline, Mission, One Goal, One Enemy, One Deadline, Characters, and Game Mode (Solo / Duo / Squad / 5V5).'
      ]
    },
    {
      num: '03',
      category: 'AI TOOLS USAGE',
      badge: 'OFFICIAL SUITE',
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
      badge: 'STRICT POLICY',
      tagClass: 'rtag-red',
      items: [
        'Must show characters, setting, enemies and action scenes.',
        'No text, game name or tagline on the poster.',
        'Must be original, creative and visually appealing.'
      ]
    },
    {
      num: '05',
      category: 'SAFETY & CONTENT RULES',
      badge: 'ZERO TOLERANCE',
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
      badge: 'REQUIRED TRIFECTA',
      tagClass: 'rtag-amber',
      items: [
        'Gemini Chat conversation link.',
        'Google Docs concept link.',
        'Nano Banana generated poster.',
        'Ensure all links are accessible to organizers.'
      ]
    },
    {
      num: '07',
      category: 'PRESENTATION RULES',
      badge: '60 SECONDS',
      tagClass: 'rtag-amber',
      items: [
        'Each participant gets 60 seconds to pitch.',
        'Explain your game concept clearly.',
        'Showcase your poster.',
        'Stay within the allocated time.'
      ]
    },
    {
      num: '08',
      category: 'VOTING & EVALUATION',
      badge: 'LIVE CONSENSUS',
      tagClass: 'rtag-cyan',
      items: [
        "Audience voting: WOULD PLAY / WOULDN'T PLAY.",
        'Originality and creativity matter.',
        "Follow the organizers' evaluation instructions.",
        "Do not manipulate voting or copy other participants' ideas."
      ]
    }
  ];

  function getFramePath(index) {
    const padded = String(index).padStart(3, '0');
    return `${FRAME_DIR}/${FRAME_PREFIX}${padded}${FRAME_EXT}`;
  }

  function GameverseApp() {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);

    const currentFrameRef = useRef(0);
    const targetFrameRef = useRef(0);
    const rafIdRef = useRef(null);
    const lastDrawnFrameRef = useRef(-1);

    // Draw frame to canvas with aspect ratio cover
    const drawFrame = useCallback((frameIndex) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, []);

    // Sizing and DPR scaling
    const handleResize = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d', { alpha: false });
      ctx.scale(dpr, dpr);

      drawFrame(Math.round(currentFrameRef.current));
    }, [drawFrame]);

    // Preload all 165 frames
    useEffect(() => {
      const imageList = [];

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);

        img.onload = () => {
          if (i === 0) {
            handleResize();
            drawFrame(0);
          }
        };

        img.onerror = () => {
          img.src = `gemini_generated_video_2351dd9e_mp4_enhancer__frames/frame_${String(i + 1).padStart(3, '0')}.png`;
        };

        imageList.push(img);
      }

      imagesRef.current = imageList;
      handleResize();

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [handleResize, drawFrame]);

    // Scroll scrubbing on Page 1; unlocks downward scroll when frames complete
    useEffect(() => {
      const WHEEL_SENSITIVITY = 0.12;
      const TOUCH_SENSITIVITY = 0.25;
      let touchStartY = 0;

      const handleWheel = (e) => {
        const scrollY = window.scrollY;

        // Scrolling down
        if (e.deltaY > 0) {
          if (targetFrameRef.current < TOTAL_FRAMES - 1) {
            e.preventDefault();
            targetFrameRef.current = Math.min(
              TOTAL_FRAMES - 1,
              targetFrameRef.current + e.deltaY * WHEEL_SENSITIVITY
            );
          }
        }
        // Scrolling up
        else if (e.deltaY < 0) {
          if (scrollY <= 5 && targetFrameRef.current > 0) {
            e.preventDefault();
            targetFrameRef.current = Math.max(
              0,
              targetFrameRef.current + e.deltaY * WHEEL_SENSITIVITY
            );
          }
        }
      };

      const handleTouchStart = (e) => {
        touchStartY = e.touches[0].clientY;
      };

      const handleTouchMove = (e) => {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        touchStartY = touchY;
        const scrollY = window.scrollY;

        if (deltaY > 0) {
          if (targetFrameRef.current < TOTAL_FRAMES - 1) {
            if (e.cancelable) e.preventDefault();
            targetFrameRef.current = Math.min(
              TOTAL_FRAMES - 1,
              targetFrameRef.current + deltaY * TOUCH_SENSITIVITY
            );
          }
        } else if (deltaY < 0) {
          if (scrollY <= 5 && targetFrameRef.current > 0) {
            if (e.cancelable) e.preventDefault();
            targetFrameRef.current = Math.max(
              0,
              targetFrameRef.current + deltaY * TOUCH_SENSITIVITY
            );
          }
        }
      };

      const handleKeyDown = (e) => {
        const scrollY = window.scrollY;
        if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
          if (targetFrameRef.current < TOTAL_FRAMES - 1) {
            e.preventDefault();
            targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, targetFrameRef.current + 5);
          }
        } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
          if (scrollY <= 5 && targetFrameRef.current > 0) {
            e.preventDefault();
            targetFrameRef.current = Math.max(0, targetFrameRef.current - 5);
          }
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('keydown', handleKeyDown, { passive: false });

      return () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    // Lerp render tick
    useEffect(() => {
      const tick = () => {
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.001) {
          currentFrameRef.current += diff * 0.16;
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }

        const frameToDraw = Math.round(currentFrameRef.current);
        if (frameToDraw !== lastDrawnFrameRef.current) {
          drawFrame(frameToDraw);
          lastDrawnFrameRef.current = frameToDraw;
        }

        rafIdRef.current = requestAnimationFrame(tick);
      };

      rafIdRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      };
    }, [drawFrame]);

    return React.createElement(
      'div',
      { className: 'app-root' },

      // Top HUD (Clean, zero cyber lines on page 1)
      React.createElement(
        'header',
        { className: 'top-hud' },
        React.createElement(
          'div',
          { className: 'brand-label' },
          React.createElement('span', { className: 'brand-dot' }),
          React.createElement('span', null, 'GEMINI GAMEVERSE')
        ),
        React.createElement(
          'a',
          {
            href: REGISTER_URL,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'register-btn'
          },
          React.createElement('span', null, 'REGISTER'),
          React.createElement('span', null, '>>')
        )
      ),

      // PAGE 1: Interactive Pinned Scroll Frame
      React.createElement(
        'section',
        { className: 'frame-section' },
        React.createElement('canvas', {
          ref: canvasRef,
          className: 'frame-canvas'
        })
      ),

      // PAGE 2: Creative Animated Competition Summary
      React.createElement(
        'section',
        { className: 'crt-section', id: 'concept-page' },
        React.createElement(
          'div',
          { className: 'concept-wrapper' },
          // Hero Summary Banner
          React.createElement(
            'div',
            { className: 'concept-hero' },
            React.createElement(
              'div',
              { className: 'concept-pill' },
              'COMPETITION BRIEF // GAMEVERSE PITCH BATTLE'
            ),
            React.createElement(
              'h2',
              { className: 'concept-title' },
              'CONCEIVE A REALM. PITCH THE GAME. CONQUER THE ARENA.'
            ),
            React.createElement(
              'p',
              { className: 'concept-tagline' },
              'Step into the creator arena! Leverage Google Gemini to forge a complete game universe, sculpt its visual identity with Nano Banana, and deliver a high-octane 60-second pitch to a live audience.'
            )
          ),

          // 4 Core Pillars Grid
          React.createElement(
            'div',
            { className: 'concept-pillars-grid' },
            PILLARS.map((p) =>
              React.createElement(
                'div',
                { key: p.num, className: `pillar-card ${p.type}` },
                React.createElement(
                  'div',
                  { className: 'pillar-top-row' },
                  React.createElement('span', { className: 'pillar-num' }, p.num),
                  React.createElement('span', { className: 'pillar-icon' }, p.icon)
                ),
                React.createElement('h3', { className: 'pillar-heading' }, p.heading),
                React.createElement('p', { className: 'pillar-desc' }, p.desc),
                React.createElement('div', { className: 'pillar-tag' }, p.tag)
              )
            )
          ),

          // Live Interactive Simulation Dock
          React.createElement(
            'div',
            { className: 'concept-interactive-dock' },
            React.createElement(
              'div',
              { className: 'dock-stat' },
              React.createElement('span', { className: 'dock-label' }, 'STAGE CLOCK'),
              React.createElement('span', { className: 'dock-val glow-amber' }, '00:60'),
              React.createElement('span', { className: 'dock-sub' }, 'ONE CHANCE TO CONVINCE')
            ),
            React.createElement('div', { className: 'dock-divider' }),
            React.createElement(
              'div',
              { className: 'dock-stat' },
              React.createElement('span', { className: 'dock-label' }, 'THE CRITERION'),
              React.createElement('span', { className: 'dock-val glow-cyan' }, 'GAMEPLAY HOOK'),
              React.createElement('span', { className: 'dock-sub' }, 'INNOVATION & STORY')
            ),
            React.createElement('div', { className: 'dock-divider' }),
            React.createElement(
              'div',
              { className: 'dock-stat' },
              React.createElement('span', { className: 'dock-label' }, 'AUDIENCE DECISION'),
              React.createElement(
                'div',
                { className: 'dock-vote-row' },
                React.createElement('span', { className: 'vote-badge vote-yes' }, 'WOULD PLAY ▲'),
                React.createElement('span', { className: 'vote-badge vote-no' }, "WOULDN'T PLAY ▼")
              ),
              React.createElement('span', { className: 'dock-sub' }, 'INSTANT CROWD CONSENSUS')
            )
          )
        )
      ),

      // PAGE 3: Serpentine Single-Page Roadmap
      React.createElement(
        'section',
        { className: 'crt-section', id: 'stages-page' },
        React.createElement(
          'div',
          { className: 'crt-terminal-box' },
          React.createElement(
            'div',
            { className: 'terminal-header' },
            React.createElement('h2', { className: 'terminal-title' }, 'MISSION ROADMAP // 8 STAGES'),
            React.createElement('span', { className: 'terminal-badge' }, 'SERPENTINE PIPELINE')
          ),
          React.createElement(
            'div',
            { className: 'serpentine-container' },
            React.createElement(
              'svg',
              { className: 'serpentine-svg', viewBox: '0 0 1020 400', fill: 'none' },
              React.createElement(
                'defs',
                null,
                React.createElement(
                  'filter',
                  { id: 'trackShadow', x: '-5%', y: '-5%', width: '110%', height: '115%' },
                  React.createElement('feDropShadow', {
                    dx: '0',
                    dy: '8',
                    stdDeviation: '6',
                    floodColor: '#000000',
                    floodOpacity: '0.65'
                  })
                )
              ),

              // White outer contour border with drop shadow
              React.createElement('path', {
                d: FULL_ROAD_PATH,
                stroke: '#ffffff',
                strokeWidth: '74',
                strokeLinecap: 'round',
                fill: 'none',
                filter: 'url(#trackShadow)'
              }),

              // Colored Segments
              SERPENTINE_TRACK.map((seg, idx) =>
                React.createElement('path', {
                  key: idx,
                  d: seg.path,
                  stroke: seg.color,
                  strokeWidth: '64',
                  strokeLinecap: idx === 0 || idx === 8 ? 'round' : 'butt',
                  fill: 'none'
                })
              ),

              // End Notches
              React.createElement('circle', {
                cx: '10',
                cy: '60',
                r: '16',
                fill: '#050d1a',
                stroke: '#ffffff',
                strokeWidth: '4'
              }),
              React.createElement('circle', {
                cx: '1010',
                cy: '340',
                r: '16',
                fill: '#050d1a',
                stroke: '#ffffff',
                strokeWidth: '4'
              }),

              // Text Titles & Descriptions
              SERPENTINE_TRACK.map((seg, idx) =>
                React.createElement(
                  'g',
                  { key: `txt-${idx}` },
                  React.createElement(
                    'text',
                    { x: seg.tx, y: seg.tyTitle, className: 'serp-title' },
                    seg.title
                  ),
                  React.createElement(
                    'text',
                    { x: seg.tx, y: seg.tyDesc, className: 'serp-desc' },
                    seg.desc
                  )
                )
              ),

              // Circular Milestone Badges
              SERPENTINE_TRACK.map(
                (seg, idx) =>
                  seg.badge &&
                  React.createElement(
                    'g',
                    { key: `badge-${idx}` },
                    React.createElement('circle', {
                      cx: seg.badge.x,
                      cy: seg.badge.y,
                      r: '23',
                      fill: seg.badge.color,
                      stroke: '#ffffff',
                      strokeWidth: '4',
                      filter: 'url(#trackShadow)'
                    }),
                    React.createElement(
                      'text',
                      { x: seg.badge.x, y: seg.badge.y, className: 'serp-badge-num' },
                      seg.badge.num
                    )
                  )
              )
            )
          )
        )
      ),

      // PAGE 4: System Directives (Categorized Rules)
      React.createElement(
        'section',
        { className: 'crt-section', id: 'rules-page' },
        React.createElement(
          'div',
          { className: 'crt-terminal-box' },
          React.createElement(
            'div',
            { className: 'terminal-header' },
            React.createElement('h2', { className: 'terminal-title' }, 'SYSTEM DIRECTIVES // RULES'),
            React.createElement('span', { className: 'terminal-badge' }, '8 CORE DIRECTIVES')
          ),
          React.createElement(
            'div',
            { className: 'rules-list' },
            RULES.map((cat) =>
              React.createElement(
                'div',
                { key: cat.num, className: 'rule-item' },
                React.createElement(
                  'div',
                  { className: 'rule-header-row' },
                  React.createElement(
                    'div',
                    { className: 'rule-title-group' },
                    React.createElement('span', { className: 'rule-code' }, `${cat.num} //`),
                    React.createElement('span', { className: 'rule-title' }, cat.category)
                  ),
                  React.createElement(
                    'span',
                    { className: `rule-tag ${cat.tagClass}` },
                    cat.badge
                  )
                ),
                React.createElement(
                  'ul',
                  { className: 'rule-sublist' },
                  cat.items.map((item, idx) =>
                    React.createElement(
                      'li',
                      { key: idx, className: 'rule-subitem' },
                      React.createElement('span', { className: 'rule-submarker' }, '►'),
                      React.createElement('span', null, item)
                    )
                  )
                )
              )
            )
          )
        )
      ),

      // PAGE 5: Transmission Comms / Coordinator Contact Info
      React.createElement(
        'section',
        { className: 'crt-section', id: 'contact-page' },
        React.createElement(
          'div',
          { className: 'crt-terminal-box' },
          React.createElement(
            'div',
            { className: 'terminal-header' },
            React.createElement('h2', { className: 'terminal-title' }, 'TRANSMISSION COMMS // COORDINATORS'),
            React.createElement('span', { className: 'terminal-badge' }, 'LIVE UPLINK ACTIVE')
          ),
          React.createElement(
            'div',
            { className: 'comms-grid' },
            React.createElement(
              'div',
              { className: 'comms-card' },
              React.createElement('span', { className: 'comms-channel' }, 'COMM 01 // SANTHAA KUMAR P'),
              React.createElement('span', { className: 'comms-status' }, '● STATUS: ONLINE // VOICE RELAY'),
              React.createElement('span', { className: 'comms-detail' }, 'Event Lead Coordinator & Direct Support'),
              React.createElement(
                'a',
                { href: 'tel:+919952799159', className: 'comms-phone-btn' },
                React.createElement('span', null, '📞 +91 9952799159')
              )
            ),
            React.createElement(
              'div',
              { className: 'comms-card' },
              React.createElement('span', { className: 'comms-channel' }, 'COMM 02 // SANJIT SRUJAN G A'),
              React.createElement('span', { className: 'comms-status' }, '● STATUS: ONLINE // MATRIX CONTROL'),
              React.createElement('span', { className: 'comms-detail' }, 'Event Coordinator & Arena Host'),
              React.createElement(
                'a',
                { href: 'tel:+918838053657', className: 'comms-phone-btn' },
                React.createElement('span', null, '📞 +91 8838053657')
              )
            ),
            React.createElement(
              'div',
              { className: 'comms-card' },
              React.createElement('span', { className: 'comms-channel' }, 'COMM 03 // PRITHIK ASWIN S'),
              React.createElement('span', { className: 'comms-status' }, '● STATUS: ONLINE // ARENA DISPATCH'),
              React.createElement('span', { className: 'comms-detail' }, 'Event Coordinator & Participant Support'),
              React.createElement(
                'a',
                { href: 'tel:+916369402201', className: 'comms-phone-btn' },
                React.createElement('span', null, '📞 +91 6369402201')
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'comms-prompt' },
            React.createElement('span', null, '> COORDINATOR CHANNELS ONLINE // TAP ANY FREQUENCY TO CALL DIRECTLY'),
            React.createElement('span', { className: 'cursor-blink' })
          )
        )
      )
    );
  }

  // Mount React
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(GameverseApp));
  }
})();
