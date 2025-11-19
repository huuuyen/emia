"use client";

import { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Calculate immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="countdown-expired">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Chúng tôi đã sẵn sàng!
        </h2>
        <p className="text-xl text-center text-gray-600">
          Trang web đã chính thức ra mắt.
        </p>
      </div>
    );
  }

  return (
    <div className="countdown-timer">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.days).padStart(2, "0")}</div>
          <div className="countdown-label">Ngày</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.hours).padStart(2, "0")}</div>
          <div className="countdown-label">Giờ</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.minutes).padStart(2, "0")}</div>
          <div className="countdown-label">Phút</div>
        </div>
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.seconds).padStart(2, "0")}</div>
          <div className="countdown-label">Giây</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

