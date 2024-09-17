import { useState, useEffect } from 'react';
import api from '../services/api';

// Custom hook to fetch and manage a single trailer
const useTrailer = (trailerId) => {
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSingleTrailer = async (trailerId) => {
    setLoading(true);
    try {
      const response = await api.get(`/trailer/trailers/${trailerId}`);
      setTrailer(response.data.trailer); // Access `trailer` from response
    } catch (err) {
      setError('Error fetching trailer');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (trailerId) {
    getSingleTrailer(trailerId);
    // }
  }, [trailerId]);

  return { trailer, loading, error };
};

export default useTrailer;

