import React from "react";
import tp from "timeproxy";

const SECONDS_TO_SHOW_ONE_LUKE = tp`one hour` / 1000;
const EVERY_SECOND = tp`a second`;

export const useSecondsLeft = () => {
  const [secondsLeft, setSecondsLeft] = React.useState(
    SECONDS_TO_SHOW_ONE_LUKE
  );
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0) {
          return SECONDS_TO_SHOW_ONE_LUKE;
        } else {
          return prev - 1;
        }
      });
    }, EVERY_SECOND);
    return () => clearInterval(interval);
  }, []);
  return {
    secondsLeft,
    reset: () => setSecondsLeft(SECONDS_TO_SHOW_ONE_LUKE),
  };
};
