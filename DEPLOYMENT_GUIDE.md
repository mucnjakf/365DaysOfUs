# 🚀 Deployment Guide for Lucija's Anniversary App

## Quick Start - Local Testing

Your app is ready to use! Simply open `index.html` in any modern browser.

## 📝 Before Deploying - Customization Checklist

### 1. **Personalize the Love Letter** (IMPORTANT!)

Edit [index.html](index.html#L188-L209) - Lines 188-209

Replace the letter content with your own heartfelt message to Lucija. The current text is a template.

### 2. **Review the 365 Reasons**

Check [data/reasons.json](data/reasons.json)

The file contains 365 pre-written reasons. You may want to:

- Replace some with your own personal reasons
- Add inside jokes only you two understand
- Include specific memories and moments
- Keep the same JSON structure: `{"id": 1, "category": "...", "reason": "...", "emoji": "..."}`

### 3. **Customize Secret Messages**

Edit [data/secrets.json](data/secrets.json)

Update the secret messages with your own personal notes, inside jokes, and surprises.

### 4. **Verify Anniversary Date**

Check [js/countdown.js](js/countdown.js#L8)

Make sure the date is correct: `anniversaryDate: new Date('2025-02-08T00:00:00')`

---

## 🌐 Deploying to GitHub Pages (FREE)

### Step 1: Create a GitHub Account

1. Go to https://github.com
2. Sign up if you don't have an account (it's free!)

### Step 2: Create a New Repository

1. Click the "+" icon in the top right → "New repository"
2. Repository name: `anniversary-for-lucija` (or any name you like)
3. Set to **Public** (required for free GitHub Pages)
4. Do NOT initialize with README (we already have one)
5. Click "Create repository"

### Step 3: Upload Your Files

**Option A: Using GitHub Website (Easier)**

1. On your new repository page, click "uploading an existing file"
2. Drag and drop ALL files and folders from `anniversary-app` folder
3. Write commit message: "Initial commit - Anniversary app for Lucija 💕"
4. Click "Commit changes"

**Option B: Using Git Command Line**

```powershell
cd C:\Users\filip\anniversary-app
git init
git add .
git commit -m "Initial commit - Anniversary app for Lucija 💕"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/anniversary-for-lucija.git
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (left sidebar)
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"
6. Wait 2-5 minutes for deployment

### Step 5: Get Your Live URL

Your app will be live at:

```
https://YOUR-USERNAME.github.io/anniversary-for-lucija/
```

Example: `https://johnsmith.github.io/anniversary-for-lucija/`

---

## 🎁 Sharing the Gift

### Perfect Ways to Share:

1. **Send the URL** via text with a sweet message
2. **Create a QR code** that links to the site (use qr-code-generator.com)
3. **Add to phone home screen**:
   - Open the URL on her phone
   - Safari (iOS): Tap Share → "Add to Home Screen"
   - Chrome (Android): Menu → "Add to Home Screen"
4. **Email** with a romantic subject line

---

## 🛠️ Troubleshooting

### Cards not loading?

- Check browser console for errors (F12)
- Verify `reasons.json` is valid JSON (use jsonlint.com)
- Make sure all files are uploaded to GitHub

### Countdown showing wrong time?

- Verify the date in `js/countdown.js` line 8
- Check timezone (uses local browser time)

### Particles not showing?

- Ensure internet connection (uses CDN for tsParticles)
- Check if ad blockers are interfering

### Mobile not working well?

- Clear browser cache
- Try in incognito/private mode
- Test on actual device, not just dev tools

---

## 📱 Testing on Mobile

1. Deploy to GitHub Pages first
2. Open on your phone to test
3. Add to home screen for app-like experience
4. Test all interactions:
   - Card flips
   - Secret revelations
   - Scroll animations
   - Letter animation

---

## 🔒 Keep it Private (Optional)

If you want password protection:

1. Use a service like **Password Protect** (Netlify)
2. Or use an **obscure URL** nobody can guess
3. Or keep repository **private** and use Netlify/Vercel (free alternatives)

---

## 📊 Features to Highlight When Sharing

Tell Lucija to:

- ✨ Explore all 365 cards (she can favorite her favorites!)
- 🔍 Find all 15 hidden secrets (give hints if she asks!)
- 💌 Read the love letter
- 📱 Add to home screen so it's always there
- 💝 Visit on your actual anniversary for a special surprise!

---

## 🎨 Advanced Customization (Optional)

### Change Colors

Edit [css/main.css](css/main.css#L6-L13) - CSS Custom Properties

### Add Photos

1. Create `assets/images/` folder
2. Add images (use WebP format for best performance)
3. Update HTML/CSS to display them

### Add Music

1. Add audio file to `assets/` folder
2. Add audio player in HTML
3. Use subtle background music

---

## 💡 Tips for Maximum Impact

1. **Deploy it BEFORE February 8th** so it's ready!
2. **Test on HER phone** (different devices render differently)
3. **Send at the right moment** (morning of anniversary, or midnight surprise)
4. **Add a personal video/voice message** as an extra secret
5. **Update it yearly** with new reasons and memories

---

## 🆘 Need Help?

### Common Issues:

- **"404 Not Found"** → Wait 5-10 minutes after enabling Pages
- **"Page not building"** → Check GitHub Actions tab for errors
- **JSON errors** → Validate JSON files at jsonlint.com
- **Secrets not working** → Check browser console (F12) for JavaScript errors

---

## 📈 Analytics (Optional)

Want to see when she visits?

1. Add Google Analytics (free)
2. Or use Simple Analytics (privacy-friendly)
3. Track: visits, time spent, cards viewed

---

## 🎉 You're Done!

Your personalized anniversary web app is ready to deploy!

**Final Checklist:**

- [ ] Personalized love letter
- [ ] Reviewed all 365 reasons
- [ ] Updated secret messages
- [ ] Verified anniversary date
- [ ] Tested locally in browser
- [ ] Deployed to GitHub Pages
- [ ] Tested on mobile device
- [ ] Ready to share with Lucija!

**Made with 💕 for Lucija**

---

## 🔄 Future Updates

You can update the app anytime:

1. Edit files locally
2. Upload to GitHub (replace files)
3. Changes appear live in 1-2 minutes

Perfect for:

- Adding new reasons throughout the year
- Updating the letter on anniversaries
- Adding new secrets
- Including photos from new memories

Enjoy gifting this to Lucija! 🌸💕
