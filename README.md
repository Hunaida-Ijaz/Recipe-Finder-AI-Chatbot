# Naida Bites — Recipe Finder

A recipe finder built with Vite + React + Tailwind CSS, powered by the free
[TheMealDB](https://www.themealdb.com/api.php) API (no API key/signup needed),
plus a curated local dataset for desi (Pakistani) classics that TheMealDB
doesn't cover well. Includes a rule-based chatbot ("Ask the Kitchen") for
finding or getting recipes conversationally.

## Theme
- **Colors:** Cream `#FFF8F0`, Sage Green `#A3B18A`, Olive `#6B8E23`, Dark Brown `#4E342E`, White
- **Fonts:** Playfair Display (logo), DM Serif Display (headings), Poppins (body), Caveat (handwritten section titles)
- **Decorations:** wooden-textured navbar, handwritten section titles, leaf icons/badges, vintage line-and-leaf dividers

## Features
- Sticky navbar with 4 working actions:
  - **Home** — resets to the default browse view
  - **Desi Corner** — loads the curated Pakistani recipe set directly (Chicken Karahi, Biryani, Nihari, Haleem, Seekh Kebab, and more)
  - **Favorites** — toggles a favorites-only view
  - **Ask the Kitchen** — opens the chatbot
- Search recipes by dish name
- Quick category filters (Chicken, Vegetarian, Dessert, Seafood, Breakfast, Pasta) + Desi Corner chip
- "Surprise me" random recipe button
- Full recipe detail view: ingredients, measurements, instructions, YouTube link (where available)
- Favorites saved to localStorage
- Fully responsive: mobile hamburger nav, 2/3/4-column recipe grid depending on screen size

## Desi Corner photos
Each desi dish uses a real photo hotlinked from Wikimedia Commons (via
`Special:FilePath`, so no API key or hashed URL lookup is needed), with a
themed illustrated placeholder as an automatic fallback (`onError` on the
`<img>`) if a photo ever fails to load.

## Chatbot accuracy
Earlier versions could misfire — e.g. typing "chicken biryani" would match
the generic "chicken" category and ignore "biryani" entirely. This version:
1. Checks desi dish names first (karahi, biryani, nihari, haleem, seekh
   kebab, chapli kebab, korma, pulao, keema, daal chawal) against a local
   dataset, since TheMealDB has almost no Pakistani coverage.
2. Only treats a message as "just a category" (e.g. "something vegetarian")
   when there's no other specific word in it — otherwise it tries a direct
   dish-name search first, so specific requests aren't swallowed by a
   generic category match.
3. Falls back to ingredient extraction, category, and cuisine filters in
   that order, and clearly says so if nothing matches, instead of guessing.

Try: "chicken karahi", "biryani", "nihari", "I have chicken and rice",
"something vegetarian", "show me Italian food", "surprise me".

## Run it locally
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
```
Output goes to `dist/`.

## Extending
- `src/data/desiRecipes.js` — add more curated dishes here (same shape as a
  TheMealDB "meal" object, so no other component needs to change).
- `src/utils/chatParser.js` — adjust the classification priority if you add
  new categories/cuisines.
- To swap in a real AI model (Claude/GPT) for smarter free-text
  understanding, replace `classifyMessage`/`buildReply` in `Chatbot.jsx` with
  an API call, keeping the existing `api.*` and `desiRecipes` functions to
  fetch the actual recipe data.
