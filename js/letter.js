// ==========================================
// Love Letter Animation
// Handles envelope opening and typewriter effect
// ==========================================

const LetterAnimation = {
  hasPlayed: false,
  observer: null,
  typingIntervals: [],
  typingTimeouts: [],
  isTyping: false,
  originalParagraphTexts: [],

  // Initialize letter section
  init() {
    this.setupEnvelopeClick();
    this.setupClickListeners();
    this.hideLetterTextInitially();
    this.storeOriginalText();
  },

  // Store original paragraph text content
  storeOriginalText() {
    const letterText = document.getElementById("letter-text");
    if (letterText) {
      const paragraphs = letterText.querySelectorAll("p");
      this.originalParagraphTexts = Array.from(paragraphs).map(
        (p) => p.textContent,
      );
    }
  },

  // Hide letter text initially
  hideLetterTextInitially() {
    const letterText = document.getElementById("letter-text");
    if (letterText) {
      const paragraphs = letterText.querySelectorAll("p");
      paragraphs.forEach((p) => {
        p.style.opacity = "0";
        p.style.visibility = "hidden";
      });
    }
  },

  // Setup click listener for envelope
  setupEnvelopeClick() {
    // Wait a bit to ensure DOM is fully rendered
    setTimeout(() => {
      const waxSeal = document.querySelector(".wax-seal");
      const envelope = document.getElementById("envelope");

      const clickHandler = (e) => {
        console.log("Wax seal clicked!", this.hasPlayed);
        if (!this.hasPlayed) {
          this.playAnimation();
          this.hasPlayed = true;
        }
      };

      if (waxSeal) {
        waxSeal.addEventListener("click", clickHandler, { capture: true });
        waxSeal.style.cursor = "pointer";
        console.log("Wax seal click listener attached", waxSeal);
      } else {
        console.warn("Wax seal element not found!");
      }

      // Also allow clicking the entire envelope
      if (envelope) {
        envelope.addEventListener("click", clickHandler);
        envelope.style.cursor = "pointer";
      }
    }, 100);
  },

  // Setup intersection observer to trigger animation
  setupObserver() {
    // Observer disabled - using click instead
    return;

    const options = {
      threshold: 0.3,
      rootMargin: "0px",
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasPlayed) {
          this.playAnimation();
          this.hasPlayed = true;
        }
      });
    }, options);

    const letterSection = document.getElementById("letter");
    if (letterSection) {
      this.observer.observe(letterSection);
    }
  },

  // Play the full animation sequence
  playAnimation() {
    // Check if GSAP is available
    if (typeof gsap === "undefined") {
      console.warn("GSAP not loaded, falling back to CSS animations");
      this.fallbackAnimation();
      return;
    }

    const envelope = document.getElementById("envelope");
    const letterPaper = document.getElementById("letter-paper");
    const envelopeFlap = document.querySelector(".envelope-flap");
    const waxSeal = document.querySelector(".wax-seal");

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => this.startTypewriter(),
    });

    // Animation sequence
    tl.from(envelope, {
      duration: 0.8,
      y: 100,
      opacity: 0,
      scale: 0.8,
      ease: "back.out(1.4)",
    })
      // Rotate wax seal
      .to(
        waxSeal,
        {
          duration: 0.5,
          rotation: 360,
          scale: 1.2,
          ease: "power2.out",
        },
        "+=0.5",
      )
      // Break seal
      .to(waxSeal, {
        duration: 0.3,
        scale: 0,
        opacity: 0,
        ease: "back.in(2)",
      })
      // Open envelope flap
      .to(
        envelopeFlap,
        {
          duration: 0.8,
          rotationX: -180,
          transformOrigin: "top center",
          ease: "power2.inOut",
        },
        "-=0.2",
      )
      // Slide letter out
      .to(
        letterPaper,
        {
          duration: 1,
          y: -50,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
        },
        "-=0.4",
      )
      // Hide envelope
      .to(
        envelope,
        {
          duration: 0.5,
          opacity: 0,
          y: -100,
          ease: "power2.in",
        },
        "-=0.5",
      )
      // Expand letter
      .to(letterPaper, {
        duration: 0.6,
        y: 0,
        scale: 1,
        ease: "back.out(1.2)",
      });

    // Add letter-paper show class and show skip button
    setTimeout(() => {
      letterPaper.classList.add("show");
      const skipBtn = document.getElementById("skip-typing-btn");
      if (skipBtn) {
        skipBtn.style.display = "block";
      }
    }, 2000);
  },

  // Fallback animation without GSAP
  fallbackAnimation() {
    const envelope = document.getElementById("envelope");
    const letterPaper = document.getElementById("letter-paper");

    envelope.style.animation = "fadeInScale 0.8s ease-out";

    setTimeout(() => {
      envelope.style.animation = "fadeOut 0.5s ease-out forwards";
      letterPaper.classList.add("show");
      this.startTypewriter();
    }, 2000);
  },

  // Typewriter effect for letter text
  startTypewriter() {
    const letterText = document.getElementById("letter-text");
    if (!letterText) return;

    this.isTyping = true;

    // Get all paragraphs
    const paragraphs = letterText.querySelectorAll("p");
    let paragraphIndex = 0;

    // Type each paragraph
    const typeParagraph = (paragraph, callback) => {
      const text = paragraph.textContent;
      paragraph.textContent = "";
      paragraph.style.opacity = "1";
      paragraph.style.visibility = "visible";
      paragraph.style.height = "auto";

      let charIndex = 0;

      const typeInterval = setInterval(() => {
        if (!this.isTyping) {
          clearInterval(typeInterval);
          paragraph.textContent = text;
          if (callback) callback();
          return;
        }

        if (charIndex < text.length) {
          paragraph.textContent += text[charIndex];
          charIndex++;
        } else {
          clearInterval(typeInterval);
          if (callback) callback();
        }
      }, 30); // Typing speed

      this.typingIntervals.push(typeInterval);
    };

    // Type paragraphs sequentially
    const typeNext = () => {
      if (!this.isTyping) {
        // Show all remaining paragraphs immediately
        for (let i = paragraphIndex; i < paragraphs.length; i++) {
          paragraphs[i].style.opacity = "1";
          paragraphs[i].style.visibility = "visible";
          paragraphs[i].style.height = "auto";
        }
        this.onComplete();
        return;
      }

      if (paragraphIndex < paragraphs.length) {
        typeParagraph(paragraphs[paragraphIndex], () => {
          paragraphIndex++;
          const timeout = setTimeout(typeNext, 300);
          this.typingTimeouts.push(timeout);
        });
      } else {
        // Animation complete
        this.isTyping = false;
        this.onComplete();
      }
    };

    // Start typing after a brief delay
    const startTimeout = setTimeout(typeNext, 500);
    this.typingTimeouts.push(startTimeout);
  },

  // Skip typing animation
  skipTyping() {
    if (!this.isTyping) return;

    this.isTyping = false;

    // Clear all intervals and timeouts
    this.typingIntervals.forEach((interval) => clearInterval(interval));
    this.typingTimeouts.forEach((timeout) => clearTimeout(timeout));
    this.typingIntervals = [];
    this.typingTimeouts = [];

    // Show all text immediately with original content restored
    const letterText = document.getElementById("letter-text");
    if (letterText) {
      const paragraphs = letterText.querySelectorAll("p");
      paragraphs.forEach((p, index) => {
        // Restore original text content
        if (this.originalParagraphTexts[index]) {
          p.textContent = this.originalParagraphTexts[index];
        }
        p.style.opacity = "1";
        p.style.visibility = "visible";
        p.style.height = "auto";
      });
    }

    // Hide skip button
    const skipBtn = document.getElementById("skip-typing-btn");
    if (skipBtn) {
      skipBtn.style.display = "none";
    }

    this.onComplete();
  },

  // Add sparkle effect near text
  addSparkle(element) {
    const sparkle = document.createElement("span");
    sparkle.textContent = "✨";
    sparkle.style.cssText = `
            position: absolute;
            font-size: 0.8rem;
            animation: sparkle 1s ease-out forwards;
            pointer-events: none;
        `;

    element.style.position = "relative";
    element.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
  },

  // Setup click listeners for secrets
  setupClickListeners() {
    // Skip button
    const skipBtn = document.getElementById("skip-typing-btn");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => this.skipTyping());
    }

    // Click on "Lucija" name triggers secret
    const lucijaName = document.getElementById("lucija-name");
    if (lucijaName) {
      lucijaName.addEventListener("click", () => {
        if (typeof SecretsManager !== "undefined") {
          SecretsManager.revealSecret("secret8");
        }

        // Visual feedback
        lucijaName.style.animation = "pulse 0.5s ease";
        setTimeout(() => {
          lucijaName.style.animation = "";
        }, 500);
      });
    }
  },

  // Animation complete
  onComplete() {
    this.isTyping = false;

    // Hide skip button
    const skipBtn = document.getElementById("skip-typing-btn");
    if (skipBtn) {
      skipBtn.style.display = "none";
    }

    // Create heart burst effect
    const letterPaper = document.getElementById("letter-paper");
    if (letterPaper && typeof ParticlesConfig !== "undefined") {
      const rect = letterPaper.getBoundingClientRect();
      ParticlesConfig.createBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
    }
  },

  // Reset animation (for testing)
  reset() {
    this.hasPlayed = false;
    const envelope = document.getElementById("envelope");
    const letterPaper = document.getElementById("letter-paper");

    if (envelope) {
      envelope.style.cssText = "";
    }

    if (letterPaper) {
      letterPaper.classList.remove("show");
      letterPaper.style.cssText = "";
    }

    // Reset text
    const letterText = document.getElementById("letter-text");
    if (letterText) {
      const paragraphs = letterText.querySelectorAll("p");
      paragraphs.forEach((p) => {
        p.style.opacity = "1";
      });
    }
  },
};

// Initialize when DOM is ready
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => LetterAnimation.init());
  } else {
    LetterAnimation.init();
  }
}
