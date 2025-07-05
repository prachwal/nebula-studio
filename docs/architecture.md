# Architecture Overview

## System Design

Nebula Studio follows a modern frontend architecture built on Preact and Vite for optimal performance and developer experience.

### Core Architecture

```
Application Layer
├── main.tsx          # Application bootstrap
├── app.tsx           # Root component
└── components/       # Reusable UI components

Build Layer
├── vite.config.ts    # Build configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Dependencies and scripts
```

### Component Hierarchy

```
App (Root)
├── UI Components
├── Business Logic
└── Asset Management
```

### Technology Decisions

**Preact over React**
- Smaller bundle size (3KB vs 45KB)
- Same API compatibility
- Better performance for small to medium applications

**Vite Build System**
- Lightning-fast development server
- Hot module replacement
- Optimized production builds
- Native ES modules support

**TypeScript Integration**
- Type safety across codebase
- Enhanced developer experience
- Better refactoring capabilities
- Compile-time error detection

### Data Flow

1. **Entry Point**: `main.tsx` initializes application
2. **Root Component**: `app.tsx` manages global state
3. **Component Tree**: Hierarchical component structure
4. **Asset Loading**: Vite handles static asset optimization

### Performance Considerations

- Preact's minimal runtime overhead
- Vite's optimized bundling
- Tree shaking for unused code elimination
- Asset optimization and compression

### Development Workflow

- Fast refresh for instant updates
- TypeScript compilation
- Hot module replacement
- Source map generation for debugging
