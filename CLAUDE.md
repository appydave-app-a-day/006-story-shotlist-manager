# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Story Shotlist Manager (project 006), an AI Image Asset Manager for managing video projects with a hierarchical structure: Video → Chapters → Scenes → Prompts.

## Key Requirements

The application manages a four-level hierarchy:
- **Video**: The full creative project
- **Chapter**: Logical grouping of scenes
- **Scene**: Visual shot within a chapter  
- **Prompt**: Image generation request for a scene

Core features include:
- JSON import/export for project data
- CSV export for prompt injection workflows
- A/B image comparison for each prompt
- Persistent "Load Sample" button and JSON paste area

## Data Structure

The application works with this JSON structure:
```json
{
  "video": {
    "title": "string",
    "chapters": [{
      "chapter_title": "string",
      "scenes": [{
        "scene_number": "number",
        "prompts": [{
          "prompt_text": "string",
          "image_a": { "path": "string", "approved": "boolean" },
          "image_b": { "path": "string", "approved": "boolean" }
        }]
      }]
    }]
  }
}
```

## Development Commands

This project uses pnpm as the package manager:

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

## Implementation Guidelines

1. **UI Structure**: Implement a hierarchical tree view that mirrors the Video → Chapter → Scene → Prompt structure
2. **State Management**: Consider using React Context or Zustand for managing the nested data structure
3. **File Organization**: 
   - `/src/components/` - UI components for each hierarchy level
   - `/src/types/` - TypeScript interfaces matching the JSON structure
   - `/src/utils/` - JSON/CSV import/export utilities
4. **CSV Export**: Flatten the nested structure to: `a,category,filename,prompt,style,size,seed,n`

## Technology Stack Recommendations

- React with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- React DnD or similar for drag-and-drop reordering
- LocalStorage for persistence