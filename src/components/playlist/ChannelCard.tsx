import React from 'react';
import { PlayCircle, Edit2, Trash2 } from 'lucide-react';
import { Channel } from '../../types/playlist';

interface ChannelCardProps {
  channel: Channel;
  onEdit: (channel: Channel) => void;
  onDelete: (channel: Channel) => void;
  dragHandleProps: any;
}

export const ChannelCard: React.FC<ChannelCardProps> = ({
  channel,
  onEdit,
  onDelete,
  dragHandleProps,
}) => {
  return (
    <div
      {...dragHandleProps}
      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
    >
      <div className="flex items-center space-x-3">
        {channel.logo ? (
          <img
            src={channel.logo}
            alt={channel.name}
            className="w-8 h-8 rounded object-cover"
            onError={(e) => {
              e.currentTarget.src = '';
              e.currentTarget.onerror = null;
            }}
          />
        ) : (
          <PlayCircle className="w-8 h-8 text-gray-400" />
        )}
        <span className="text-gray-700">{channel.name}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onEdit(channel)}
          className="p-1 text-gray-500 hover:text-blue-500 rounded-full hover:bg-blue-50"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(channel)}
          className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};