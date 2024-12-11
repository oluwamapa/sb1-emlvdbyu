import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlayCircle, Edit2, Trash2 } from 'lucide-react';
import { Channel, PlaylistGroup } from '../types/playlist';

interface ChannelListProps {
  groups: PlaylistGroup[];
  onChannelEdit: (channel: Channel) => void;
  onChannelDelete: (channel: Channel) => void;
  onDragEnd: (result: any) => void;
}

export const ChannelList: React.FC<ChannelListProps> = ({
  groups,
  onChannelEdit,
  onChannelDelete,
  onDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg shadow">
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
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            {channel.logo ? (
                              <img
                                src={channel.logo}
                                alt={channel.name}
                                className="w-8 h-8 rounded"
                              />
                            ) : (
                              <PlayCircle className="w-8 h-8 text-gray-400" />
                            )}
                            <span className="text-gray-700">{channel.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => onChannelEdit(channel)}
                              className="p-1 text-gray-500 hover:text-blue-500 rounded-full hover:bg-blue-50"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onChannelDelete(channel)}
                              className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};