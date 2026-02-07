// ==========================================
// Secrets Manager
// Handles hidden easter eggs and secret messages
// ==========================================

const SecretsManager = {
  secrets: [],
  konamiCode: [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ],
  konamiProgress: 0,
  keyBuffer: "",
  keyTimeout: null,

  // Initialize secrets system
  async init() {
    await this.loadSecrets();
    this.setupListeners();
    this.updateDisplay();
  },

  // Load secrets from JSON
  async loadSecrets() {
    try {
      const response = await fetch("data/secrets.json");
      this.secrets = await response.json();
    } catch (error) {
      console.error("Error loading secrets:", error);
      this.secrets = [];
    }
  },

  // Setup event listeners for secrets
  setupListeners() {
    // Konami code listener
    document.addEventListener("keydown", (e) => this.checkKonamiCode(e));

    // Keyboard typing listener (for "lucija")
    document.addEventListener("keypress", (e) => this.checkTyping(e));

    // Wax seal click listener (for envelope secret)
    const waxSeal = document.querySelector(".wax-seal");
    if (waxSeal) {
      waxSeal.addEventListener("click", () => this.revealSecret("secret3"));
    }

    // Footer click listener (mobile-friendly)
    const footer = document.getElementById("footer");
    if (footer) {
      let footerClickCount = 0;
      let footerClickTimer = null;

      footer.addEventListener("click", () => {
        footerClickCount++;
        footer.style.cursor = "pointer";

        clearTimeout(footerClickTimer);
        footerClickTimer = setTimeout(() => {
          footerClickCount = 0;
        }, 2000);

        if (footerClickCount === 3) {
          this.revealSecret("secret11");
          footerClickCount = 0;
        }
      });
    }

    // Hidden heart click listener
    const hiddenHeart = document.getElementById("hidden-heart");
    if (hiddenHeart) {
      hiddenHeart.addEventListener("click", () =>
        this.revealSecret("secret13"),
      );
    }

    // Page title double-click
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
      heroTitle.addEventListener("dblclick", () =>
        this.revealSecret("secret5"),
      );
    }

    // "For Lucija" rapid click listener
    this.setupRapidClickListener();

    // Check for anniversary day secret
    this.checkAnniversaryDay();
  },

  // Check Konami code
  checkKonamiCode(e) {
    if (e.key === this.konamiCode[this.konamiProgress]) {
      this.konamiProgress++;

      if (this.konamiProgress === this.konamiCode.length) {
        this.revealSecret("secret6");
        this.konamiProgress = 0;
      }
    } else {
      this.konamiProgress = 0;
    }
  },

  // Check typing for keywords
  checkTyping(e) {
    clearTimeout(this.keyTimeout);
    this.keyBuffer += e.key.toLowerCase();

    // Check if "lucija" is typed
    if (this.keyBuffer.includes("lucija")) {
      this.revealSecret("secret2");
      this.keyBuffer = "";
    }

    // Clear buffer after 2 seconds
    this.keyTimeout = setTimeout(() => {
      this.keyBuffer = "";
    }, 2000);
  },

  // Setup rapid click listener for "For Lucija"
  setupRapidClickListener() {
    const pageTitle = document.querySelector("title");
    let clickCount = 0;
    let clickTimer = null;

    // Create a hidden clickable element for the page title concept
    const titleElement = document.querySelector(".hero-title");
    if (titleElement) {
      titleElement.style.cursor = "pointer";
      titleElement.addEventListener("click", () => {
        clickCount++;

        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 1000);

        if (clickCount === 5) {
          this.revealSecret("secret12");
          clickCount = 0;
        }
      });
    }
  },

  // Check if today is anniversary day
  checkAnniversaryDay() {
    const now = new Date();
    if (now.getMonth() === 1 && now.getDate() === 8) {
      this.revealSecret("secret15");
    }
  },

  // Reveal a secret
  revealSecret(secretId) {
    // Check if already found
    if (StorageManager.hasSecret(secretId)) {
      return;
    }

    // Find secret data
    const secret = this.secrets.find((s) => s.id === secretId);
    if (!secret) return;

    // Save to storage
    const wasNew = StorageManager.addSecret(secretId);

    if (wasNew) {
      // Show toast notification
      this.showToast(secret.message);

      // Update display
      this.updateDisplay();

      // Create celebration effect
      this.celebrateSecret();
    }
  },

  // Show toast notification
  showToast(message) {
    const toast = document.getElementById("secret-toast");
    const toastMessage = toast.querySelector(".toast-message");

    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add("show");

      // Hide after 5 seconds
      setTimeout(() => {
        toast.classList.remove("show");
      }, 5000);
    }
  },

  // Celebrate secret discovery
  celebrateSecret() {
    // Play sound effect (optional - would need audio file)
    // this.playSound('secret-found.mp3');

    // Create particle burst
    if (typeof ParticlesConfig !== "undefined") {
      ParticlesConfig.createFloatingHearts(5);
    }

    // Confetti effect
    this.createMiniConfetti();
  },

  // Create mini confetti
  createMiniConfetti() {
    const colors = ["#FFB6C1", "#FFC0CB", "#E6E6FA", "#FFDAB9"];
    const count = 20;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10000;
                    animation: confettiFall 3s ease-out forwards;
                    animation-delay: ${Math.random() * 0.5}s;
                `;

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3500);
      }, i * 50);
    }
  },

  // Update secrets display
  updateDisplay() {
    const foundSecrets = StorageManager.getSecrets();
    const counter = document.getElementById("secrets-found");
    const secretsList = document.getElementById("secrets-list");

    // Update counter
    if (counter) {
      counter.textContent = foundSecrets.length;
    }

    // Update list
    if (secretsList) {
      secretsList.innerHTML = "";

      foundSecrets.forEach((secretId) => {
        const secret = this.secrets.find((s) => s.id === secretId);
        if (secret) {
          const item = document.createElement("div");
          item.className = "secret-item";
          item.innerHTML = `
                        <p class="secret-message">"${secret.message}"</p>
                    `;
          secretsList.appendChild(item);
        }
      });
    }
  },

  // Get statistics
  getStats() {
    const foundSecrets = StorageManager.getSecrets();
    return {
      found: foundSecrets.length,
      total: this.secrets.length,
      percentage: ((foundSecrets.length / this.secrets.length) * 100).toFixed(
        1,
      ),
    };
  },

  // Show all secrets (for testing/debug)
  revealAll() {
    this.secrets.forEach((secret) => {
      StorageManager.addSecret(secret.id);
    });
    this.updateDisplay();
  },

  // Get hint for unfound secrets
  getHints() {
    const foundSecrets = StorageManager.getSecrets();
    const unfoundSecrets = this.secrets.filter(
      (s) => !foundSecrets.includes(s.id),
    );

    return unfoundSecrets.map((s) => ({
      id: s.id,
      hint: s.hint,
    }));
  },
};

// Initialize when DOM is ready
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => SecretsManager.init());
  } else {
    SecretsManager.init();
  }
}
