import { Channel, PlaylistGroup } from '../types/playlist';

export const parseM3U = (content: string) => {
  const lines = content.split('\n');
  const groups: Record<string, PlaylistGroup> = {};
  let currentChannel: Partial<Channel> | null = null;

  lines.forEach((line) => {
    line = line.trim();
    
    if (line.startsWith('#EXTINF:')) {
      currentChannel = {};
      // Parse channel metadata
      const metadataStr = line.substring(line.indexOf(',') + 1);
      const tvgNameMatch = metadataStr.match(/tvg-name="([^"]+)"/);
      const tvgLogoMatch = metadataStr.match(/tvg-logo="([^"]+)"/);
      const groupTitleMatch = metadataStr.match(/group-title="([^"]+)"/);
      
      currentChannel.name = tvgNameMatch?.[1] || metadataStr.split(',').pop() || 'Unnamed Channel';
      currentChannel.logo = tvgLogoMatch?.[1];
      currentChannel.group = groupTitleMatch?.[1] || 'Uncategorized';
      currentChannel.id = crypto.randomUUID();
    } else if (line.startsWith('http') && currentChannel) {
      currentChannel.url = line;
      
      const groupName = currentChannel.group;
      if (!groups[groupName]) {
        groups[groupName] = {
          id: crypto.randomUUID(),
          name: groupName,
          channels: [],
        };
      }
      
      groups[groupName].channels.push(currentChannel as Channel);
      currentChannel = null;
    }
  });

  return Object.values(groups);
};