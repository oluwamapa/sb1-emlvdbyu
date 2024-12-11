import React, { useState } from 'react';
import { PlaylistUploader } from './components/PlaylistUploader';
import { ChannelList } from './components/ChannelList';
import { usePlaylistStore } from './store/playlistStore';
import { Tv, Upload, Download } from 'lucide-react';

function App() {
  const { activePlaylist, setActivePlaylist } = usePlaylistStore();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // TODO: Implement M3U parsing logic
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        console.log('Playlist content:', content);
        // Parse and process the playlist content
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Error uploading playlist:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Tv className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">IPTV Playlist Manager</h1>
            </div>
            {activePlaylist && (
              <div className="flex items-center space-x-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Export as M3U
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Generate URL
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!activePlaylist ? (
          <div className="max-w-2xl mx-auto">
            <PlaylistUploader onFileUpload={handleFileUpload} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{activePlaylist.name}</h2>
            </div>
            <ChannelList
              groups={activePlaylist.groups}
              onChannelEdit={(channel) => console.log('Edit channel:', channel)}
              onChannelDelete={(channel) => console.log('Delete channel:', channel)}
              onDragEnd={(result) => console.log('Drag end:', result)}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;