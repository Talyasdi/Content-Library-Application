// import React, { createContext, useState, useEffect } from 'react';
// import api from '../services/api';

// const TrailerContext = createContext();

// const TrailerProvider = ({ children }) => {
//   const [trailer, setTrailer] = useState(null);
//   const [trailerName, setTrailerName] = useState(null); // State to manage trailer name

//   const getSingleTrailer = async (name) => {
//     try {
//       const response = await api.get(`/trailer/trailers/${name}`); 
//       setTrailer(response.data.trailer); // Access `trailer` from response
//     } catch (error) {
//       console.error('Error fetching trailer:', error);
//     }
//   };

//   useEffect(() => {
//     if (trailerName) {
//       getSingleTrailer(trailerName);
//     }
//   }, [trailerName]);

//   return (
//     <TrailerContext.Provider value={{ trailer, setTrailerName }}>
//       {children}
//     </TrailerContext.Provider>
//   );
// };

// export { TrailerContext, TrailerProvider };
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const TrailerContext = createContext();

const TrailerProvider = ({ children }) => {
  const [trailer, setTrailer] = useState(null);
  const [trailerName, setTrailerName] = useState(null); // State to manage trailer name

  const getSingleTrailer = async (trailerName) => {
    try {
      const response = await api.get(`/trailer/trailers/${trailerName}`); 
      setTrailer(response.data.trailer); // Access `trailer` from response
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  useEffect(() => {
    if (trailerName) {
      getSingleTrailer(trailerName);
    }
  }, [trailerName]);

  return (
    <TrailerContext.Provider value={{ trailer, setTrailerName }}>
      {children}
    </TrailerContext.Provider>
  );
};

export { TrailerContext, TrailerProvider };