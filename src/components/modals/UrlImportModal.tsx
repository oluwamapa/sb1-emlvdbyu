import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';

interface UrlImportModalProps {
  onImport: (url: string) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

export const UrlImportModal: React.FC<UrlImportModalProps> = ({
  onImport,
  onClose,
  isOpen,
}) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await onImport(url);
      onClose();
    } catch (err) {
      setError('Failed to import playlist from URL');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Import from URL</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="playlist-url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Playlist URL
            </label>
            <input
              id="playlist-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/playlist.m3u"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Importing...' : 'Import'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};