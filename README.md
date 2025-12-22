# OTTO Automation Website

Modern, professional SaaS website for OTTO Automation - AI-powered customer conversation automation.

## 📁 Files Included

```
otto-website/
├── index.html          # Homepage
├── pricing.html        # Pricing page
├── why-otto.html       # Why Choose OTTO page
├── contact.html        # Contact page
├── styles.css          # All styling (modern, futuristic design)
├── script.js           # JavaScript interactions
└── README.md          # This file
```

## 🎨 Design Features

- **Color Scheme:**
  - Primary: #3AB573 (OTTO green)
  - Background: #000000 (black)
  - Text: #ffffff (white) and #555555 (gray)

- **Modern & Futuristic:**
  - Glassmorphism effects
  - Smooth animations
  - Gradient accents
  - Clean, spacious layout

- **Fully Responsive:**
  - Mobile-first design
  - Works on all devices
  - Adaptive navigation

- **User-Friendly:**
  - Simple language (for non-tech users)
  - Clear call-to-actions
  - Easy navigation
  - Professional appearance

## 🚀 Quick Start

### Option 1: View Locally

1. Open `index.html` in any web browser
2. Navigate using the menu
3. All pages work without a server

### Option 2: Test with Live Server (VS Code)

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Site opens at `http://localhost:5500`

## 📋 What's Included

### Homepage (index.html)
- Hero section with animated chat demo
- Stats bar (24/7, instant, 5x conversions, 100% secure)
- Problem/Solution section
- "How It Works" (3 steps)
- Features grid (8 features)
- Testimonials (3 customer stories)
- OTTO vs Competitors comparison table
- FAQ section (6 questions)
- Final CTA
- Complete footer

### Pricing Page (pricing.html)
- 3 pricing tiers (Starter, Pro, Elite)
- "Most Popular" badge on Pro
- Clear feature lists with checkmarks
- Cancellation policy banner
- Full comparison table
- Pricing FAQ

### Why Choose OTTO (why-otto.html)
- Key metrics showcase
- Problem statement
- Integration highlights
- Generic chatbot vs OTTO comparison
- More testimonials
- Industry-specific use cases (Home Services, Professional, Health, E-commerce)

### Contact Page (contact.html)
- Contact form (name, email, phone, business, subject, message)
- Contact information (email, location, schedule)
- Office hours
- Quick CTA to book demo
- FAQ section

## 🔧 Customization Guide

### Update Your Logo

Currently using text logo. To add image logo:

```html
<!-- Replace this in all .html files -->
<div class="logo">
    <span class="logo-text">OTTO</span>
    <span class="logo-subtext">AUTOMATION</span>
</div>

<!-- With this -->
<div class="logo">
    <img src="your-logo.png" alt="OTTO Automation" style="height: 50px;">
</div>
```

### Connect Contact Form

The contact form currently shows an alert. To make it functional:

**Option A: FormSpree (Easy, Free)**
```html
<!-- In contact.html, update form tag -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option B: EmailJS**
1. Sign up at emailjs.com
2. Get your service ID
3. Add EmailJS script to contact.html
4. Update the form submit handler

**Option C: Your Backend**
- Send form data to your API
- Handle email sending server-side

### Add Calendly/Cal.com for Demo Booking

Replace all `href="#demo"` with your Calendly link:

```html
<!-- Find and replace -->
<a href="#demo" class="btn-primary">Book a Demo</a>

<!-- With -->
<a href="https://calendly.com/your-username/demo" class="btn-primary">Book a Demo</a>
```

Or embed Calendly widget:
```html
<!-- Add to index.html where #demo is -->
<div class="calendly-inline-widget" data-url="https://calendly.com/your-username/demo" style="min-width:320px;height:630px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
```

### Link to Payment/Stripe for Pricing

Update "GET STARTED" buttons in pricing.html:

```html
<!-- Replace -->
<a href="#" class="btn-primary pricing-cta">GET STARTED</a>

<!-- With your Stripe payment link or checkout page -->
<a href="https://buy.stripe.com/your-product-link" class="btn-primary pricing-cta">GET STARTED</a>
```

### Add Google Analytics

Add before closing `</head>` tag in all HTML files:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Free)

1. Create account at vercel.com
2. Install Vercel CLI: `npm install -g vercel`
3. Navigate to otto-website folder
4. Run: `vercel`
5. Follow prompts
6. Get live URL instantly

**Or use Vercel Dashboard:**
1. Go to vercel.com
2. Click "Add New Project"
3. Upload otto-website folder
4. Deploy

### Option 2: Netlify (Free)

1. Create account at netlify.com
2. Drag and drop otto-website folder
3. Get live URL

**Or use Netlify CLI:**
```bash
npm install -g netlify-cli
cd otto-website
netlify deploy
```

### Option 3: GitHub Pages (Free)

1. Create GitHub repo
2. Upload files
3. Go to Settings > Pages
4. Select branch and save
5. Get URL: `https://yourusername.github.io/repo-name`

### Option 4: Your Own Hosting

Upload via FTP to any web host:
- Bluehost
- HostGator
- SiteGround
- etc.

### Option 5: Convert to Framer

Since your current site is on Framer:

1. **Manual Method:**
   - Copy sections from HTML
   - Recreate in Framer using their components
   - Paste copy directly

2. **Import Method:**
   - Framer can import HTML/CSS (with limitations)
   - May need adjustments after import

## 📱 Mobile Menu

Currently shows hamburger icon on mobile but needs JS to function. Add to `script.js`:

```javascript
// Already included in script.js
// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
```

Then add to `styles.css`:

```css
@media (max-width: 968px) {
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        right: 0;
        background-color: rgba(0, 0, 0, 0.98);
        padding: var(--spacing-lg);
        border-radius: var(--radius-md);
    }
}
```

## ✅ Before Going Live Checklist

- [ ] Add your actual logo (or keep text logo)
- [ ] Connect contact form to email service
- [ ] Add Calendly/scheduling link for demos
- [ ] Link pricing buttons to Stripe/payment
- [ ] Update all placeholder text (if any)
- [ ] Add Google Analytics tracking code
- [ ] Test all links work
- [ ] Test on mobile devices
- [ ] Test contact form submission
- [ ] Add OTTO chatbot to your own site (practice what you preach!)
- [ ] Create Terms of Service page
- [ ] Create Privacy Policy page
- [ ] Set up custom domain
- [ ] Add SSL certificate (usually automatic with Vercel/Netlify)

## 🎯 Next Steps

1. **Add Real OTTO Chatbot:**
   - Once Voiceflow developer builds it
   - Add to your own site first (shows it works!)
   - Huge credibility boost

2. **Content Additions:**
   - Case studies page
   - Blog (for SEO)
   - Help center
   - Video demo

3. **SEO Optimization:**
   - Add meta descriptions (partially done)
   - Add OpenGraph images
   - Submit sitemap to Google
   - Create blog content

4. **Conversion Optimization:**
   - Add exit-intent popup
   - Add email capture
   - Add live chat (use OTTO!)
   - A/B test headlines

## 🆘 Support

If you need help with:
- Customization
- Deployment
- Integration
- Additional pages

Just let me know!

## 📝 Notes

- All code is clean and commented
- Fully responsive design
- Modern CSS (CSS Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (no dependencies)
- Fast loading (no heavy frameworks)
- SEO-friendly structure
- Accessibility features included

## 🎨 Design Philosophy

This website balances:
- **Futuristic:** Gradients, animations, modern layout
- **Professional:** Clean, organized, trustworthy
- **Simple:** Easy to understand for non-tech users
- **Modern:** Current design trends without being trendy

Perfect for a SaaS product that needs to appeal to both tech-savvy users and traditional business owners.

---

**Created with Claude Code**
Version 1.0 - December 2024
