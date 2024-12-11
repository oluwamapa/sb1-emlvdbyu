import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { PlaylistGroup } from '../../types/playlist';
import { ChannelCard } from './ChannelCard';

interface GroupCardProps {
  group: PlaylistGroup;
  onChannelEdit: (channelId: string) => void;
  onChannelDelete: (channelId: string) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onChannelEdit,
  onChannelDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-3 bg-gray-50 rounded-t-lg">
        <h3 className="text-lg font-medium text-gray-800">{group.name}</h3>
      </div>
      <Droppable droppableId={group.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="divide-y divide-gray-100"
          >
            {group.channels.map((channel, index) => (
              <Draggable key={channel.id} draggableId={channel.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <ChannelCard
                      channel={channel}
                      onEdit={() => onChannelEdit(channel.id)}
                      onDelete={() => onChannelDelete(channel.id)}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};