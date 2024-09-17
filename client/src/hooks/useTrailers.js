import { useState, useEffect } from 'react';
import api from '../services/api';

// Custom hook to fetch and manage trailers
const useTrailers = () => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllTrailers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/trailer/trailers');
      setTrailers(response.data);
    } catch (err) {
      setError('Error fetching trailers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTrailers();
  }, []);

  return { trailers, loading, error, getAllTrailers };
};

export default useTrailers;
