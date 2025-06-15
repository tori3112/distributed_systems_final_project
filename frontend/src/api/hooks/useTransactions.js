// src/api/hooks/useTransactions.js
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchWithToken } from '../client';

export const useAllTransactions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        setError(new Error('User not authenticated'));
        setLoading(false);
        return;
      }

      try {
        const token = await getAccessTokenSilently();
        const result = await fetchWithToken('/orders/', token);
        
        // Check the structure of the response and extract the array if needed
        if (result && Array.isArray(result)) {
          setData(result);
        } else if (result && typeof result === 'object') {
          if (Array.isArray(result.data)) {
            setData(result.data);
          } else if (result.orders && Array.isArray(result.orders)) {
            setData(result.orders);
          } else {
            console.error('API response does not contain an array:', result);
            setData([]);
          }
        } else {
          console.error('Unexpected API response format:', result);
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getAccessTokenSilently, isAuthenticated]);

  return { data, loading, error };
};