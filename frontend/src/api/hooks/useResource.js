import { useState, useEffect } from 'react';
import apiClient from '../client';

export function useResource(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Allow for optional dependency array to trigger refetching
  const { dependencies = [], transformResponse, errorHandler } = options;

  useEffect(() => {
    let isMounted = true;
    
    async function fetchResource() {
      try {
        setLoading(true);
        const response = await apiClient.get(endpoint);
        
        if (isMounted) {
          // Allow for custom transformation of the response
          if (transformResponse) {
            setData(transformResponse(response.data));
          } else {
            setData(response.data);
          }
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          // Allow for custom error handling
          if (errorHandler) {
            errorHandler(err);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchResource();
    
    return () => {
      isMounted = false;
    };
  }, [endpoint, ...dependencies]);

  return { data, loading, error };
}