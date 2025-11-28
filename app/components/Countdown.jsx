// Countdown.jsx
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-xs text-slate-900 bg-white/40 backdrop-blur-md px-3 py-1 rounded font-semibold flex items-center gap-2">
      
      {/* الأيقونة */}
      <FontAwesomeIcon
        icon={faHourglassHalf}
        className="text-slate-900 text-sm opacity-80"
      />

      {/* النص */}
      <span>
        ينتهي خلال:{" "}
        {timeLeft.days}ي • {timeLeft.hours}س • {timeLeft.minutes}د •{" "}
        {timeLeft.seconds}ث
      </span>
    </div>
  );
}
// End of Countdown.jsx