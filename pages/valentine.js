import { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import { gsap } from "gsap";

const noResponses = [
  "Are you sure? 🥺",
  "Really really sure??",
  "You're breaking my heart...",
  "I'll cry... just so you know 😢",
  "What if I said pretty please?",
  "But I already made reservations... 🍽️",
  "My mom said you'd say yes...",
  "I'm not giving up that easily 💪",
  "Okay fine... just kidding, try again!",
  "The YES button is RIGHT there 👉",
  "You're really gonna do this to me?",
  "I promise I'll share my naan 🫓",
  "Think of the tikka masala...",
  "Last chance... or not, I'll keep asking 😏",
  "You know you want to say yes...",
];

function FloatingHeart({ style }) {
  return (
    <div className="floating-heart" style={style}>
      ❤️
    </div>
  );
}

function Confetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = [
      "#ff6b6b",
      "#ee5a24",
      "#f8b500",
      "#ff6348",
      "#ff4757",
      "#ff69b4",
      "#c44569",
      "#e84393",
      "#fd79a8",
      "#fab1a0",
    ];
    const newPieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function Valentine() {
  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const titleRef = useRef();
  const subtitleRef = useRef();
  const buttonsRef = useRef();
  const revealRef = useRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!mounted) return;
    const tl = gsap.timeline();
    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
      });
    }
    if (subtitleRef.current) {
      tl.from(
        subtitleRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }
    if (buttonsRef.current) {
      tl.from(
        buttonsRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );
    }
  }, [mounted]);

  // Reveal animation
  useEffect(() => {
    if (accepted && revealRef.current) {
      gsap.from(revealRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
    }
  }, [accepted]);

  // Spawn floating hearts periodically
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setHearts((prev) => {
        const now = Date.now();
        const filtered = prev.filter((h) => now - h.created < 6000);
        return [
          ...filtered,
          {
            id: now,
            created: now,
            left: Math.random() * 90 + 5,
            size: 14 + Math.random() * 20,
            duration: 4 + Math.random() * 3,
            delay: 0,
          },
        ];
      });
    }, 800);
    return () => clearInterval(interval);
  }, [mounted]);

  const yesScale = 1 + noCount * 0.2;
  const yesPadding = 16 + noCount * 4;

  const handleNo = useCallback(() => {
    setNoCount((prev) => prev + 1);

    // Shake animation on the no button
    const noBtn = document.getElementById("no-btn");
    if (noBtn) {
      gsap.fromTo(
        noBtn,
        { x: -5 },
        { x: 5, duration: 0.05, repeat: 5, yoyo: true, ease: "power1.inOut" }
      );
    }

    // Pulse the yes button
    const yesBtn = document.getElementById("yes-btn");
    if (yesBtn) {
      gsap.fromTo(
        yesBtn,
        { scale: yesScale },
        {
          scale: yesScale * 1.15,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        }
      );
    }
  }, [noCount, yesScale]);

  const handleYes = useCallback(() => {
    setAccepted(true);
    // Burst of hearts
    const burst = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      created: Date.now(),
      left: 30 + Math.random() * 40,
      size: 18 + Math.random() * 24,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 0.5,
    }));
    setHearts((prev) => [...prev, ...burst]);
  }, []);

  const currentMessage =
    noCount === 0
      ? "Will you be my Valentine? 💕"
      : noResponses[(noCount - 1) % noResponses.length];

  if (!mounted) return null;

  return (
    <div className="valentine-page">
      <Head>
        <title>Will You Be My Valentine? 💕</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Floating hearts background */}
      {hearts.map((heart) => (
        <FloatingHeart
          key={heart.id}
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        />
      ))}

      {!accepted ? (
        <div className="valentine-content">
          <div ref={titleRef} className="valentine-emoji">
            {noCount >= 5 ? "🥺" : noCount >= 3 ? "😢" : "💌"}
          </div>
          <h1 ref={subtitleRef} className="valentine-title">
            {currentMessage}
          </h1>
          <div ref={buttonsRef} className="valentine-buttons">
            <button
              id="yes-btn"
              className="yes-btn"
              onClick={handleYes}
              style={{
                transform: `scale(${yesScale})`,
                padding: `${yesPadding}px ${yesPadding * 2}px`,
              }}
            >
              YES! 💖
            </button>
            <button id="no-btn" className="no-btn" onClick={handleNo}>
              {noCount === 0 ? "No..." : "Still no..."}
            </button>
          </div>
          {noCount > 0 && (
            <p className="valentine-hint">
              {noCount >= 10
                ? "You've said no " + noCount + " times... I admire your dedication 😂"
                : noCount >= 5
                ? "The yes button is looking pretty good right about now..."
                : "Psst... the right answer is YES"}
            </p>
          )}
        </div>
      ) : (
        <div className="valentine-content">
          <Confetti />
          <div ref={revealRef} className="reveal-container">
            <div className="reveal-emoji">🎉💕🎉</div>
            <h1 className="reveal-title">I knew you&apos;d say yes!</h1>
            <div className="reveal-card">
              <h2 className="reveal-heading">Our Valentine&apos;s Date</h2>
              <div className="reveal-details">
                <div className="reveal-item">
                  <span className="reveal-icon">📅</span>
                  <div>
                    <p className="reveal-label">When</p>
                    <p className="reveal-value">Saturday, Feb. 14th at 5:45 PM</p>
                  </div>
                </div>
                <div className="reveal-item">
                  <span className="reveal-icon">📍</span>
                  <div>
                    <p className="reveal-label">Where</p>
                    <p className="reveal-value">East Village</p>
                  </div>
                </div>
                <div className="reveal-item">
                  <span className="reveal-icon">🍛</span>
                  <div>
                    <p className="reveal-label">What</p>
                    <p className="reveal-value">Indian Food!</p>
                  </div>
                </div>
              </div>
              <p className="reveal-footer">
                Can&apos;t wait to spend it with you 💕
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .valentine-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%);
          overflow: hidden;
          position: relative;
          font-family: "Hind", sans-serif;
        }

        .valentine-content {
          text-align: center;
          z-index: 10;
          padding: 20px;
          max-width: 600px;
          width: 100%;
        }

        .valentine-emoji {
          font-size: 80px;
          margin-bottom: 16px;
          animation: pulse 2s ease-in-out infinite;
          position: relative;
          z-index: 20;
        }

        .valentine-title {
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 700;
          color: #c0392b;
          margin-bottom: 40px;
          line-height: 1.3;
          text-shadow: 0 2px 10px rgba(192, 57, 43, 0.15);
          position: relative;
          z-index: 20;
        }

        .valentine-buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          position: relative;
          z-index: 5;
        }

        .yes-btn {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: clamp(1rem, 3vw, 1.4rem);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 6px 30px rgba(231, 76, 60, 0.4);
          font-family: "Hind", sans-serif;
          white-space: nowrap;
        }

        .yes-btn:hover {
          box-shadow: 0 8px 40px rgba(231, 76, 60, 0.6);
          filter: brightness(1.1);
        }

        .no-btn {
          background: white;
          color: #999;
          border: 2px solid #ddd;
          border-radius: 12px;
          padding: 12px 28px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: "Hind", sans-serif;
          white-space: nowrap;
        }

        .no-btn:hover {
          border-color: #bbb;
          color: #777;
        }

        .valentine-hint {
          margin-top: 30px;
          color: #e17055;
          font-size: 0.95rem;
          font-style: italic;
          animation: fadeInUp 0.5s ease-out;
          position: relative;
          z-index: 20;
        }

        /* Floating Hearts */
        .floating-heart {
          position: fixed;
          bottom: -40px;
          animation: floatUp linear forwards;
          pointer-events: none;
          z-index: 5;
          opacity: 0.7;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.7;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Reveal / Accepted State */
        .reveal-container {
          animation: fadeInUp 0.5s ease-out;
        }

        .reveal-emoji {
          font-size: 64px;
          margin-bottom: 12px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .reveal-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700;
          color: #c0392b;
          margin-bottom: 32px;
          text-shadow: 0 2px 10px rgba(192, 57, 43, 0.15);
        }

        .reveal-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 36px 32px;
          box-shadow: 0 20px 60px rgba(192, 57, 43, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }

        .reveal-heading {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3436;
          margin-bottom: 28px;
          letter-spacing: 0.5px;
        }

        .reveal-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 28px;
        }

        .reveal-item {
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
          padding: 12px 16px;
          background: rgba(255, 107, 107, 0.08);
          border-radius: 14px;
          transition: transform 0.2s ease;
        }

        .reveal-item:hover {
          transform: translateX(4px);
        }

        .reveal-icon {
          font-size: 32px;
          flex-shrink: 0;
        }

        .reveal-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #b2bec3;
          margin: 0 0 2px 0;
          font-weight: 600;
        }

        .reveal-value {
          font-size: 1.15rem;
          font-weight: 600;
          color: #2d3436;
          margin: 0;
        }

        .reveal-footer {
          color: #e17055;
          font-size: 1.1rem;
          font-weight: 500;
          font-style: italic;
          margin: 0;
        }

        /* Confetti */
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 50;
          overflow: hidden;
        }

        .confetti-piece {
          position: absolute;
          top: -20px;
          border-radius: 2px;
          animation: confettiFall linear forwards;
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
