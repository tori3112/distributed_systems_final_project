import { useState, useEffect, useRef } from 'react';
import apiClient from '../client';

export function useResource(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Store dependencies in a ref to avoid the spread warning
  const optionRef = useRef(options);

  // Update the ref when change
  useEffect(() => {
    optionRef.current = options;
  }, [options]);

  useEffect(() => {
    let isMounted = true;

    const { transformResponse, errorHandler } = optionRef.current;
    
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
  }, [endpoint, options]);

  return { data, loading, error };
}