// ==========================================
// Cards Manager
// Handles 365 reasons single-card display system
// ==========================================

const CardsManager = {
  reasons: [],
  currentReasonIndex: null,

  // Initialize the card system
  async init() {
    await this.loadReasons();
    this.setupEventListeners();
    this.updateProgress();
    this.showInitialMessage();
  },

  // Load reasons from JSON file
  async loadReasons() {
    try {
      const response = await fetch("data/reasons.json");
      this.reasons = await response.json();
    } catch (error) {
      console.error("Error loading reasons:", error);
      this.reasons = [];
    }
  },

  // Setup event listeners
  setupEventListeners() {
    const showReasonBtn = document.getElementById("show-reason-btn");
    if (showReasonBtn) {
      showReasonBtn.addEventListener("click", () => this.handleButtonClick());
    }

    const viewCollectionBtn = document.getElementById("view-collection-btn");
    if (viewCollectionBtn) {
      viewCollectionBtn.addEventListener("click", () =>
        this.openReasonsModal(),
      );
    }

    const closeModalBtn = document.getElementById("close-modal-btn");
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", () => this.closeReasonsModal());
    }

    const modal = document.getElementById("reasons-modal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.closeReasonsModal();
        }
      });
    }

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeReasonsModal();
      }
    });
  },

  // Show initial message
  showInitialMessage() {
    const cardNumber = document.getElementById("card-number");
    const cardCategory = document.getElementById("card-category");
    const cardEmoji = document.getElementById("card-emoji");
    const cardReason = document.getElementById("card-reason");
    const card = document.getElementById("single-reason-card");

    if (cardNumber) cardNumber.textContent = "💝";
    if (cardCategory) cardCategory.textContent = "";
    if (cardEmoji) cardEmoji.textContent = "";
    if (cardReason) {
      cardReason.textContent =
        "Klikni na gumb ispod da otkriješ razlog zašto te volim...";
      cardReason.style.fontSize = "1.2rem";
      cardReason.style.opacity = "0.8";
    }
    if (card) {
      card.classList.remove("revealed");
    }
  },

  // Handle button click (show reason or reset based on progress)
  handleButtonClick() {
    const viewedCards = StorageManager.getViewedCards();
    const allViewed = viewedCards.length >= this.reasons.length;

    if (allViewed) {
      // If all viewed, reset progress
      this.resetProgress();
    } else {
      // Otherwise show next reason
      this.showRandomReason();
    }
  },

  // Show a random unviewed reason
  showRandomReason() {
    if (this.reasons.length === 0) return;

    const viewedCards = StorageManager.getViewedCards();
    const unviewedReasons = this.reasons.filter(
      (r) => !viewedCards.includes(r.id),
    );

    // Pick random reason from unviewed
    const randomIndex = Math.floor(Math.random() * unviewedReasons.length);
    const reason = unviewedReasons[randomIndex];

    this.displayReason(reason);

    // Mark as viewed if it wasn't already
    if (!viewedCards.includes(reason.id)) {
      const wasNew = StorageManager.markCardViewed(reason.id);
      if (wasNew) {
        this.updateProgress();
        this.checkMilestone();
        this.checkCardSecret(reason.id);
      }
    }
  },

  // Display a reason in the card
  displayReason(reason) {
    const cardNumber = document.getElementById("card-number");
    const cardCategory = document.getElementById("card-category");
    const cardEmoji = document.getElementById("card-emoji");
    const cardReason = document.getElementById("card-reason");
    const card = document.getElementById("single-reason-card");

    // Add reveal animation
    if (card) {
      card.classList.remove("revealed");
      // Force reflow
      void card.offsetWidth;
      card.classList.add("revealed");
    }

    // Update content with staggered animation
    setTimeout(() => {
      if (cardNumber) cardNumber.textContent = `Dan ${reason.id}`;
      if (cardCategory) cardCategory.textContent = reason.category;
      if (cardEmoji) cardEmoji.textContent = reason.emoji;
      if (cardReason) {
        cardReason.textContent = reason.reason;
        cardReason.style.fontSize = "1.3rem";
        cardReason.style.opacity = "1";
      }
    }, 200);

    this.currentReasonIndex = reason.id;
  },

  // Create sparkle effect
  createSparkles() {
    const card = document.getElementById("single-reason-card");
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const sparkles = ["✨"];

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";
        sparkle.textContent =
          sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
          position: fixed;
          left: ${rect.left + rect.width / 2}px;
          top: ${rect.top + rect.height / 2}px;
          font-size: 1.5rem;
          pointer-events: none;
          z-index: 1000;
        `;

        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        sparkle.style.setProperty("--tx", tx + "px");
        sparkle.style.setProperty("--ty", ty + "px");

        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 2000);
      }, i * 100);
    }
  },

  // Check for milestones
  checkMilestone() {
    const stats = StorageManager.getStats();

    // 50 cards viewed
    if (stats.cardsViewed === 50 && typeof SecretsManager !== "undefined") {
      SecretsManager.revealSecret("secret9");
    }
  },

  // Check for card-specific secrets
  checkCardSecret(cardId) {
    // Card #143 triggers a secret
    if (cardId === 143 && typeof SecretsManager !== "undefined") {
      SecretsManager.revealSecret("secret7");
    }
  },

  // Update progress bar and button
  updateProgress() {
    const stats = StorageManager.getStats();
    const percentage = (stats.cardsViewed / stats.totalCards) * 100;
    const allViewed = stats.cardsViewed >= stats.totalCards;

    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");
    const showReasonBtn = document.getElementById("show-reason-btn");

    if (progressFill) {
      progressFill.style.width = percentage + "%";
    }

    if (progressText) {
      progressText.textContent = `${stats.cardsViewed} / ${stats.totalCards} otkiveno`;
    }

    // Update button text and show success message if all viewed
    if (showReasonBtn) {
      if (allViewed) {
        showReasonBtn.innerHTML = "🔄 Resetiraj napredak";
        showReasonBtn.classList.add("reset-mode");
        this.showSuccessMessage();
      } else {
        showReasonBtn.innerHTML = "💝 Prikaži razlog";
        showReasonBtn.classList.remove("reset-mode");
      }
    }
  },

  // Show success message when all reasons are viewed
  showSuccessMessage() {
    const cardNumber = document.getElementById("card-number");
    const cardCategory = document.getElementById("card-category");
    const cardEmoji = document.getElementById("card-emoji");
    const cardReason = document.getElementById("card-reason");
    const card = document.getElementById("single-reason-card");

    // Add reveal animation
    if (card) {
      card.classList.remove("revealed");
      void card.offsetWidth;
      card.classList.add("revealed");
    }

    setTimeout(() => {
      if (cardNumber) cardNumber.textContent = "🎉";
      if (cardCategory) cardCategory.textContent = "Čestitam!";
      if (cardEmoji) cardEmoji.textContent = "💖";
      if (cardReason) {
        cardReason.textContent =
          "Otkrila si svih 365 razloga zašto te volim! Svaki dan u godini pun je ljubavi prema tebi. ❤️";
        cardReason.style.fontSize = "1.3rem";
        cardReason.style.opacity = "1";
      }
    }, 200);

    // Create celebration effect
    this.createSparkles();
  },

  // Reset progress
  resetProgress() {
    if (
      confirm(
        "Jesi li sigurna da želiš resetirati napredak? Svi otkriveni razlozi će se vratiti na početak.",
      )
    ) {
      StorageManager.resetCards();
      this.updateProgress();
      this.showInitialMessage();

      // Show notification
      const toast = document.createElement("div");
      toast.className = "reset-toast";
      toast.textContent =
        "✨ Napredak resetiran! Započni ponovno otkrivanje razloga.";
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideUp 0.5s ease;
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  },

  // Get statistics
  getStats() {
    return {
      total: this.reasons.length,
      viewed: StorageManager.getViewedCards().length,
      favorites: StorageManager.getFavorites().length,
      currentReason: this.currentReasonIndex,
    };
  },

  // Open reasons modal
  openReasonsModal() {
    const modal = document.getElementById("reasons-modal");
    const grid = document.getElementById("modal-reasons-grid");

    if (!modal || !grid) return;

    // Get viewed card IDs
    const viewedCardIds = StorageManager.getViewedCards();

    if (viewedCardIds.length === 0) {
      grid.innerHTML = `
        <div class="no-reasons-message">
          <p>Još nisi otkrila nijedan razlog! 💝</p>
          <p>Klikni "Pokaži mi razlog" da započneš.</p>
        </div>
      `;
    } else {
      // Get the actual reason objects for viewed cards
      const viewedReasons = this.reasons.filter((r) =>
        viewedCardIds.includes(r.id),
      );

      // Sort by ID for consistent ordering
      viewedReasons.sort((a, b) => a.id - b.id);

      // Generate HTML for each discovered reason
      grid.innerHTML = viewedReasons
        .map(
          (reason) => `
        <div class="discovered-reason-card">
          <div class="card-number">Razlog #${reason.id}</div>
          <div class="card-emoji">${reason.emoji}</div>
          <p class="card-reason">${reason.reason}</p>
        </div>
      `,
        )
        .join("");
    }

    // Show modal
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  },

  // Close reasons modal
  closeReasonsModal() {
    const modal = document.getElementById("reasons-modal");
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  },
};

// Initialize when DOM is ready
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => CardsManager.init());
  } else {
    CardsManager.init();
  }
}
