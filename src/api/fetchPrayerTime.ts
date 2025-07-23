import axios from "axios";

// Type for the return value of getLocationFromCoords
export interface LocationData {
  city: string;
  country: string;
}

// Type for OpenStreetMap response (we only type the parts we use)
interface OSMResponse {
  address: {
    city?: string;
    town?: string;
    village?: string;
    hamlet?: string;
    suburb?: string;
    county?: string;
    state_district?: string;
    state?: string;
    country?: string;
  };
}

// Get city & country name from coordinates using OpenStreetMap
export const getLocationFromCoords = async (
  lat: number,
  lon: number
): Promise<LocationData> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  try {
    const res = await axios.get<OSMResponse>(url, {
      headers: {
        "User-Agent": "NamazApp/1.0 (contact@yourdomain.com)",
      },
    });

    const address = res.data.address;

    const city =
      address.city ||
      address.town ||
      address.village ||
      address.hamlet ||
      address.suburb ||
      address.county ||
      address.state_district ||
      address.state ||
      "Unknown City";

    const country = address.country || "Unknown Country";

    return { city, country };
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    return { city: "Unknown City", country: "Unknown Country" };
  }
};

// Type for prayer times
export interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string; // To support additional timing fields (like Midnight, Imsak, etc.)
}

// Type for Aladhan API response
interface AladhanResponse {
  data: {
    timings: PrayerTimings;
  };
}

// Fetch prayer times from Aladhan API
export const getPrayerTimes = async (
  lat: number,
  lon: number
): Promise<PrayerTimings> => {
  try {
    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}`;
    const res = await axios.get<AladhanResponse>(url);
    return res.data.data.timings;
  } catch (err) {
    console.error("Prayer times fetch failed:", err);
    return {} as PrayerTimings;
  }
};
