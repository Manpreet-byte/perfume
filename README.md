# Golden River Perfume

Premium luxury fragrance landing page built with React and Vite.

## Run locally

```bash
npm install
npm run dev
```

### Run assistant server (local dev)

To run the assistant server that the chat UI calls:

1. Install server deps (if not already):

```bash
npm install express node-fetch dotenv
```

2. Copy `.env.example` to `.env` and add `OPENAI_API_KEY` if you have one.

3. Start the assistant server:

```bash
npm run serve:assistant
```

4. Start the frontend in a separate terminal:

```bash
npm run dev
```

The Vite dev server proxies `/api` to `http://localhost:3001` during development.

## Build

```bash
npm run build
```

## Notes

- Uses HTML, CSS, and JavaScript only.
- Includes a sticky navbar, smooth scrolling, subtle reveal animations, responsive layouts, and local SVG artwork.
- Fonts are loaded from Google Fonts: Playfair Display and Poppins.

## New features added

- Four separate pages: Home, About, Products, Contact (client-side routing via hash).
- AI-generated content placeholders (see `src/data/aiContent.js`).
- Designer product entries with demo images in `public/images`.
- Simple chatbot component and voice avatar (demo TTS using Web Speech API).
- Contact form uses `mailto:` fallback; can be connected to an email API.

## Notes on images

- Product images in `public/images` are placeholders; replace with high-resolution licensed images for production.
