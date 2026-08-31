import { useMemo, useState } from 'react'
import songs from './data/songs.js'
import { useLocalStorage } from './useLocalStorage.js'
import Sidebar from './components/Sidebar.jsx'
import TrackList from './components/TrackList.jsx'
import './App.css'

let playlistCounter = 1

export default function App() {
  const [playlists, setPlaylists] = useLocalStorage('pm-playlists', [])
  const [favorites, setFavorites] = useLocalStorage('pm-favorites', [])
  const [view, setView] = useState({ type: 'library' })
  const [search, setSearch] = useState('')
  const [openMenuId, setOpenMenuId] = useState(null)

  const toggleFavorite = (songId) => {
    setFavorites((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId],
    )
  }

  const createPlaylist = (name) => {
    const id = `pl-${Date.now()}-${playlistCounter++}`
    setPlaylists((prev) => [...prev, { id, name, songIds: [] }])
    setView({ type: 'playlist', playlistId: id })
  }

  const deletePlaylist = (playlistId) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId))
    if (view.type === 'playlist' && view.playlistId === playlistId) {
      setView({ type: 'library' })
    }
  }

  const toggleInPlaylist = (playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((p) => {
        if (p.id !== playlistId) return p
        const included = p.songIds.includes(songId)
        return {
          ...p,
          songIds: included ? p.songIds.filter((id) => id !== songId) : [...p.songIds, songId],
        }
      }),
    )
  }

  const removeFromPlaylist = (songId) => {
    if (view.type !== 'playlist') return
    toggleInPlaylist(view.playlistId, songId)
  }

  const activePlaylist =
    view.type === 'playlist' ? playlists.find((p) => p.id === view.playlistId) : null

  const baseSongs = useMemo(() => {
    if (view.type === 'favorites') {
      return songs.filter((s) => favorites.includes(s.id))
    }
    if (view.type === 'playlist' && activePlaylist) {
      return activePlaylist.songIds
        .map((id) => songs.find((s) => s.id === id))
        .filter(Boolean)
    }
    return songs
  }, [view, favorites, activePlaylist])

  const visibleSongs = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return baseSongs
    return baseSongs.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.artist.toLowerCase().includes(query) ||
        s.album.toLowerCase().includes(query),
    )
  }, [baseSongs, search])

  const heading =
    view.type === 'library'
      ? 'Library'
      : view.type === 'favorites'
      ? 'Favorites'
      : activePlaylist?.name ?? 'Playlist'

  const subheading =
    view.type === 'library'
      ? `${songs.length} tracks`
      : view.type === 'favorites'
      ? `${favorites.length} favorited`
      : `${activePlaylist?.songIds.length ?? 0} tracks`

  const emptyMessage =
    view.type === 'favorites'
      ? 'No favorites yet — tap the heart on any track to add one.'
      : view.type === 'playlist'
      ? 'This playlist is empty. Add tracks from the Library.'
      : 'No tracks match your search.'

  return (
    <div className="app" onClick={() => openMenuId && setOpenMenuId(null)}>
      <Sidebar
        view={view}
        onSelectView={(v) => {
          setView(v)
          setSearch('')
        }}
        playlists={playlists}
        onCreatePlaylist={createPlaylist}
        onDeletePlaylist={deletePlaylist}
      />

      <main className="main-panel">
        <header className="main-header">
          <div>
            <h1>{heading}</h1>
            <p className="subheading">{subheading}</p>
          </div>
          <div className="search-wrap">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, artist, or album"
              aria-label="Search songs"
            />
          </div>
        </header>

        <TrackList
          songs={visibleSongs}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          playlists={playlists}
          onToggleInPlaylist={(playlistId, songId) => {
            toggleInPlaylist(playlistId, songId)
          }}
          openMenuId={openMenuId}
          onToggleMenu={(songId) =>
            setOpenMenuId((prev) => (prev === songId ? null : songId))
          }
          showRemoveFromPlaylist={view.type === 'playlist'}
          onRemoveFromPlaylist={removeFromPlaylist}
          emptyMessage={emptyMessage}
        />
      </main>
    </div>
  )
}
