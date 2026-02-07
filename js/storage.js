// ==========================================
// Local Storage Manager
// Handles saving and loading user progress
// ==========================================

const StorageManager = {
  // Storage key
  STORAGE_KEY: "lucija_anniversary_data",

  // Initialize storage with default data
  init() {
    if (!this.getData()) {
      this.saveData({
        user: {
          name: "Lucija",
          startDate: "2025-02-08",
          firstVisit: new Date().toISOString(),
        },
        progress: {
          cardsViewed: [],
          favorites: [],
          secretsFound: [],
          lastVisit: new Date().toISOString(),
          totalVisits: 1,
        },
      });
    } else {
      this.updateLastVisit();
    }
  },

  // Get all data from localStorage
  getData() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },

  // Save data to localStorage
  saveData(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  },

  // Update last visit timestamp
  updateLastVisit() {
    const data = this.getData();
    if (data) {
      data.progress.lastVisit = new Date().toISOString();
      data.progress.totalVisits = (data.progress.totalVisits || 1) + 1;
      this.saveData(data);
    }
  },

  // Mark a card as viewed
  markCardViewed(cardId) {
    const data = this.getData();
    if (data && !data.progress.cardsViewed.includes(cardId)) {
      data.progress.cardsViewed.push(cardId);
      this.saveData(data);
      return true;
    }
    return false;
  },

  // Get all viewed cards
  getViewedCards() {
    const data = this.getData();
    return data ? data.progress.cardsViewed : [];
  },

  // Toggle favorite status of a card
  toggleFavorite(cardId) {
    const data = this.getData();
    if (!data) return false;

    const index = data.progress.favorites.indexOf(cardId);
    if (index > -1) {
      // Remove from favorites
      data.progress.favorites.splice(index, 1);
      this.saveData(data);
      return false; // Not favorited
    } else {
      // Add to favorites
      data.progress.favorites.push(cardId);
      this.saveData(data);
      return true; // Favorited
    }
  },

  // Check if card is favorited
  isFavorited(cardId) {
    const data = this.getData();
    return data ? data.progress.favorites.includes(cardId) : false;
  },

  // Get all favorited cards
  getFavorites() {
    const data = this.getData();
    return data ? data.progress.favorites : [];
  },

  // Add a discovered secret
  addSecret(secretId) {
    const data = this.getData();
    if (data && !data.progress.secretsFound.includes(secretId)) {
      data.progress.secretsFound.push(secretId);
      this.saveData(data);
      return true;
    }
    return false;
  },

  // Get all discovered secrets
  getSecrets() {
    const data = this.getData();
    return data ? data.progress.secretsFound : [];
  },

  // Check if secret is found
  hasSecret(secretId) {
    const data = this.getData();
    return data ? data.progress.secretsFound.includes(secretId) : false;
  },

  // Get statistics
  getStats() {
    const data = this.getData();
    if (!data) return null;

    return {
      cardsViewed: data.progress.cardsViewed.length,
      totalCards: 365,
      favorites: data.progress.favorites.length,
      secretsFound: data.progress.secretsFound.length,
      totalSecrets: 15,
      totalVisits: data.progress.totalVisits || 1,
      firstVisit: data.user.firstVisit,
      lastVisit: data.progress.lastVisit,
    };
  },

  // Check if first time visitor
  isFirstVisit() {
    const data = this.getData();
    return !data || data.progress.totalVisits === 1;
  },

  // Clear all data (for testing)
  clearAll() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },

  // Export data as JSON (for backup)
  exportData() {
    const data = this.getData();
    if (data) {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `lucija_anniversary_backup_${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  },
};

// Initialize storage on load
if (typeof window !== "undefined") {
  StorageManager.init();
}
