import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 bg-gray-800 border-t border-gray-700">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded-lg border-gray-600 focus:border-purple-500 focus:ring-purple-500 
                 bg-gray-700 px-4 py-2 text-sm transition-colors text-gray-100 placeholder-gray-400"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 
                 text-sm font-semibold text-white hover:bg-purple-500 disabled:opacity-50 
                 disabled:cursor-not-allowed transition-colors"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
};