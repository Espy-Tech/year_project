# 🚀 Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the Numerical Integration Scientific Platform to production.

---

## Prerequisites

- ✅ Git repository (GitHub)
- ✅ Vercel account (vercel.com)
- ✅ Node.js 18+ installed locally
- ✅ npm/yarn installed
- ✅ Project built and tested locally

---

## Deployment Options

### 1. **Vercel (Recommended)** ⭐

**Best for:** Next.js applications, automatic deployments, zero configuration

#### Setup

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Deploy: Numerical Integration Platform"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select GitHub repository
   - Import project

3. **Configure Project**
   - Framework Preset: Next.js (auto-selected)
   - Root Directory: `./` (current)
   - Build Command: `npm run build` (auto)
   - Output Directory: `.next` (auto)
   - Environment Variables: (none required, or add `.env.local`)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get live URL (e.g., `numerical-integration.vercel.app`)

#### Automatic Deployments

Every push to `main` automatically deploys:

```bash
git push origin main
# Vercel detects changes
# Builds production bundle
# Deploys automatically
# Live within 2-5 minutes
```

#### Production URL

```
https://[project-name].vercel.app
```

---

### 2. **GitHub Pages**

**Best for:** Static site hosting, free tier

#### Setup

1. **Build Static Export**

   Modify `next.config.ts`:

   ```typescript
   const nextConfig: NextConfig = {
     output: "export", // Enable static export
     reactStrictMode: true,
   };
   ```

2. **Build**

   ```bash
   npm run build
   # Creates 'out' directory with static files
   ```

3. **Deploy**

   ```bash
   git add out/
   git commit -m "Deploy: Static build"
   git push origin main
   ```

4. **Configure GitHub**
   - Go to repo Settings → Pages
   - Select source: Deploy from a branch
   - Select branch: `main`, folder: `/out`
   - Save

5. **Access**
   ```
   https://[username].github.io/[repo-name]
   ```

---

### 3. **Docker + Container Hosting**

**Best for:** Full control, scalable infrastructure

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package*.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

#### Build & Run

```bash
# Build image
docker build -t numerical-integration .

# Run locally
docker run -p 3000:3000 numerical-integration

# Push to registry (Docker Hub, ECR, etc.)
docker tag numerical-integration:latest [registry]/numerical-integration:latest
docker push [registry]/numerical-integration:latest
```

---

### 4. **Traditional Hosting (VPS/Server)**

**Best for:** Full control, custom setup

#### Setup

1. **Install Node.js on Server**

   ```bash
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone Repository**

   ```bash
   git clone https://github.com/Espy-Tech/eglise.git
   cd projet_fin_anne
   npm ci
   ```

3. **Build**

   ```bash
   npm run build
   ```

4. **Install Process Manager (PM2)**

   ```bash
   npm install -g pm2
   pm2 start npm --name "numerical-integration" -- start
   pm2 startup
   pm2 save
   ```

5. **Setup Nginx Reverse Proxy**

   ```nginx
   upstream nextjs_upstream {
     server 127.0.0.1:3000;
   }

   server {
     listen 80;
     server_name yourdomain.com;

     location / {
       proxy_pass http://nextjs_upstream;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

6. **Enable HTTPS (Let's Encrypt)**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Performance Optimization

### Before Deployment

```bash
# Run build
npm run build

# Check bundle size
npm run build -- --analyze

# Run tests
npm test

# Lint code
npm run lint
```

### Image Optimization

```bash
# Use Next.js Image Optimization
# Automatically optimizes in production
# Enables WebP format
# Responsive images
```

### Caching Strategy

- **Static Assets**: Cache forever (with hash)
- **HTML**: Cache briefly (5 minutes)
- **API Routes**: Based on content (30s - 1hr)

---

## Monitoring & Analytics

### Vercel Analytics

- Built-in to Vercel
- Real-time performance metrics
- Web Vitals tracking
- Error logging

### Sentry (Error Tracking)

```typescript
// Install
npm install @sentry/nextjs

// Configure
// pages/_app.tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Google Analytics

```typescript
// Add to pages/_document.tsx
<Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    `,
  }}
/>
```

---

## Environment Variables

### Development (.env.local)

```env
# Database
DATABASE_URL=

# Authentication
NEXTAUTH_SECRET=

# External Services
API_KEY=
```

### Production

Set in deployment platform:

- **Vercel**: Settings → Environment Variables
- **GitHub Pages**: Settings → Secrets
- **Server**: `/etc/environment` or `.env` file

---

## Continuous Integration/Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"

      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm test

      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## Rollback & Versioning

### Tag Release

```bash
# Create tag
git tag -a v1.0.0 -m "Release 1.0.0"

# Push tag
git push origin v1.0.0

# List tags
git tag -l
```

### Vercel Deployment History

- Vercel keeps deployment history
- Easy one-click rollback
- Previous versions accessible

---

## Security Checklist

- ✅ Environment variables not in repo
- ✅ Secrets in `.env.local` (not committed)
- ✅ HTTPS enabled
- ✅ Security headers configured
- ✅ CORS properly set
- ✅ Input validation on all forms
- ✅ SQL injection prevention (if applicable)
- ✅ XSS protection
- ✅ Dependencies updated
- ✅ Regular security audits

---

## Post-Deployment

### Verification

1. **Visit URL**
   - Check pages load
   - Verify navigation works
   - Test interactions

2. **Mobile Testing**
   - Test on mobile devices
   - Use Chrome DevTools responsive mode
   - Check touch interactions

3. **Performance**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Monitor load times

4. **SEO**
   - Check meta tags
   - Verify canonical URLs
   - Test Open Graph

### Monitoring

```bash
# Monitor uptime
# Use service like UptimeRobot, Pingdom

# Monitor errors
# Use Sentry, LogRocket

# Monitor analytics
# Use Google Analytics, Vercel Analytics
```

---

## Troubleshooting

### Build Failures

```bash
# Clear cache
rm -rf .next node_modules
npm ci

# Rebuild
npm run build

# Check logs
npm run build 2>&1 | tee build.log
```

### Slow Performance

1. Check bundle size: `npm run build -- --analyze`
2. Optimize images: Use `next/image`
3. Code split: Use `dynamic` imports
4. Monitor: Use DevTools Performance tab

### Deployment Issues

- Check Node version compatibility
- Verify environment variables
- Check build logs on deployment platform
- Verify repository permissions
- Check domain DNS settings

---

## Support & Resources

- 📚 [Next.js Deployment](https://nextjs.org/docs/deployment)
- 🔧 [Vercel Documentation](https://vercel.com/docs)
- 🐳 [Docker Documentation](https://docs.docker.com)
- 🔐 [Security Best Practices](https://owasp.org)

---

**Last Updated**: May 2026  
**Deployment Status**: Ready for Production
