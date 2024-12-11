import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface PlaylistUploaderProps {
  onFileUpload: (file: File) => void;
}

export const PlaylistUploader: React.FC<PlaylistUploaderProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.m3u', '.m3u8'],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-lg font-medium text-gray-700">
        {isDragActive ? 'Drop the playlist file here' : 'Drag & drop a playlist file here'}
      </p>
      <p className="mt-2 text-sm text-gray-500">or click to select a file</p>
      <p className="mt-1 text-xs text-gray-400">Supported formats: .m3u, .m3u8</p>
    </div>
  );
};