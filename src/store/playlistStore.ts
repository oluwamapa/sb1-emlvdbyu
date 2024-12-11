import { create } from 'zustand';
import { Channel, Playlist, PlaylistGroup } from '../types/playlist';

interface PlaylistState {
  playlists: Playlist[];
  activePlaylist: Playlist | null;
  setActivePlaylist: (playlist: Playlist) => void;
  addPlaylist: (playlist: Playlist) => void;
  updateChannel: (playlistId: string, groupId: string, channel: Channel) => void;
  removeChannel: (playlistId: string, groupId: string, channelId: string) => void;
  reorderChannel: (playlistId: string, sourceGroup: string, destinationGroup: string, sourceIndex: number, destinationIndex: number) => void;
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlists: [],
  activePlaylist: null,
  setActivePlaylist: (playlist) => set({ activePlaylist: playlist }),
  addPlaylist: (playlist) => set((state) => ({ playlists: [...state.playlists, playlist] })),
  updateChannel: (playlistId, groupId, channel) =>
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              groups: playlist.groups.map((group) =>
                group.id === groupId
                  ? {
                      ...group,
                      channels: group.channels.map((ch) =>
                        ch.id === channel.id ? channel : ch
                      ),
                    }
                  : group
              ),
            }
          : playlist
      ),
    })),
  removeChannel: (playlistId, groupId, channelId) =>
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              groups: playlist.groups.map((group) =>
                group.id === groupId
                  ? {
                      ...group,
                      channels: group.channels.filter((ch) => ch.id !== channelId),
                    }
                  : group
              ),
            }
          : playlist
      ),
    })),
  reorderChannel: (playlistId, sourceGroup, destinationGroup, sourceIndex, destinationIndex) =>
    set((state) => {
      const playlist = state.playlists.find((p) => p.id === playlistId);
      if (!playlist) return state;

      const newGroups = [...playlist.groups];
      const sourceGroupIndex = newGroups.findIndex((g) => g.id === sourceGroup);
      const destGroupIndex = newGroups.findIndex((g) => g.id === destinationGroup);

      const [removed] = newGroups[sourceGroupIndex].channels.splice(sourceIndex, 1);
      newGroups[destGroupIndex].channels.splice(destinationIndex, 0, removed);

      return {
        playlists: state.playlists.map((p) =>
          p.id === playlistId ? { ...p, groups: newGroups } : p
        ),
      };
    }),
}));