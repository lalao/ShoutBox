import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, MapPin } from 'lucide-react';
import { ChatMessage } from '../types';

type MessageProps = Omit<ChatMessage, 'id'>;

export const Message: React.FC<MessageProps> = ({ text, username, timestamp, location }) => {
  return (
    <div className="flex items-start space-x-3 p-4 hover:bg-gray-700/50 transition-colors rounded-lg">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-purple-400" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-purple-400">{username}</p>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-300">{text}</p>
        {location && (
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            {location.city}, {location.country}
          </div>
        )}
      </div>
    </div>
  );
};