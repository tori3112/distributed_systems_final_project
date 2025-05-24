// src/api/useApi.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get('http://104.210.36.2:8080/');
        
        if (isMounted) {
          // Extract the packageList array from the response
          if (response.data && 
              response.data._embedded && 
              response.data._embedded.packageList) {
            setProducts(response.data._embedded.packageList);
          } else {
            // If the structure is not as expected, set an empty array
            console.error('Unexpected API response structure:', response.data);
            setProducts([]);
          }
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}