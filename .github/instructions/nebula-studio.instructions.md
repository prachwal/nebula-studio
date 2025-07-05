---
applyTo: '**'
---
Coding standards, domain knowledge, and preferences that AI should follow.

## Documentation Management
Before creating new documentation files, always:
1. Check existing documentation structure in the project
2. Update existing files instead of creating duplicates
3. Maintain single source of truth for project information
4. Consolidate overlapping content rather than fragmenting it across multiple files

## Optimal Documentation Structure
Keep files under 150 lines (3 read operations max) to prevent data corruption:

### Core Files (max 100 lines each):
- `README.md` - Project overview, quick start, basic usage
- `CONTRIBUTING.md` - Development setup, workflow, standards
- `CHANGELOG.md` - Version history, breaking changes

### Feature Documentation (max 150 lines each):
- `docs/api.md` - API reference and examples
- `docs/architecture.md` - System design and components
- `docs/deployment.md` - Installation and configuration

### Split large content into:
- Multiple focused files rather than single comprehensive documents
- Linked sections with cross-references
- Modular components that can be edited independently

**File Size Rule**: If content exceeds 150 lines, split into separate focused files.

## Documentation Dispatcher Pattern
Always start with single entry point file that serves as documentation dispatcher:

### Primary Entry Point:
- `README.md` - Main dispatcher with precise file descriptions and links
- Contains project overview + navigation to specialized documentation
- Lists all documentation files with exact content descriptions

### Subfolder Structure (when needed):
```
docs/
├── index.md          # Table of contents with precise file descriptions
├── development/      # Development-specific documentation
├── user-guide/       # User-facing documentation
└── reference/        # Technical reference materials
```

### Content Organization Rules:
1. Start documentation work from single dispatcher file
2. Create subfolders only when dispatcher exceeds size limits
3. Each subfolder must have index.md with precise content descriptions
4. Link descriptions must specify exact file contents and scope

## Core Project Aspects
Essential documentation areas for any project:

### Technical Foundation:
- Setup and installation procedures
- Development environment configuration
- Build and deployment processes

### Code Organization:
- Architecture and design patterns
- API interfaces and contracts
- Component responsibilities

### Workflow Management:
- Development workflow and standards
- Testing and quality assurance
- Version control and release process

### User Interface:
- Usage instructions and examples
- Configuration options
- Troubleshooting guides