import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDarkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(isDarkModeEnabled);
  }, []);

  return [isDarkMode, setIsDarkMode];
};