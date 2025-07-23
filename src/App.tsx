import React, { useEffect, useState } from "react";
import PrayerCard from "./PrayerCard";
import { getLocationFromCoords, getPrayerTimes } from "./api/fetchPrayerTime";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { parse, differenceInMinutes } from "date-fns";
import Header from "./components/Header";
import Footer from "./components/Footer";

// ------------------------------
// 🕌 Type Definitions
// ------------------------------

type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

interface PrayerTimings {
  [key: string]: string;
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface PrayerStore {
  timings: PrayerTimings;
  setTimings: (t: PrayerTimings) => void;
}

type GradientColors = [string, string];

// ------------------------------
// 🕌 Zustand Store
// ------------------------------

const usePrayerStore = create<PrayerStore>()(
  persist(
    (set) => ({
      timings: {
        Fajr: "",
        Dhuhr: "",
        Asr: "",
        Maghrib: "",
        Isha: "",
      },
      setTimings: (t: PrayerTimings) => set({ timings: t }),
    }),
    { name: "prayer-times" }
  )
);

// ------------------------------
// 🕌 Prayer Names and Colors
// ------------------------------

const prayerOrder: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const colorMap: Record<PrayerName, GradientColors> = {
  Fajr: ["#3F7CE6", "#D6BDFF"],
  Dhuhr: ["#E77715", "#FFE392"],
  Asr: ["#006C5E", "#C9F3B3"],
  Maghrib: ["#FF9452", "#FF88A8"],
  Isha: ["#381079", "#811DEC"],
};

// ------------------------------
// 🕰 Format time as "Xhr Ymin"
// ------------------------------

const formatMinutes = (mins: number): string => {
  const hr = Math.floor(mins / 60);
  const min = mins % 60;
  return `${hr > 0 ? `${hr}hr ` : ""}${min}min`;
};

// ------------------------------
// 👉 Main Component
// ------------------------------

const App: React.FC = () => {
  const { timings, setTimings } = usePrayerStore();
  const [location, setLocation] = useState<string>("Detecting...");
  const [error, setError] = useState<string>("");
  const [currentPrayer, setCurrentPrayer] = useState<PrayerName | "">("");
  const [nextPrayer, setNextPrayer] = useState<[PrayerName, number]>(["Fajr", 0]);

  // 🧠 Get next prayer and its minutes from now
  const getNextPrayer = (): [PrayerName, number] => {
    const now = new Date();
    for (let i = 0; i < prayerOrder.length; i++) {
      const p = prayerOrder[i];
      const time = parse(timings[p], "HH:mm", new Date());
      if (now < time) return [p, differenceInMinutes(time, now)];
    }
    const fajrTomorrow = parse(timings["Fajr"], "HH:mm", new Date());
    fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
    return ["Fajr", differenceInMinutes(fajrTomorrow, now)];
  };

  // 📍 Fetch location and timings
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const loc = await getLocationFromCoords(lat, lon);
        setLocation(`${loc.city}, ${loc.country}`);

        const data = await getPrayerTimes(lat, lon);
        setTimings(data);
      },
      () => setError("Location access denied.")
    );
  }, [setTimings]);

  // 🔄 Update current and next prayer
  useEffect(() => {
    if (timings.Fajr) {
      const [curr, mins] = getNextPrayer();
      setCurrentPrayer(curr);
      setNextPrayer([curr, mins]);
    }
  }, [timings]);

  return (
    <div className="bg-[#f9f9ff] min-h-screen text-black">
      <Header location={location} error={error} />

      <div className="space-y-4 px-4 pb-24">
        {prayerOrder.map((p) => (
          <PrayerCard
            key={p}
            name={p}
            time={timings[p]}
            allTimings={timings}
            nextIn={p === currentPrayer ? formatMinutes(nextPrayer[1]) : "--"}
            isCurrent={p === currentPrayer}
            color={colorMap[p]}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default App;
