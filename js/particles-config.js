// ==========================================
// Particles Configuration
// Setup for tsParticles effects
// ==========================================

const ParticlesConfig = {
  initialized: false,

  // Initialize particles
  async init() {
    if (this.initialized) return;

    // Wait for tsParticles to load
    if (typeof tsParticles === "undefined") {
      console.warn("tsParticles not loaded yet");
      setTimeout(() => this.init(), 500);
      return;
    }

    this.initialized = true;
    await this.initHeroParticles();
  },

  // Initialize hero section particles
  async initHeroParticles() {
    const isMobile = window.innerWidth < 768;

    await tsParticles.load("particles-hero", {
      fullScreen: {
        enable: false,
      },
      particles: {
        number: {
          value: isMobile ? 30 : 60,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: ["#FFB6C1", "#FFC0CB", "#E6E6FA", "#FFDAB9"],
        },
        shape: {
          type: ["circle", "heart", "star"],
          options: {
            heart: {
              particles: {
                size: {
                  value: 12,
                },
              },
            },
          },
        },
        opacity: {
          value: 0.6,
          random: true,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.3,
            sync: false,
          },
        },
        size: {
          value: { min: 3, max: isMobile ? 6 : 10 },
          random: true,
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 3,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: 1,
          direction: "top",
          random: true,
          straight: false,
          outModes: {
            default: "out",
            bottom: "out",
            left: "out",
            right: "out",
            top: "out",
          },
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
        links: {
          enable: false,
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: {
            enable: !isMobile,
            mode: "bubble",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 200,
            size: 15,
            duration: 2,
            opacity: 0.8,
          },
          push: {
            quantity: 4,
          },
        },
      },
      detectRetina: true,
      background: {
        color: "transparent",
      },
    });
  },

  // Create burst effect at position
  createBurst(x, y, container = document.body) {
    const particles = ["💕", "💖", "💗", "💓", "💝", "✨", "⭐", "🌟", "💫"];
    const count = 15;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "particle-burst";
      particle.textContent =
        particles[Math.floor(Math.random() * particles.length)];

      const angle = (Math.PI * 2 * i) / count;
      const velocity = 100 + Math.random() * 100;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: ${16 + Math.random() * 16}px;
                pointer-events: none;
                z-index: 10000;
                --tx: ${tx}px;
                --ty: ${ty}px;
            `;

      container.appendChild(particle);

      // Animate
      particle.style.animation = "particleFade 1.5s ease-out forwards";

      // Remove after animation
      setTimeout(() => particle.remove(), 1500);
    }
  },

  // Create floating hearts
  createFloatingHearts(count = 10) {
    const hearts = ["💕", "💖", "💗", "💓", "💝"];

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement("div");
        heart.className = "floating-heart";
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.cssText = `
                    position: fixed;
                    bottom: -50px;
                    left: ${Math.random() * 100}%;
                    font-size: ${20 + Math.random() * 20}px;
                    pointer-events: none;
                    z-index: 999;
                    animation: floatUp ${5 + Math.random() * 3}s ease-in forwards;
                    opacity: ${0.6 + Math.random() * 0.4};
                `;

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 8000);
      }, i * 200);
    }
  },

  // Create sparkle trail for custom cursor
  createCursorTrail(x, y) {
    const sparkles = ["✨", "💫", "⭐"];
    const sparkle = document.createElement("div");
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.className = "cursor-sparkle";

    sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 12px;
            pointer-events: none;
            z-index: 9998;
            animation: sparkle 0.6s ease-out forwards;
        `;

    document.getElementById("cursor-trail").appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 600);
  },

  // Update particles based on time of day
  updateTimeBasedColors() {
    const hour = new Date().getHours();
    let colors;

    if (hour >= 6 && hour < 12) {
      // Morning: Soft pink and yellow
      colors = ["#FFB6C1", "#FFC0CB", "#FFDAB9", "#FFFACD"];
    } else if (hour >= 12 && hour < 18) {
      // Afternoon: Bright pinks and corals
      colors = ["#FFB6C1", "#FF7F7F", "#FFC0CB", "#FFDAB9"];
    } else if (hour >= 18 && hour < 22) {
      // Evening: Deep pink and purple
      colors = ["#B76E79", "#E6E6FA", "#DDA0DD", "#FFB6C1"];
    } else {
      // Night: Deep purple and blue
      colors = ["#E6E6FA", "#DDA0DD", "#B0C4DE", "#FFB6C1"];
    }

    return colors;
  },
};

// Add floating animation keyframe dynamically
const particleAnimationStyle = document.createElement("style");
particleAnimationStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleAnimationStyle);

// Initialize when DOM and tsParticles are ready
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    setTimeout(() => ParticlesConfig.init(), 100);
  });
}
