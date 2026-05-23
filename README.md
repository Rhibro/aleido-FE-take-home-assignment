# Frontend take-home: React webshop

Build a small webshop experience with **React** and **Vite** using the
[DummyJSON products API](https://dummyjson.com/docs/products).

## The task

Create a small product experience that includes:

1. a **start page**
2. a **search page**
3. a **product page**
4. a simple **cart** where a user can add a product

## Expectations

- Use this repository as your starting point.
- React, Vite, and TypeScript are included in the starter setup.
- `react-router` is installed, with a single `/` route already wired up.
- No additional styling, component, or data packages are included by default.
- Use the DummyJSON products API as your data source.
- Make your own choices for routing, state management, styling, and structure.
- Focus on clear fundamentals, sound engineering decisions, and reasonable tradeoffs over feature volume.

## What matters most

- How you approach the problem and break it down.
- How you justify the packages, patterns, and abstractions you choose.
- How you communicate tradeoffs, assumptions, and next steps.
- How you balance simplicity, readability, and product thinking.

This is meant to create a good follow-up conversation, not to optimize for a perfectly finished solution.

## Timebox

Aim to spend around **2-4 hours** on this assignment. With solid package choices
and AI assistance, that should be enough to show your approach. A well-reasoned,
incomplete solution is better than an overbuilt one.

## Submission

- Keep your commit history.
- Update this README with any setup instructions that differ from the default.
- Add a short note describing your main technical decisions, tradeoffs, and what you would do next with more time.
- If you used AI tools, briefly describe how you used them.

## Getting started

```bash
npm install
npm run dev
```

No setup beyond the defaults. TypeScript and lint checks:

```bash
npm run tsc
npm run lint
```

---

## Technical decisions

### Styling — Tailwind CSS v4

Tailwind keeps styles co-located with components, which suits a project of this size well. There's no context-switching between files, and utility classes make responsive layouts quick to write. I used the `@tailwindcss/vite` plugin (v4's recommended integration) rather than a PostCSS config — one less config file.

The CSS file also defines CSS custom properties for the brand colours from the template (`--brand-identity-green`, etc.), which Tailwind v4 can consume directly. That gives a natural place to add design tokens if the project grew.

### State management — Zustand

Cart state is the only global state in this app, so I wanted something with minimal boilerplate. Zustand fits: one `create()` call, no providers, no reducers. The store exposes named actions (`addItem`, `removeItem`, `updateQuantity`, `clearCart`) and computed getters (`getTotal`, `getItemCount`) — the component just calls what it needs.

I considered React Context, which would work fine at this scale. Zustand wins on one point: if the cart needs to be accessed from many places (navbar badge, cart page, product page), Context requires a provider high in the tree and re-renders everything that consumes it on every change. Zustand subscriptions are per-selector, so only the component that reads `getItemCount` re-renders when the count changes.

### Data fetching — plain `useEffect`

I didn't reach for React Query. The data requirements are simple: fetch on mount, show a loading state, show an error state. Adding a library for three fetch calls would be over-engineering. The tradeoff is no automatic caching or background refetching — navigating back to the home page will re-fetch. For a real product I'd add React Query, but here it would obscure more than it helps.

### Routing — React Router v7 (nested routes)

`App.tsx` is the layout route — it renders the `<Navbar>` and an `<Outlet>` for child routes. This means the navbar is mounted once and stays stable across navigation, rather than re-mounting on every page. The four pages (`/`, `/search`, `/products/:id`, `/cart`) are children of that layout.

### Pagination

The home page fetches 12 products at a time using DummyJSON's `limit` and `skip` parameters. The API response includes a `total` count, which is used to calculate the total number of pages (`Math.ceil(total / limit)`). A windowed page number component shows up to 7 buttons at a time with ellipses for large page counts, so the controls stay compact regardless of how many pages there are. The page scrolls to the top on each navigation.

### Cart persistence — Zustand `persist` middleware

Cart state is persisted to `localStorage` via Zustand's built-in `persist` middleware. Only the `items` array is serialised (not the action functions), using the `partialize` option. On page load, Zustand reads the stored items back automatically — no extra code in components needed.

### Type sharing

`Product` is defined once in `src/lib/api.ts` and imported wherever it's needed, including the cart store. Early in development there were two separate definitions (one in the store, one in the API layer); I consolidated them so there's a single source of truth. This matters when the API shape changes — you update one interface, not two.

---

## Tradeoffs and known gaps

**Checkout is a placeholder.** The "Proceed to Checkout" button renders but doesn't navigate anywhere. A real next step would be a confirmation modal or a `/checkout` route — I left it as a button rather than removing it because it communicates intent in the UI.

**No image fallback.** If a product image 404s, the browser renders a broken image icon. An `onError` handler on the `<img>` tag could swap in a placeholder.

---

## What I'd do with more time

1. **Image error fallbacks** — `onError` swap to a grey placeholder
2. **Checkout flow** — even a simple order summary modal would complete the user journey

---

## AI usage

I used Claude Code (Anthropic's CLI) throughout this project. Concretely:

- **Scaffolding** — I described the four pages and the cart requirements; Claude generated the initial file structure, store, and API utility layer. I reviewed each file before moving on.
- **Iteration** — I asked follow-up questions about specific decisions (e.g. why Zustand over Context, whether the debounce logic was correct) and used the answers to inform or revise the implementation.
- **Code review** — Claude flagged that `Product` was defined twice and explained the consolidation. It also caught that the ESLint config was missing the TypeScript parser, which it fixed.
- **What I didn't delegate** — architectural decisions (which packages to use, what to leave out, how to structure routing) were mine. I used AI to move faster on implementation, not to make product or engineering judgment calls.

The honest summary: AI handled the mechanical parts quickly so I could spend time reasoning about structure and tradeoffs rather than syntax.
