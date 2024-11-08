export async function getUserLocation(): Promise<{
  lat: number;
  lng: number;
  country: string;
  city: string;
} | null> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.error) {
      console.error('Error fetching location:', data.error);
      return null;
    }

    return {
      lat: data.latitude,
      lng: data.longitude,
      country: data.country_name,
      city: data.city
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
}