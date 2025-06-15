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
        const result = await fetchWithToken('/', token);
        setData(result);
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