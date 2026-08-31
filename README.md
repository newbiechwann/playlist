# Playlist Manager

A frontend-only playlist manager built with React + Vite. No backend — everything
lives in the browser (playlists and favorites persist via `localStorage`).

## Features

- **Library** — browse the full song catalog
- **Search** — filter by title, artist, or album, scoped to whatever view you're in
- **Favorites** — heart any track to add it to your Favorites view
- **Playlists** — create playlists, add tracks to one or more of them from the `+` menu,
  and remove tracks while viewing a playlist
- Delete a playlist from the sidebar

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/songs.js         static mock song catalog
  useLocalStorage.js     small hook for persisting state
  components/
    Sidebar.jsx          library/favorites nav + playlist CRUD
    TrackList.jsx        renders the current view's tracks
    TrackRow.jsx         one track row (favorite, add/remove controls)
    Equalizer.jsx        small animated icon shown next to favorited tracks
  App.jsx                app state and view logic
  App.css / index.css    styling
```
