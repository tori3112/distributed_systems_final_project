import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

export const useAllTransactions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Only attempt to get token if user is authenticated
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();
          const response = await axios.get(`${process.env.REACT_APP_REST_URL}/`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          setData(response.data);
        } else {
          setError(new Error('User not authenticated'));
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