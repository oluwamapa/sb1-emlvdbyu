import React from 'react';
import { Tv, Upload, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { Playlist } from '../../types/playlist';

interface HeaderProps {
  activePlaylist: Playlist | null;
  onExport: () => void;
  onGenerateUrl: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePlaylist,
  onExport,
  onGenerateUrl,
}) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Tv className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">IPTV Playlist Manager</h1>
          </div>
          {activePlaylist && (
            <div className="flex items-center space-x-4">
              <Button onClick={onExport} icon={Upload}>
                Export as M3U
              </Button>
              <Button onClick={onGenerateUrl} icon={Download} variant="secondary">
                Generate URL
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};