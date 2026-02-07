# 🎁 Features & Easter Eggs Reference Guide

## 🌟 Main Features

### 1. **Live Countdown Timer** (Section 1)

- Shows days, hours, minutes, seconds since February 8, 2025
- Special animation on anniversary day (Feb 8)
- Confetti effect on the actual anniversary
- **Easter Egg**: Click the countdown 3 times to reveal Secret #1

### 2. **365 Reasons I Love You** (Section 2)

- 365 unique, heartfelt reasons organized by category:
  - 💕 Your Smile
  - 🌟 Little Things
  - 💫 How You Make Me Feel
  - 🌸 Your Beautiful Soul
  - ✨ Inside Jokes
  - 🌈 Dreams & Future

**Interactive Features:**

- **Card Flipping**: Click any card to reveal the reason
- **Favorites**: Heart button on each card to save favorites
- **Random Card**: "Surprise Me!" button shows a random reason
- **Filter by Category**: Dropdown to view specific categories
- **Progress Tracking**: Shows how many cards have been discovered
- **Pagination**: 24 cards per page for smooth browsing

**Progress Saved:**

- All viewed cards are remembered
- Favorites are saved
- Progress bar updates automatically

### 3. **Hidden Secrets** (Section 3)

15 secret messages hidden throughout the app!

**Status Display:**

- Counter shows how many secrets found (X / 15)
- Discovered secrets appear in the list
- Each secret has a unique unlock method

### 4. **Animated Love Letter** (Section 4)

- Beautiful envelope opening animation
- Wax seal breaks
- Letter unfolds gracefully
- Typewriter effect reveals text word by word
- Sparkles appear as you read
- **Easter Egg**: Click "Lucija" in the letter header for Secret #8

---

## 🔍 Complete Easter Eggs Guide

### Secret #1: "First Date Memory"

**How to Unlock**: Click the countdown timer 3 times rapidly
**Message**: "Remember our first date? I was so nervous I almost cancelled three times!"

### Secret #2: "Soulmate"

**How to Unlock**: Type "lucija" anywhere on the page
**Message**: "You're the reason I believe in soulmates 💕"

### Secret #3: "Bottom of Love"

**How to Unlock**: Scroll to the very bottom of the page
**Message**: "Every song reminds me of you now. Even the weird ones."

### Secret #4: "Particle Magic"

**How to Unlock**: Click on a floating sparkle particle (in hero section)
**Message**: "I save every text message you send me. Yes, all of them."
**Note**: This one is tricky - particles are small and moving!

### Secret #5: "Title Surprise"

**How to Unlock**: Double-click the page title "Our Love Story"
**Message**: "You make me want to be the best version of myself"

### Secret #6: "Konami Code"

**How to Unlock**: Enter the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
**Message**: "I knew I loved you way before I said it out loud ❤️"
**Note**: Use arrow keys, then press B, then A

### Secret #7: "Card Discovery"

**How to Unlock**: Open reason card #143
**Message**: "You're my favorite person to do nothing with"

### Secret #8: "Name Click"

**How to Unlock**: Click "Lucija" in the love letter
**Message**: "I think about our future together every single day"

### Secret #9: "Milestone Achievement"

**How to Unlock**: View 50 different reason cards
**Message**: "You're my forever and always 💫"
**Note**: Auto-unlocks at 50 cards viewed

### Secret #10: "Evening Surprise"

**How to Unlock**: Visit the site between 6 PM - 10 PM and click the moon icon (top left)
**Message**: "Can't wait to spend a lifetime annoying you! 😄"
**Note**: Moon only appears in evening hours!

### Secret #11: "Footer Patience"

**How to Unlock**: Hover over the footer for 5 seconds
**Message**: "You complete me in ways I didn't know I was incomplete"
**Hint**: The footer says "some things are worth hovering over"

### Secret #12: "Rapid Love"

**How to Unlock**: Click "Our Love Story" title 5 times quickly (within 1 second)
**Message**: "Every day with you is my new favorite day"

### Secret #13: "Hidden Heart"

**How to Unlock**: Click the hidden heart in the Secrets section (bottom right, semi-transparent)
**Message**: "I love you more than pizza. And that's saying something! 🍕"
**Hint**: It has a shimmer effect when you hover near it

### Secret #14: "Favorite Collection"

**How to Unlock**: Favorite (heart) 10 different reason cards
**Message**: "You're my happily ever after 💍"
**Note**: Auto-unlocks at 10 favorites

### Secret #15: "Anniversary Day"

**How to Unlock**: Visit the site on February 8th
**Message**: "Forever grateful that you chose me too 💖"
**Note**: Only available on your actual anniversary!

---

## 🎨 Visual Features

### Custom Cursor (Desktop Only)

- Heart emoji follows mouse
- Leaves sparkle trail
- Changes size on interactive elements
- Creates particles on click

### Particle Effects

- Floating hearts, stars, and sparkles
- Interactive on click/hover
- Adjusts based on time of day:
  - Morning: Soft pink & yellow
  - Afternoon: Bright pink & coral
  - Evening: Deep pink & purple
  - Night: Purple & lavender

### Scroll Animations

- Smooth fade-ins
- Parallax effects
- Section indicators
- Progress dots (right side)

### Responsive Design

- Works perfectly on phones
- Touch-friendly interactions
- Swipe gestures
- Optimized for both portrait & landscape

---

## 💾 Data Storage

All progress is saved locally in the browser:

- **Cards Viewed**: Tracks which cards have been opened
- **Favorites**: Saves hearted cards
- **Secrets Found**: Remembers discovered secrets
- **Visit Count**: How many times she's visited
- **Last Visit Date**: When she last opened the app

**Data persists** even after closing the browser!

---

## 📱 Mobile Features

### Add to Home Screen

On iOS (Safari):

1. Tap the Share button
2. Select "Add to Home Screen"
3. App appears like a native app!

On Android (Chrome):

1. Tap the menu (⋮)
2. Select "Add to Home Screen"
3. Icon appears on home screen!

### Touch Interactions

- Tap to flip cards (no hover needed)
- Tap hearts to favorite
- Pull-to-refresh works
- Smooth scrolling
- Reduced particles for performance

---

## 🎉 Special Events

### On Anniversary Day (Feb 8)

- Special confetti animation
- Unique message appears
- Secret #15 unlocks automatically
- Extra particle effects
- Special colors

### Monthly Milestones

- Message appears on the 8th of each month
- Celebrates months together
- Floating hearts animation
- Counter updates

### Evening Mode (6 PM - 10 PM)

- Moon icon appears (top left)
- Darker particle colors
- Purple/lavender tones
- Secret #10 becomes available

---

## 🎯 Achievement System

Track her progress:

- **Cards Viewed**: X / 365
- **Favorites**: Unlimited
- **Secrets Found**: X / 15
- **Visit Count**: Tracks engagement

All viewable in browser console:

```javascript
window.AnniversaryApp.showDebugInfo();
```

---

## 🛠️ Developer Features

### Debug Commands (Browser Console)

```javascript
// Show all statistics
window.AnniversaryApp.showDebugInfo();

// Reveal all secrets (testing only!)
SecretsManager.revealAll();

// Get secret hints
SecretsManager.getHints();

// Check storage data
StorageManager.getData();

// Clear all progress (testing only!)
StorageManager.clearAll();
```

### Performance Optimizations

- Lazy loading for cards (24 per page)
- Virtual scrolling
- Compressed assets
- Debounced scroll events
- Optimized animations
- Reduced motion support

---

## 📊 Usage Tips

### For Maximum Impact:

1. **Guide her gently** - Give hints for first secret
2. **Let her explore** - Don't reveal everything
3. **Check progress** - Use debug commands to see what she's found
4. **Update regularly** - Add new reasons on special days
5. **Be patient** - Some secrets require time/visits

### Hints to Give Her:

- "There are hidden secrets throughout - try exploring!"
- "Some cards have special surprises..."
- "The footer has a hint about hovering..."
- "Try typing my name somewhere..."
- "What happens if you click things multiple times?"

### Don't Tell Her:

- Specific secret locations
- Exact click counts
- Konami code sequence
- That the moon appears in evening

Let her discover naturally for maximum joy! ✨

---

## 🎨 Customization Ideas

### Easy Updates:

1. Add new reasons to reasons.json
2. Update love letter text
3. Add new secrets
4. Change colors in main.css
5. Add anniversary photos

### Advanced Customization:

- Add background audio
- Include video messages
- Create a timeline section
- Add a photo gallery
- Embed Instagram/social posts

---

## ✨ Success Indicators

She's enjoying it if:

- [ ] Visits multiple times
- [ ] Views many cards
- [ ] Favorites her favorites
- [ ] Finds several secrets
- [ ] Spends 10+ minutes exploring
- [ ] Messages you about what she found!
- [ ] Adds to home screen
- [ ] Shows it to friends/family

---

**Pro Tip**: Don't tell her about ALL the features - let the discovery be part of the gift! The joy is in finding things herself. 💝

Made with 💕 for Lucija
