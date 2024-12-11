import { useState } from 'react';
import { Channel } from '../types/playlist';
import { ChannelService } from '../services/channelService';

export const useChannelValidation = () => {
  const [validating, setValidating] = useState(false);
  const [validationResults, setValidationResults] = useState<Record<string, boolean>>({});

  const validateChannel = async (channel: Channel) => {
    setValidating(true);
    try {
      const isValid = await ChannelService.validateChannel(channel);
      setValidationResults(prev => ({ ...prev, [channel.id]: isValid }));
      return isValid;
    } finally {
      setValidating(false);
    }
  };

  const validateChannels = async (channels: Channel[]) => {
    setValidating(true);
    const results: Record<string, boolean> = {};
    
    try {
      await Promise.all(
        channels.map(async (channel) => {
          results[channel.id] = await ChannelService.validateChannel(channel);
        })
      );
      
      setValidationResults(results);
      return results;
    } finally {
      setValidating(false);
    }
  };

  return {
    validating,
    validationResults,
    validateChannel,
    validateChannels,
  };
};