// ==========================================
// Countdown Timer
// Calculates and displays time since anniversary
// ==========================================

const CountdownTimer = {
  // Anniversary date: February 8, 2025
  anniversaryDate: new Date("2025-02-08T00:00:00"),
  intervalId: null,
  clickCount: 0,
  clickTimer: null,

  // Initialize the countdown
  init() {
    this.updateCountdown();
    // Update every second
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);

    // Add click listener for easter egg
    this.addClickListener();
  },

  // Calculate time difference
  calculateDifference() {
    const now = new Date();
    const diff = now - this.anniversaryDate;

    // Calculate units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  },

  // Update the countdown display
  updateCountdown() {
    const { days, hours, minutes, seconds } = this.calculateDifference();

    // Update DOM elements with animation
    this.updateElement("days", days);
    this.updateElement("hours", hours);
    this.updateElement("minutes", minutes);
    this.updateElement("seconds", seconds);

    // Check if it's the anniversary day
    this.checkAnniversaryDay();
  },

  // Update individual element with flip animation
  updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
      const currentValue = parseInt(element.textContent) || 0;

      if (currentValue !== value) {
        // Add flip animation class
        const card = element.closest(".flip-card");
        if (card) {
          card.style.animation = "flipIn 0.6s ease-out";
          setTimeout(() => {
            card.style.animation = "";
          }, 600);
        }

        // Update value
        element.textContent = value.toString().padStart(2, "0");
      }
    }
  },

  // Check if today is the anniversary
  checkAnniversaryDay() {
    const now = new Date();
    const isAnniversary =
      now.getMonth() === 1 && // February (0-indexed)
      now.getDate() === 8;

    if (isAnniversary) {
      this.playAnniversaryAnimation();
    }
  },

  // Special animation for anniversary day
  playAnniversaryAnimation() {
    // Add special styling
    const heroSection = document.querySelector(".hero-section");
    if (heroSection && !heroSection.classList.contains("anniversary-special")) {
      heroSection.classList.add("anniversary-special");
      this.createConfetti();

      // Show special message
      this.showAnniversaryMessage();
    }
  },

  // Create confetti effect
  createConfetti() {
    const colors = ["#FFB6C1", "#FFC0CB", "#E6E6FA", "#FFDAB9", "#FF7F7F"];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.background =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + "s";
        document.body.appendChild(confetti);

        // Remove after animation
        setTimeout(() => confetti.remove(), 3000);
      }, i * 50);
    }
  },

  // Show anniversary message
  showAnniversaryMessage() {
    const message = document.createElement("div");
    message.className = "anniversary-message";
    message.innerHTML = `
            <h2>🎉 Sretan godišnjica, Lucija! 🎉</h2>
            <p>Još jedna godina ljubavi, smijeha i prekrasnih zajedničkih uspomena!</p>
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
        `;

    document.body.appendChild(message);

    // Remove after 5 seconds
    setTimeout(() => {
      message.style.animation = "fadeOut 0.5s ease-out";
      setTimeout(() => message.remove(), 500);
    }, 5000);
  },

  // Easter egg: Click countdown 3 times
  addClickListener() {
    const countdown = document.getElementById("countdown");
    if (countdown) {
      countdown.addEventListener("click", () => {
        this.clickCount++;

        // Reset click count after 2 seconds
        clearTimeout(this.clickTimer);
        this.clickTimer = setTimeout(() => {
          this.clickCount = 0;
        }, 2000);

        // Trigger secret on 3 clicks
        if (this.clickCount === 3) {
          if (typeof SecretsManager !== "undefined") {
            SecretsManager.revealSecret("secret1");
          }
          this.clickCount = 0;

          // Add visual feedback
          countdown.style.animation = "bounce 1s ease";
          setTimeout(() => {
            countdown.style.animation = "";
          }, 1000);
        }
      });
    }
  },

  // Stop the countdown (cleanup)
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  },

  // Get formatted time string
  getFormattedTime() {
    const { days, hours, minutes, seconds } = this.calculateDifference();
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  },

  // Get total days together
  getTotalDays() {
    return this.calculateDifference().days;
  },
};

// Initialize when DOM is ready
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => CountdownTimer.init());
  } else {
    CountdownTimer.init();
  }
}
