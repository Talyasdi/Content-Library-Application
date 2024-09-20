import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import {useAuthContext} from '../hooks/useAuthContext'

const TrailerContext = createContext();

const TrailerProvider = ({ children }) => {
  const [trailer, setTrailer] = useState(null);
  const [id, setTrailerId] = useState(null); // State to manage trailer name

  const {user} = useAuthContext(); 
  const getSingleTrailer = async (id) => {
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
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleTrailer(id);
    }
  }, [id]);

  return (
    <TrailerContext.Provider value={{ trailer, setTrailerId }}>
      {children}
    </TrailerContext.Provider>
  );
};

export { TrailerContext, TrailerProvider };