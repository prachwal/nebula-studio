# API Reference

## Component Interfaces

### Core Application

#### App Component
```tsx
export function App(): JSX.Element
```
Main application component that renders the root UI structure.

**Usage:**
```tsx
import { App } from './app'
// Rendered in main.tsx
```

#### Main Entry Point
```tsx
render(<App />, document.getElementById('app')!)
```
Application bootstrap that mounts the App component to DOM.

## Development APIs

### Vite Configuration
```typescript
interface ViteConfig {
  plugins: Plugin[]
  build: BuildOptions
  server: ServerOptions
}
```

**Key Configuration:**
- `@preact/preset-vite` for Preact optimization
- TypeScript compilation settings
- Development server configuration

### TypeScript Configuration

#### App Config (`tsconfig.app.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## Asset Management

### Static Assets
```typescript
// Import static assets
import logo from './assets/preact.svg'
import './app.css'
```

### CSS Integration
- Global styles in `app.css` and `index.css`
- Component-scoped styles supported
- CSS modules available via `.module.css` extension

## Build System APIs

### Available Scripts
- `dev`: Development server with HMR
- `build`: Production build with optimization
- `preview`: Local preview of production build

### Environment Variables
```typescript
// Access environment variables
const apiUrl = import.meta.env.VITE_API_URL
```

**Prefix Requirement:** All client-side environment variables must start with `VITE_`
