# Notes Frontend (Vue 3 + Vite)

A minimal, responsive notes application built with Vue 3, Pinia, and Vite.

Features:
- View list of notes (sidebar)
- Create new notes
- Edit existing notes (title and content)
- Delete notes
- Search notes
- Local persistence via localStorage
- Modern, minimalistic light theme with responsive layout

Tech:
- Vue 3 + Vite
- Pinia for state management
- TypeScript, Composition API

Design:
- Colors:
  - primary: #42b983
  - secondary: #35495e
  - accent: #ffcc00
- Layout: Top navigation, left sidebar, main editor pane
- Responsive: Sidebar hides on narrow screens; the editor remains accessible.

Getting Started:
- npm install
- npm run dev

Build:
- npm run build

Lint/Type Check:
- npm run lint
- npm run type-check

Notes:
- Data is stored in localStorage under key: `notes_app__notes_v1`.
- PUBLIC_INTERFACE tags precede public functions for discoverability.
