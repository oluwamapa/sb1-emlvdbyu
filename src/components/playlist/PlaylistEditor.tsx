import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { GroupCard } from './GroupCard';
import { PlaylistGroup } from '../../types/playlist';
import { useChannelValidation } from '../../hooks/useChannelValidation';

interface PlaylistEditorProps {
  groups: PlaylistGroup[];
  onChannelEdit: (channelId: string) => void;
  onChannelDelete: (channelId: string) => void;
  onDragEnd: (result: any) => void;
}

export const PlaylistEditor: React.FC<PlaylistEditorProps> = ({
  groups,
  onChannelEdit,
  onChannelDelete,
  onDragEnd,
}) => {
  const { validationResults } = useChannelValidation();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-6">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onChannelEdit={onChannelEdit}
            onChannelDelete={onChannelDelete}
            validationResults={validationResults}
          />
        ))}
      </div>
    </DragDropContext>
  );
};