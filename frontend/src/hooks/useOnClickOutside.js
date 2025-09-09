import { useEffect } from 'react';

/**
 * Custom hook for handling clicks outside of an element
 */
export const useOnClickOutside = (ref, handler, mouseEvent = 'mousedown') => {
  useEffect(() => {
    const listener = (event) => {
      const element = ref?.current;
      if (!element || element.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener(mouseEvent, listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, mouseEvent]);
};