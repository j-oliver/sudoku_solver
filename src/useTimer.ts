import { useCallback, useEffect, useRef, useState } from 'react';

export type Timer = {
  seconds: number;
  time: string;
  startTimer: () => void;
  stop: () => void;
  reset: () => void;
};

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (!delay) {
      return;
    }
    const interval = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(interval);
  }, [delay]);
};

export const useTimer = (): Timer => {
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState<string>('00:00:00');
  const [delay, setDelay] = useState<number | null>(1000);

  const startTimer = () => {
    setDelay(1000);
  };

  const stop = () => {
    setDelay(null);
  };

  const reset = () => {
    setSeconds(0);
    stop();
    startTimer();
  };

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) - hours * 60;
    const secs = seconds % 60;

    return `${formatTimeUnit(hours)}:${formatTimeUnit(
      minutes
    )}:${formatTimeUnit(secs)}`;
  }, []);

  const formatTimeUnit = (unit: number) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  const increment = useCallback(() => {
    setSeconds(seconds => seconds + 1);
    setTime(formatTime(seconds));
  }, [seconds, formatTime]);

  useInterval(increment, delay);

  return { seconds, time, startTimer, stop, reset };
};
