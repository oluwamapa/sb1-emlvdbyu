import { Playlist } from '../types/playlist';

export const generateM3UContent = (playlist: Playlist): string => {
  let content = '#EXTM3U\n';
  
  playlist.groups.forEach(group => {
    group.channels.forEach(channel => {
      content += `#EXTINF:-1 tvg-name="${channel.name}" tvg-logo="${channel.logo || ''}" group-title="${group.name}"${channel.epgId ? ` tvg-id="${channel.epgId}"` : ''},${channel.name}\n`;
      content += `${channel.url}\n`;
    });
  });
  
  return content;
};

export const downloadM3U = (playlist: Playlist) => {
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
};