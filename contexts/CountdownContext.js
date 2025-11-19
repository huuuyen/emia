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
  const enabled = countdown?.enabled !== false; // Default to true
  const forceExpired = countdown?.force_expired === true; // Force expired from config
  const useConfigCache = countdown?.use_config_cache === true; // Use config cache instead of localStorage
  const STORAGE_KEY = `countdown_expired_${launchDate}`;
  
  // Initialize state - check priority: forceExpired > config cache > localStorage > default
  const [isExpired, setIsExpired] = useState(() => {
    // Priority 1: Force expired from config (highest priority)
    if (forceExpired) {
      return true;
    }
    
    // Priority 2: Countdown disabled
    if (!enabled) {
      return true;
    }
    
    // Priority 3: Check localStorage (if not using config cache)
    if (!useConfigCache && typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        return true;
      }
    }
    
    return false;
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Priority 1: Force expired from config (highest priority) - no need to check
    if (forceExpired) {
      setIsExpired(true);
      setIsLoading(false);
      return;
    }
    
    // Priority 2: Countdown disabled
    if (!enabled) {
      setIsExpired(true);
      setIsLoading(false);
      return;
    }

    // Priority 3: Check cache (localStorage or config)
    if (useConfigCache) {
      // If using config cache, we check the actual date every time
      // Config cache means we rely on the config file itself
      // (useful when you manually update config.json after countdown expires)
    } else {
      // Check localStorage first
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "true") {
          // Countdown already expired in localStorage, no need to check again
          setIsExpired(true);
          setIsLoading(false);
          return;
        }
      }
    }

    const checkCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(launchDate).getTime();
      const expired = now >= target;
      
      setIsExpired(expired);
      setIsLoading(false);
      
      // If expired, save to localStorage (only if not using config cache)
      if (expired && !useConfigCache && typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, "true");
      }
    };

    // Check immediately
    checkCountdown();

    // Only check every second if countdown hasn't expired yet
    // Once expired, we stop checking
    // Don't depend on isExpired state, check directly in interval
    let timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(launchDate).getTime();
      const expired = now >= target;
      
      if (expired) {
        setIsExpired(true);
        setIsLoading(false);
        if (!useConfigCache && typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, "true");
        }
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [launchDate, STORAGE_KEY, forceExpired, enabled, useConfigCache]);

  return (
    <CountdownContext.Provider value={{ isExpired, launchDate, isLoading, enabled, forceExpired }}>
      {children}
    </CountdownContext.Provider>
  );
};

