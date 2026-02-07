// ==========================================
// Main Application Controller
// Handles initialization and global features
// ==========================================

const App = {
  isMobile: false,
  currentSection: "hero",

  // Initialize the app
  init() {
    console.log("🌸 App.init() called!");
    console.log("Document readyState:", document.readyState);

    this.detectDevice();
    this.hideLoadingScreen();
    this.setupCustomCursor();
    this.setupScrollTracking();
    this.setupNavigation();
    this.setupScrollAnimations();
    this.checkForUpdates();

    console.log("🌸 Anniversary App Loaded! 💕");
  },

  // Detect if mobile device
  detectDevice() {
    this.isMobile =
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
  },

  // Hide loading screen
  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    console.log("hideLoadingScreen called, element found:", !!loadingScreen);

    const hideScreen = () => {
      console.log("Hiding loading screen...");
      setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.classList.add("hidden");
          console.log("Added 'hidden' class to loading screen");
          setTimeout(() => {
            loadingScreen.style.display = "none";
            console.log("Set display:none on loading screen");
          }, 500);
        }
      }, 1000);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      console.log("Page already loaded, hiding screen immediately");
      hideScreen();
    } else {
      console.log("Waiting for page to load...");
      window.addEventListener("load", hideScreen);
    }
  },

  // Setup custom cursor
  setupCustomCursor() {
    if (this.isMobile) return;

    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const speed = 0.15;

    // Track mouse position
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create trail sparkle occasionally
      if (Math.random() < 0.1 && typeof ParticlesConfig !== "undefined") {
        ParticlesConfig.createCursorTrail(e.clientX, e.clientY);
      }
    });

    // Smooth cursor follow animation
    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      cursorX += dx * speed;
      cursorY += dy * speed;

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";

      requestAnimationFrame(animate);
    };

    animate();

    // Change cursor on interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .reason-card, .dot",
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(1.5)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
      });
    });
  },

  // Setup scroll tracking
  setupScrollTracking() {
    const sections = ["reasons", "secrets", "letter"];
    const dots = document.querySelectorAll(".dot");

    const observerOptions = {
      threshold: 0.5,
      rootMargin: "-10% 0px -10% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.currentSection = sectionId;

          // Update dots
          dots.forEach((dot) => {
            const dotSection = dot.dataset.section;
            dot.classList.toggle("active", dotSection === sectionId);
          });
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    // Dot click navigation
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const sectionId = dot.dataset.section;
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  },

  // Setup navigation
  setupNavigation() {
    // Heart button - scroll to top
    const navHeart = document.querySelector(".nav-heart");
    if (navHeart) {
      navHeart.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  },

  // Setup scroll animations
  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      ".scroll-fade-in, .scroll-scale-in",
    );

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => observer.observe(el));
  },

  // Show welcome message for first-time visitors
  showWelcomeMessage() {
    if (StorageManager.isFirstVisit()) {
      setTimeout(() => {
        const message = document.createElement("div");
        message.className = "welcome-message";
        message.innerHTML = `
                    <h3>Welcome, Lucija! 💕</h3>
                    <p>This is a special gift made just for you.</p>
                    <p>Explore and discover all the love hidden within!</p>
                `;
        message.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(255, 255, 255, 0.98);
                    padding: 2rem;
                    border-radius: 20px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                    z-index: 10001;
                    text-align: center;
                    animation: fadeInScale 0.8s ease-out;
                    max-width: 90%;
                `;

        message.querySelector("h3").style.cssText = `
                    color: var(--rose-gold);
                    margin-bottom: 1rem;
                    font-family: var(--font-heading);
                `;

        message.querySelectorAll("p").forEach((p) => {
          p.style.cssText = `
                        color: var(--text-dark);
                        margin-bottom: 0.5rem;
                    `;
        });

        document.body.appendChild(message);

        // Remove after 6 seconds
        setTimeout(() => {
          message.style.animation = "fadeOut 0.5s ease-out";
          setTimeout(() => message.remove(), 500);
        }, 6000);
      }, 1500);
    }
  },

  // Check for periodic updates/surprises
  checkForUpdates() {
    const now = new Date();
    const hour = now.getHours();

    // Monthly milestone check
    this.checkMonthlyMilestone();
  },

  // Check monthly milestones
  checkMonthlyMilestone() {
    const now = new Date();
    const anniversary = new Date("2025-02-08");

    const monthsDiff =
      (now.getFullYear() - anniversary.getFullYear()) * 12 +
      (now.getMonth() - anniversary.getMonth());

    // Check if it's exactly a monthly anniversary (8th of month)
    if (now.getDate() === 8 && monthsDiff > 0) {
      this.showMonthlyMilestone(monthsDiff);
    }
  },

  // Show monthly milestone message
  showMonthlyMilestone(months) {
    const message = document.createElement("div");
    message.className = "milestone-message";
    message.innerHTML = `
            <h3>🎉 ${months} Mjesec${months > 1 ? "i" : ""} Zajedno! 🎉</h3>
            <p>Slavim još jedan prekrasan mjesec s tobom!</p>
        `;
    message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.98);
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            animation: slideInRight 0.6s ease-out;
            max-width: 300px;
        `;

    document.body.appendChild(message);

    // Create celebration
    if (typeof ParticlesConfig !== "undefined") {
      ParticlesConfig.createFloatingHearts(15);
    }

    // Remove after 8 seconds
    setTimeout(() => {
      message.style.animation = "slideOutRight 0.5s ease-out";
      setTimeout(() => message.remove(), 500);
    }, 8000);
  },

  // Get app statistics
  getStats() {
    return {
      storage: StorageManager.getStats(),
      cards:
        typeof CardsManager !== "undefined" ? CardsManager.getStats() : null,
      secrets:
        typeof SecretsManager !== "undefined"
          ? SecretsManager.getStats()
          : null,
      countdown:
        typeof CountdownTimer !== "undefined"
          ? CountdownTimer.getTotalDays()
          : null,
    };
  },

  // Debug function - show all stats
  showDebugInfo() {
    console.table(this.getStats());
  },
};

// Initialize when DOM is fully loaded
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => App.init());
  } else {
    App.init();
  }

  // Make App accessible globally for debugging
  window.AnniversaryApp = App;
}

// Add slideOutRight animation
const mainAnimationStyle = document.createElement("style");
mainAnimationStyle.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(mainAnimationStyle);
