import React from "react";

const SECONDS_TO_SHOW_ONE_LUKE = 60 * 60;
const A_SECOND = 1000;

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
    }, A_SECOND);
    return () => clearInterval(interval);
  }, []);
  return secondsLeft;
};
