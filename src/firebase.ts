import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC5I8mQXZh9j3MKqHKz4wTuU9N7hXhXrtY",
  authDomain: "stackblitz-shoutbox.firebaseapp.com",
  databaseURL: "https://stackblitz-shoutbox-default-rtdb.firebaseio.com",
  projectId: "stackblitz-shoutbox",
  storageBucket: "stackblitz-shoutbox.appspot.com",
  messagingSenderId: "851713044747",
  appId: "1:851713044747:web:e5c89d54edf361d14cdf13"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);