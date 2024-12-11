import { useState } from 'react';
import { Playlist } from '../types/playlist';
import { generateM3UContent } from '../utils/playlistExporter';

export const usePlaylistExport = () => {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportAsM3U = async (playlist: Playlist) => {
    setExporting(true);
    setError(null);
    
    try {
      const content = generateM3UContent(playlist);
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${playlist.name}.m3u`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export playlist');
      throw err;
    } finally {
      setExporting(false);
    }
  };

  return {
    exporting,
    error,
    exportAsM3U,
  };
};