# Contributing to Nebula Studio

## Development Setup

### Prerequisites
- Node.js (Latest LTS recommended)
- npm package manager

### Installation
```bash
git clone <repository-url>
cd nebula-studio
npm install
```

### Development Workflow
```bash
npm run dev          # Start development server at http://localhost:5173
npm run build        # Create production build
npm run preview      # Preview production build locally
```

## Code Standards

### File Organization
- Components in `src/` directory
- Assets in `src/assets/`
- Styles co-located with components or in `src/app.css`

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for component props
- Prefer type inference where possible

### Component Structure
```tsx
interface ComponentProps {
  // Define props here
}

export function Component({ ...props }: ComponentProps) {
  // Component implementation
}
```

### Styling Approach
- CSS modules or inline styles
- Responsive design principles
- Modern CSS features (Grid, Flexbox)

## Development Tools

### Vite Configuration
- Hot module replacement enabled
- TypeScript support configured
- Preact preset for optimal bundling

### Code Quality
- TypeScript compiler for type checking
- ESLint configuration (add if needed)
- Prettier formatting (add if needed)

## Build Process

### Development Build
- Fast compilation with Vite
- Source maps enabled
- Hot reload functionality

### Production Build
- Optimized bundle size
- Tree shaking enabled
- Asset optimization
