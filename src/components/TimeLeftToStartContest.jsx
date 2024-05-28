import React, { useEffect, useState } from "react";

const calculateTimeLeft = (contestTime) => {
  const now = new Date();
  const difference = contestTime - now;

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const TimeLeftToStartContest = ({ contestTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(contestTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(contestTime));
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [contestTime]);

  const { days, hours, minutes, seconds } = timeLeft;

  const countdownComponents = [
    { value: days, label: "days" },
    { value: hours, label: "hours" },
    { value: minutes, label: "minutes" },
    { value: seconds, label: "seconds" },
  ];

  const countdownString = countdownComponents
    .filter(
      (component) => component.value !== undefined && component.value !== 0
    )
    .map((component) => `${component.value} ${component.label}`)
    .join(" ");

  return (
    <>
      {countdownString ? (
        <div className="timer">The contest will start in {countdownString}</div>
      ) : (
        <div className="timer">The contest has started!</div>
      )}
    </>
  );
};

export default TimeLeftToStartContest;
