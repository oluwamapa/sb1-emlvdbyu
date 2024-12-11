import axios from 'axios';
import { Playlist } from '../types/playlist';
import { parseM3U } from '../utils/m3uParser';

export class PlaylistService {
  static async importFromUrl(url: string): Promise<Playlist> {
    try {
      const response = await axios.get(url);
      const groups = parseM3U(response.data);
      
      return {
        id: crypto.randomUUID(),
        name: url.split('/').pop()?.split('?')[0] || 'Imported Playlist',
        groups,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      throw new Error('Failed to import playlist from URL');
    }
  }

  static async validateStreamUrl(url: string): Promise<boolean> {
    try {
      const response = await axios.head(url);
      return response.status === 200;
    } catch {
      return false;
    }
  }
}