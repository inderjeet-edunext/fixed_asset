import { useRef, useEffect } from 'react';

/**
 * Custom hook to store previous value
 */
export const usePrevious = (value) => {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
};