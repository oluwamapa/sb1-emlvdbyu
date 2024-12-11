import { useState } from 'react';
import { usePlaylistStore } from '../store/playlistStore';
import { PlaylistService } from '../services/playlistService';
import { parseM3U } from '../utils/m3uParser';

export const usePlaylistImport = () => {
  const { addPlaylist, setActivePlaylist } = usePlaylistStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importFromFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const content = await file.text();
      const groups = parseM3U(content);
      
      const newPlaylist = {
        id: crypto.randomUUID(),
        name: file.name.replace(/\.[^/.]+$/, ''),
        groups,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      addPlaylist(newPlaylist);
      setActivePlaylist(newPlaylist);
    } catch (err) {
      setError('Failed to import playlist file');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const importFromUrl = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const playlist = await PlaylistService.importFromUrl(url);
      addPlaylist(playlist);
      setActivePlaylist(playlist);
    } catch (err) {
      setError('Failed to import playlist from URL');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    importFromFile,
    importFromUrl,
    isLoading,
    error,
  };
};