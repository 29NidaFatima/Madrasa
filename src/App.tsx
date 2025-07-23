import React, { useEffect, useState } from "react";
import PrayerCard from "./PrayerCard";
import { getLocationFromCoords, getPrayerTimes } from "./api/fetchPrayerTime";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { parse, differenceInMinutes } from "date-fns";
import Header from "./components/Header";
import Footer from "./components/Footer";

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

const prayerOrder: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const colorMap: Record<PrayerName, GradientColors> = {
  Fajr: ["#3F7CE6", "#D6BDFF"],
  Dhuhr: ["#E77715", "#FFE392"],
  Asr: ["#006C5E", "#C9F3B3"],
  Maghrib: ["#FF9452", "#FF88A8"],
  Isha: ["#381079", "#811DEC"],
};

const formatMinutes = (mins: number): string => {
  const hr = Math.floor(mins / 60);
  const min = mins % 60;
  return `${hr > 0 ? `${hr}hr ` : ""}${min}min`;
};

const App: React.FC = () => {
  const { timings, setTimings } = usePrayerStore();
  const [location, setLocation] = useState("Detecting...");
  const [error, setError] = useState("");
  const [currentPrayer, setCurrentPrayer] = useState<PrayerName | "">("");
  const [nextPrayer, setNextPrayer] = useState<[PrayerName, number]>(["Fajr", 0]);

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

  useEffect(() => {
    if (timings.Fajr) {
      const [curr, mins] = getNextPrayer();
      setCurrentPrayer(curr);
      setNextPrayer([curr, mins]);
    }
  }, [timings]);

  return (
    <div className="bg-gradient-to-b from-[#fefefe] to-[#f3f7ff] min-h-screen text-black font-sans">
      <Header location={location} error={error} />

      <main className="grid place-items-center gap-6 px-4 py-6 pb-24">
        <h2 className="text-lg font-semibold text-indigo-700 text-center">
          🕊️ Next Prayer: {currentPrayer} — {formatMinutes(nextPrayer[1])} remaining
        </h2>

        {prayerOrder.map((p) => (
          <PrayerCard
            key={p}
            name={p}
            allTimings={timings}
            nextIn={p === currentPrayer ? formatMinutes(nextPrayer[1]) : "--"}
            isCurrent={p === currentPrayer}
            color={colorMap[p]}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default App;