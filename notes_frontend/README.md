# Notes Frontend (Next.js)

A modern, minimalistic notes app UI built with Next.js App Router.
Features:
- User authentication UI (login/signup/logout) with mock logic
- Notes CRUD (create, edit, delete, pin), list and search
- Sidebar navigation with filters and new note action
- Header with global search and profile menu
- Responsive light theme with custom palette
- Prepared for future backend integration (API utilities using env)

## Getting Started

1) Install dependencies and start dev server
```bash
npm install
npm run dev
```

2) Environment variables
Copy the example and adjust as needed:
```bash
cp .env.example .env.local
```
- By default, the mock localStorage API is used (NEXT_PUBLIC_ENABLE_MOCK_API=true).
- To integrate a backend later, set NEXT_PUBLIC_API_BASE_URL to your API.

3) Open http://localhost:3000

## Structure

- src/components
  - layout: AppShell, Header, Sidebar
  - auth: AuthView
  - notes: NotesView, NoteEditor
- src/hooks
  - useAuth.tsx, useNotes.tsx (context providers)
- src/lib
  - api.ts (mock API layer with backend-ready placeholders)
- src/types
  - Shared types

## Theming

Colors:
- Primary: #4F46E5
- Secondary: #F59E42
- Accent: #10B981

Theme variables are defined in src/app/globals.css.

## Backend Integration

The API layer (src/lib/api.ts) is designed for easy replacement:
- Set NEXT_PUBLIC_API_BASE_URL in .env.local and switch USE_MOCK to false to call your server.
- Replace placeholder fetch calls with your endpoints.

## Notes

- All data is persisted in localStorage while using the mock API.
- The UI is fully responsive; the sidebar hides on smaller screens.

