import { useState } from 'react'

export default function Sidebar({ view, onSelectView, playlists, onCreatePlaylist, onDeletePlaylist }) {
  const [draftName, setDraftName] = useState('')

  const handleCreate = (e) => {
    e.preventDefault()
    const name = draftName.trim()
    if (!name) return
    onCreatePlaylist(name)
    setDraftName('')
  }

  return (
    <aside className="sidebar">
      <div className="wordmark">
        <span>Playlist</span>
        <span>Manager</span>
      </div>

      <nav className="nav-group">
        <button
          className={`nav-item ${view.type === 'library' ? 'is-active' : ''}`}
          onClick={() => onSelectView({ type: 'library' })}
        >
          Library
        </button>
        <button
          className={`nav-item ${view.type === 'favorites' ? 'is-active' : ''}`}
          onClick={() => onSelectView({ type: 'favorites' })}
        >
          Favorites
        </button>
      </nav>

      <div className="sidebar-divider" />

      <div className="playlists-section">
        <p className="section-label">Playlists</p>

        {playlists.length === 0 && (
          <p className="empty-hint">No playlists yet. Make one below.</p>
        )}

        <ul className="playlist-list">
          {playlists.map((p) => (
            <li key={p.id}>
              <button
                className={`nav-item playlist-item ${
                  view.type === 'playlist' && view.playlistId === p.id ? 'is-active' : ''
                }`}
                onClick={() => onSelectView({ type: 'playlist', playlistId: p.id })}
              >
                <span className="playlist-name">{p.name}</span>
                <span className="playlist-count">{p.songIds.length}</span>
              </button>
              <button
                className="playlist-delete"
                aria-label={`Delete playlist ${p.name}`}
                title="Delete playlist"
                onClick={() => onDeletePlaylist(p.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <form className="new-playlist-form" onSubmit={handleCreate}>
          <input
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            placeholder="New playlist name"
            aria-label="New playlist name"
          />
          <button type="submit" disabled={!draftName.trim()}>
            Create
          </button>
        </form>
      </div>
    </aside>
  )
}
