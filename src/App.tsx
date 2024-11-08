import React, { useEffect, useState, useRef } from 'react';
import { db } from './firebase';
import { ref, push, onValue, query, limitToLast } from 'firebase/database';
import { Message } from './components/Message';
import { ChatInput } from './components/ChatInput';
import { Map } from './components/Map';
import { MessageSquare, MapPin } from 'lucide-react';
import { getUserLocation } from './services/location';
import { ChatMessage } from './types';

const generateUsername = () => {
  const adjectives = ['Happy', 'Lucky', 'Sunny', 'Clever', 'Swift', 'Brave', 'Bright'];
  const nouns = ['Panda', 'Tiger', 'Eagle', 'Dolphin', 'Fox', 'Wolf', 'Bear'];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${
    nouns[Math.floor(Math.random() * nouns.length)]
  }${randomNum}`;
};

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [username] = useState(generateUsername());
  const [userLocation, setUserLocation] = useState<ChatMessage['location']>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    getUserLocation().then(location => {
      if (location) {
        setUserLocation(location);
      }
    });

    const messagesRef = query(ref(db, 'messages'), limitToLast(100));
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([id, value]: [string, any]) => ({
          id,
          ...value,
        }));
        setMessages(messageList);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const messagesRef = ref(db, 'messages');
    push(messagesRef, {
      text,
      username,
      timestamp: Date.now(),
      location: userLocation,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Main Content - Map */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-purple-400" />
              <h1 className="text-xl font-bold text-white">ShoutBox Global Chat</h1>
            </div>
            <div className="flex items-center space-x-2">
              {userLocation && (
                <div className="flex items-center text-sm text-gray-400">
                  <MapPin className="w-4 h-4 mr-1" />
                  {userLocation.city}, {userLocation.country}
                </div>
              )}
              <span className="text-sm text-gray-400">| {username}</span>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 p-4">
          <Map messages={messages} />
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-700">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>

      {/* Side Panel - Messages */}
      <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
        <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Messages</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          <div className="space-y-1">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-4">
                <MessageSquare className="w-12 h-12 mb-2" />
                <p>No messages yet. Be the first to say hello!</p>
              </div>
            ) : (
              messages.map((message) => (
                <Message
                  key={message.id}
                  text={message.text}
                  username={message.username}
                  timestamp={message.timestamp}
                  location={message.location}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;