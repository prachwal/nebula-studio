# Deployment Guide

## Build Process

### Development Build
```bash
npm run dev
```
- Starts development server at `http://localhost:5173`
- Enables hot module replacement
- Source maps for debugging
- Fast compilation with Vite

### Production Build
```bash
npm run build
```
- Compiles TypeScript to JavaScript
- Optimizes and minifies assets
- Generates `dist/` folder with production files
- Tree shaking removes unused code

### Preview Production Build
```bash
npm run preview
```
- Serves production build locally
- Tests optimized bundle before deployment
- Validates build integrity

## Deployment Options

### Static Hosting (Recommended)
**Compatible Platforms:**
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

**Deployment Steps:**
1. Run `npm run build`
2. Upload `dist/` folder contents
3. Configure serving for SPA routing (if applicable)

### Docker Deployment
```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
```

### CDN Configuration
- Enable gzip compression
- Set cache headers for static assets
- Configure HTTPS/SSL certificates

## Environment Configuration

### Build Variables
- `NODE_ENV=production` for optimized builds
- Custom environment variables via `.env` files
- Vite prefix: `VITE_` for client-side variables

### Asset Optimization
- Automatic image optimization
- CSS minification and extraction
- JavaScript bundling and compression
- Hash-based filename for cache busting

## Performance Optimization

### Bundle Analysis
```bash
npm run build -- --mode analyze
```

### Optimization Features
- Code splitting for dynamic imports
- Asset preloading and prefetching
- Service worker integration (if needed)
- Progressive web app capabilities
