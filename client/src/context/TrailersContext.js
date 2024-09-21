import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import {useAuthContext} from '../hooks/useAuthContext'

const TrailersContext = createContext();

const TrailersProvider = ({ children }) => {
  const [trailers, setTrailers] = useState([]);

  const {user} = useAuthContext(); 

  const getAllTrailers = async () => {
    try {
      const response = await api.get('/trailer/trailers',{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
    });

    
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

