# AI Usage Disclosure

## Was Artificial Intelligence Used?

Yes, artificial intelligence tools were used during development as a productivity assistant.

The AI was primarily used to:

- speed up repetitive coding tasks
- assist with component structuring
- improve code organization
- review TypeScript typing
- generate documentation drafts

All generated code was manually reviewed and adjusted before being integrated into the project.

---

# What AI Helped With

AI assistance was used for:

## Component Refactoring

AI helped suggest a cleaner project structure and separation of responsibilities.

---

## TypeScript Typings

AI assisted with:

- prop typing
- reusable component interfaces
- state organization suggestions

---

## README Drafting

AI helped generate an initial documentation structure, including:

- installation steps
- implemented features
- known issues
- future improvements

---

## UI/UX Suggestions

AI suggested improvements such as:

- message box separation
- page-level component organization

---

# What Was Manually Reviewed or Changed

The following parts were manually reviewed and adjusted:

- component props
- pagination logic
- compare/favorites behavior
- localStorage synchronization
- conditional rendering
- UI structure and styling integration

Several generated code fragments were simplified or rewritten to better fit the project architecture and improve readability.

---

# Example of an AI Suggestion That Was Rejected or Corrected

One AI suggestion proposed moving nearly all application logic into custom hooks immediately.

This approach was rejected because:

- it would overcomplicate the current project size
- it reduced readability for a small test task
- it introduced unnecessary abstraction too early

Instead, the application was only partially refactored into reusable components while keeping state management centralized inside `App.tsx`.

Another correction involved pagination handling:
the initial version duplicated pagination logic in multiple places, which was manually refactored into reusable pagination components.