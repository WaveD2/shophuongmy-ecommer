import React, { useEffect, useState } from "react";

const HookDebounce = ({ callback, delay }) => {
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [callback, delay]);
};

export default HookDebounce;
