# Product Catalog App

A modern React + TypeScript product catalog application with filtering, favorites, comparison system, pagination, and localStorage persistence.

---

# Installation & Run

## 1. Clone repository

```bash
git clone https://github.com/beaterius/product_catalog
```

## 2. Open project folder

```bash
cd product_catalog
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start development server

```bash
npm run dev
```

or

```bash
npm start
```

(depending on the package manager / setup)

## 5. Build production version

```bash
npm run build
```

---

# Implemented Features

## Product Catalog

- Product list fetched from external API
- Responsive product grid
- Product cards with:
    - image
    - title
    - brand
    - price
    - rating
    - stock status
    - discount information

---

## Search & Filters

Implemented:

- Search by:
    - product title
    - brand
    - category

- Category filtering
- In-stock filter
- Discount-only filter

---

## Sorting

Implemented sorting by:

- Price ascending
- Price descending
- Rating descending
- Title alphabetically

---

## Favorites System

- Add/remove products from favorites
- Favorites stored in `localStorage`
- Separate Favorites page
- Independent pagination for favorites

---

## Product Comparison

- Compare up to 3 products
- Side-by-side comparison table
- Validation preventing more than 3 compared items
- Error notification system

---

## Pagination

Implemented:

- Main catalog pagination
- Favorites pagination
- Adjustable items per page

---

## UI / UX

Implemented:

- Tab navigation
- Animated message box
- Page transitions
- Clean component structure
- Reusable pagination components

---

## Refactoring

Application was refactored into smaller reusable components:

- Layout components
- Page components
- Pagination components

This improved:

- readability
- maintainability
- scalability

---

# What Was Not Implemented

The following features were not implemented due to time limitations:

- Backend integration
- Authentication / user accounts
- Server-side favorites synchronization
- Unit tests
- E2E tests
- Advanced state management (Redux / Zustand)
- Product details page

---

# Known Issues

- Pagination resets after changing filters
    - This behavior is intentional but may feel unexpected.

- LocalStorage data may persist outdated IDs if API data changes.

- Compare table layout may become crowded on very small screens.

---

# Future Improvements

Given more time, I would improve the project by adding:

## Architecture

- Custom hooks:
    - `useProducts`
    - `usePagination`
    - `useLocalStorage`
    - Context API or Zustand for global state management

---

## Performance

- React.memo optimizations
- Lazy loading
- Virtualized product lists

---

## Features

- Product details page
- Product reviews
- Wishlist synchronization

---

# Technologies Used

- React
- TypeScript
- CSS
- Fetch API
- LocalStorage

---

# Project Structure

```
📁 src
│  📁 components
│  │  📁 layout
│  │  │  ⚛️ Header.tsx
│  │  │  ⚛️ MessageBox.tsx
│  │  │  ⚛️ NavigationTabs.tsx
│  │  📁 pages
│  │  │  ⚛️ ComparePage.tsx
│  │  │  ⚛️ FavoritesPage.tsx
│  │  │  ⚛️ MainPage.tsx
│  │  📁 pagination
│  │  │  ⚛️ ItemsPerPageSelect.tsx
│  │  │  ⚛️ Pagination.tsx
│  │  ⚛️ CompareTable.tsx
│  │  ⚛️ FavoritesSection.tsx
│  │  ⚛️ Filters.tsx
│  │  ⚛️ ProductCard.tsx
│  │  ⚛️ ProductGrid.tsx
│  │  ⚛️ SearchBar.tsx
│  📁 constants
│  │  📘 api.ts
│  📁 hooks
│  │  📘 useProducts.ts
│  │  📘 useUserLists.ts
│  📁 services
│  │  📘 fetchProducts.ts
│  📁 styles
│  │  🎨 global.css
│  📁 types
│  │  📘 product.ts
│  🎨 App.css
│  ⚛️ App.tsx
│  🎨 index.css
│  ⚛️ main.tsx
📘 vite.config.ts
```

---

# Author beaterius
