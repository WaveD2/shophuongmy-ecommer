import React, { useEffect, useState } from "react";

const HookDebounce = (isLoading, delay = 2000) => {
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsDebouncing(true);
      const timer = setTimeout(() => {
        setIsDebouncing(false);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isLoading, delay]);

  return isDebouncing;
};

export default HookDebounce;
