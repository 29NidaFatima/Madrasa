import React from "react";

type PrayerName = "Fajr" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

interface ArcProgressProps {
  currentPrayer: PrayerName;
}

const ArcProgress: React.FC<ArcProgressProps> = ({ currentPrayer }) => {
  const prayers: PrayerName[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const radius = 130;
  const strokeWidth = 10;
  const centerX = 100;
  const centerY = 135;
  const totalAngle = 180;
  const segmentAngle = totalAngle / prayers.length;
  const arcStartOffset = -180;

  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const rad = (Math.PI / 180) * angleDeg;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const describeArc = (startAngle: number, endAngle: number): string => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  return (
    <svg width="100%" height="140" viewBox="0 0 200 140">
      {prayers.map((prayer) => {
        const index = prayers.indexOf(prayer);
        const start = arcStartOffset + index * segmentAngle;
        const end = start + segmentAngle;

        return (
          <path
            key={prayer}
            d={describeArc(start, end)}
            fill="none"
            stroke={prayer === currentPrayer ? "#ffffff" : "rgba(255,255,255,0.2)"}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

export default ArcProgress;
