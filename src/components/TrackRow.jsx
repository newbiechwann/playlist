import Equalizer from './Equalizer.jsx'

export default function TrackRow({
  song,
  index,
  isFavorite,
  onToggleFavorite,
  playlists,
  onToggleInPlaylist,
  isMenuOpen,
  onToggleMenu,
  showRemoveFromPlaylist,
  onRemoveFromPlaylist,
}) {
  return (
    <div className={`track-row ${isFavorite ? 'is-favorite' : ''}`}>
      <span className="track-index">
        {isFavorite ? <Equalizer /> : String(index + 1).padStart(2, '0')}
      </span>

      <div className="track-info">
        <p className="track-title">{song.title}</p>
        <p className="track-artist">{song.artist}</p>
      </div>

      <span className="track-album">{song.album}</span>
      <span className="track-duration">{song.duration}</span>

      <button
        className={`icon-button favorite-button ${isFavorite ? 'is-active' : ''}`}
        onClick={() => onToggleFavorite(song.id)}
        aria-label={isFavorite ? `Unfavorite ${song.title}` : `Favorite ${song.title}`}
        title={isFavorite ? 'Unfavorite' : 'Favorite'}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      {showRemoveFromPlaylist ? (
        <button
          className="icon-button remove-button"
          onClick={() => onRemoveFromPlaylist(song.id)}
          aria-label={`Remove ${song.title} from this playlist`}
          title="Remove from playlist"
        >
          −
        </button>
      ) : (
        <div className="add-menu-wrap" onClick={(e) => e.stopPropagation()}>
          <button
            className="icon-button add-button"
            onClick={() => onToggleMenu(song.id)}
            aria-label={`Add ${song.title} to a playlist`}
            title="Add to playlist"
            aria-expanded={isMenuOpen}
          >
            +
          </button>
          {isMenuOpen && (
            <div className="add-menu">
              {playlists.length === 0 ? (
                <p className="add-menu-empty">Create a playlist first</p>
              ) : (
                playlists.map((p) => {
                  const included = p.songIds.includes(song.id)
                  return (
                    <label key={p.id} className="add-menu-option">
                      <input
                        type="checkbox"
                        checked={included}
                        onChange={() => onToggleInPlaylist(p.id, song.id)}
                      />
                      {p.name}
                    </label>
                  )
                })
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
