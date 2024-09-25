import { useState, useEffect } from 'react';
import api from '../services/api';
import {useAuthContext} from './useAuthContext'

// Custom hook to fetch and manage a single trailer
const useTrailer = (id) => {
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useAuthContext(); 

  const getSingleTrailer = async (id) => {
    setLoading(true);
    if (!user) {
      console.log("No user found");
      return;
    }

    try {
      const response = await api.get(`/trailer/trailers/${id}`,{
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
    getSingleTrailer(id);
  }, [id]);

  return { trailer, loading, error};
};

export default useTrailer;
