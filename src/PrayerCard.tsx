import { Clock, Sun, CloudSun, Cloud, Moon } from "phosphor-react";
import Arc from "./components/Arc";

type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

const prayerIcons: Record<PrayerName, React.ReactElement> = {
  Fajr: <Clock size={20} />,
  Dhuhr: <Sun size={20} />,
  Asr: <CloudSun size={20} />,
  Maghrib: <Cloud size={20} />,
  Isha: <Moon size={20} />,
};

const prayers: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

interface PrayerCardProps {
  name: PrayerName;
  allTimings: Record<PrayerName, string>;
  nextIn: string;
  color: [string, string];
 
  isCurrent: boolean; 
}

const PrayerCard: React.FC<PrayerCardProps> = ({
  name,
  allTimings,
  nextIn,
  color,
}) => {
  return (
    <div
      className="w-[350px] h-[304px] sm:w-full sm:max-w-[90%] sm:h-auto rounded-[16px] m-4 p-4 text-white transition-transform duration-300 ease-in-out hover:scale-105"
      style={{
        background: `linear-gradient(to bottom right, ${color[0]}, ${color[1]})`,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-lg font-semibold">
          {prayerIcons[name]}
          {name}
        </div>
        <div className="text-sm bg-white/20 px-2 py-0.5 rounded-full">
          Sunday
        </div>
      </div>

      <p className="text-xs text-white/80 mb-4">
        Next prayer in {nextIn || "--"}
      </p>

      <div className="flex justify-between text-sm font-medium mb-6">
        {prayers.map((p) => (
          <div
            key={p}
            className={`flex flex-col items-center ${
              name === p ? "text-white" : "text-white/50"
            }`}
          >
            {prayerIcons[p]}
            <span>{p}</span>
            <span className="text-xs font-mono">{allTimings[p]}</span>
          </div>
        ))}
      </div>

      <Arc currentPrayer={name} />
    </div>
  );
};

export default PrayerCard;