import { useState, useEffect } from 'react';
import api from '../services/api';

// Custom hook to fetch and manage a single trailer
const useTrailer = (trailerId) => {
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {user} = useAuthContext(); 

  const getSingleTrailer = async (trailerId) => {
    if (!user) {
      console.log("No user found");
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.get(`/trailer/trailers/${trailerId}`,{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
    });
    
      setTrailer(response.data.trailer); // Access `trailer` from response
    } catch (err) {
      setError('Error fetching trailer');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleTrailer(trailerId);
  }, [trailerId]);

  return { trailer, loading, error };
};

export default useTrailer;

