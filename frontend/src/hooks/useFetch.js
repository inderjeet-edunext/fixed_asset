import { useState, useEffect, useCallback } from 'react';
import { getErrorMessage } from '@/utils/helpers';

/**
 * Custom hook for data fetching with loading, error, and retry functionality
 */
export const useFetch = (fetchFunction, dependencies = [], options = {}) => {
  const {
    immediate = true,
    onSuccess,
    onError,
    retryAttempts = 3,
    retryDelay = 1000,
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    let attempts = 0;
    const maxAttempts = retryAttempts + 1;

    while (attempts < maxAttempts) {
      try {
        const result = await fetchFunction(...args);
        setData(result);
        setLoading(false);
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        return result;
      } catch (err) {
        attempts++;
        
        if (attempts >= maxAttempts) {
          const errorMessage = getErrorMessage(err);
          setError(errorMessage);
          setLoading(false);
          
          if (onError) {
            onError(err);
          }
          
          throw err;
        } else {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempts));
        }
      }
    }
  }, [fetchFunction, onSuccess, onError, retryAttempts, retryDelay]);

  const refetch = useCallback(() => {
    setRetry(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [...dependencies, retry]);

  return {
    data,
    loading,
    error,
    execute,
    refetch,
  };
};