import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const TrailersContext = createContext();

const TrailersProvider = ({ children }) => {
  const [trailers, setTrailers] = useState([]);

  const getAllTrailers = async () => {
    try {
      const response = await api.get('/trailer/trailers');
      setTrailers(response.data);
    } catch (error) {
      console.error('Error fetching trailers:', error);
    }
  };

  useEffect(() => {
    getAllTrailers();
  }, []);
  
  return (
    <TrailersContext.Provider value={{ trailers, getAllTrailers }}>
      {children}
    </TrailersContext.Provider>
  );
};

export { TrailersContext, TrailersProvider };

