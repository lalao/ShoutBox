export interface Location {
  lat: number;
  lng: number;
  country: string;
  city: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  username: string;
  timestamp: number;
  location?: Location;
}