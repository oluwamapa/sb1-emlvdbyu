import { Channel } from '../types/playlist';

export class ChannelService {
  static async validateChannel(channel: Channel): Promise<boolean> {
    try {
      const response = await fetch(channel.url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  static async validateLogo(logoUrl: string): Promise<boolean> {
    try {
      const response = await fetch(logoUrl, { method: 'HEAD' });
      return response.ok && response.headers.get('content-type')?.startsWith('image/');
    } catch {
      return false;
    }
  }
}