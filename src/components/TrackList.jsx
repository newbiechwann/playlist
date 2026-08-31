import TrackRow from './TrackRow.jsx'

export default function TrackList({
  songs,
  favorites,
  onToggleFavorite,
  playlists,
  onToggleInPlaylist,
  openMenuId,
  onToggleMenu,
  showRemoveFromPlaylist,
  onRemoveFromPlaylist,
  emptyMessage,
}) {
  if (songs.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>
  }

  return (
    <div className="track-list">
      <div className="track-row track-row-header" aria-hidden="true">
        <span className="track-index">#</span>
        <span className="track-info">Title</span>
        <span className="track-album">Album</span>
        <span className="track-duration">Time</span>
        <span></span>
        <span></span>
      </div>
      {songs.map((song, index) => (
        <TrackRow
          key={song.id}
          song={song}
          index={index}
          isFavorite={favorites.includes(song.id)}
          onToggleFavorite={onToggleFavorite}
          playlists={playlists}
          onToggleInPlaylist={onToggleInPlaylist}
          isMenuOpen={openMenuId === song.id}
          onToggleMenu={onToggleMenu}
          showRemoveFromPlaylist={showRemoveFromPlaylist}
          onRemoveFromPlaylist={onRemoveFromPlaylist}
        />
      ))}
    </div>
  )
}
