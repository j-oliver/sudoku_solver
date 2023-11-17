import { useRef, useState } from 'react';

export type Timer = {
  seconds: number;
  time: string;
  startTimer: () => void;
  stop: () => void;
  reset: () => void;
};

export const useTimer = (): Timer => {
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState<string>('00:00:00');

  const interval = useRef<number>(0);

  const startTimer = () => {
    interval.current = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      setTime(formatTime(seconds));
    }, 1000);
  };

  const stop = () => {
    clearInterval(interval.current);
  };

  const reset = () => {
    setSeconds(0);
    stop();
    startTimer();
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) - hours * 60;
    const secs = seconds % 60;

    return `${formatTimeUnit(hours)}:${formatTimeUnit(
      minutes
    )}:${formatTimeUnit(secs)}`;
  };

  const formatTimeUnit = (unit: number) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  return {
    seconds,
    time,
    startTimer,
    stop,
    reset,
  };
};
