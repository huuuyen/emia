"use client";

import { createContext, useContext, useState, useEffect } from "react";
import config from "@config/config.json";

const CountdownContext = createContext();

export const useCountdown = () => {
  const context = useContext(CountdownContext);
  if (!context) {
    throw new Error("useCountdown must be used within a CountdownProvider");
  }
  return context;
};

export const CountdownProvider = ({ children }) => {
  const { countdown } = config;
  const launchDate = countdown?.launch_date || "2025-12-31T00:00:00";
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const checkCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(launchDate).getTime();
      setIsExpired(now >= target);
    };

    // Check immediately
    checkCountdown();

    // Check every second
    const timer = setInterval(checkCountdown, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <CountdownContext.Provider value={{ isExpired, launchDate }}>
      {children}
    </CountdownContext.Provider>
  );
};

