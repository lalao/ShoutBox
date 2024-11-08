import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { ChatMessage } from '../types';
import { Icon } from 'leaflet';
import { MessageCircle } from 'lucide-react';

interface MapProps {
  messages: ChatMessage[];
}

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export const Map: React.FC<MapProps> = ({ messages }) => {
  const validMessages = messages.filter(msg => msg.location?.lat && msg.location?.lng);
  const center: [number, number] = validMessages.length > 0 
    ? [validMessages[0].location!.lat, validMessages[0].location!.lng]
    : [20, 0];

  return (
    <MapContainer
      center={center}
      zoom={2}
      className="h-full w-full rounded-lg"
      scrollWheelZoom={true}
      minZoom={2}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validMessages.map((message) => (
        message.location && (
          <Marker
            key={message.id}
            position={[message.location.lat, message.location.lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-2">
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-sm">{message.username}</span>
                </div>
                <p className="text-sm">{message.text}</p>
                <div className="text-xs text-gray-500 mt-1">
                  {message.location.city}, {message.location.country}
                </div>
              </div>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};