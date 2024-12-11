export interface Channel {
  id: string;
  name: string;
  url: string;
  logo?: string;
  group: string;
  epgId?: string;
}

export interface PlaylistGroup {
  id: string;
  name: string;
  channels: Channel[];
}

export interface Playlist {
  id: string;
  name: string;
  groups: PlaylistGroup[];
  createdAt: Date;
  updatedAt: Date;
}