// import { useState, useEffect,useCallback } from 'react';
// import api from '../services/api';
// import axios from 'axios';

// // Custom hook to fetch and manage trailers
// const useTrailers = () => {
//   const [notFound, setNotFound] = useState(false);
//   const [trailers, setTrailers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [activePage, setActivePage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const trailersPerPage = 2;

//     // Temporarily hardcoding the user's email
//     const userex  = {
//       userName: 'ofirg',
//       email: 'ofir@gmail.com',
//       password: '$2b$10$GWmkKZUg67JGTnHfAMe1qOnike3jA9pNccaJ9adQAghOttI3vOXBq',
//       repPassword: '$2b$10$GWmkKZUg67JGTnHfAMe1qOnike3jA9pNccaJ9adQAghOttI3vOXBq',
//       age: '26',
//     };

//   //const getAllTrailers = async () => {
//   const fetchTrailers = useCallback(async () => {
//     setLoading(true);
//     setNotFound(false); 
  
//     try {
//       // const response = await api.get('/trailer/trailers',{
//         const response = await axios.get(`http://localhost:5000/api/trailer/trailers/email?email=${userex.email}`, {
//       params:{
//           // email: userex.email,
//           _page:activePage,
//           _limit: trailersPerPage,
//         },
//       });
//       const fetchedTrailers = response.data;
//       setTrailers(fetchedTrailers);
//       // setTrailers(response.data);
//       if(fetchedTrailers.length === 0){
//         setNotFound(true);
//       }
//       const totalCount = parseInt(response.headers['x-total-count']);
//       const totalPagesCount = Math.ceil(totalCount / trailersPerPage);
//       setTotalPages(totalPagesCount);
//     } catch (err) {
//       setError('Error fetching trailers....');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   },[activePage, trailersPerPage, userex.email]);

//   useEffect(() => {
//     fetchTrailers();
//   }, [fetchTrailers]);

//   const handlePageChange = (page) => {
//     setActivePage(page);
//   };
  
//   const pagination = {
//     email: userex.email,
//     currPage: activePage,
//     totalPages: totalPages,
//     handlePageChange: handlePageChange
//   };

//   return { trailers, loading, error, pagination, notFound };
// };

// export default useTrailers;

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Custom hook to fetch and manage trailers
const useTrailers = () => {
  const [notFound, setNotFound] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const trailersPerPage = 2;

  // Temporarily hardcoding the user's email
  const userex = {
    userName: 'ofirg',
    email: 'ofir@gmail.com',
    password: '$2b$10$GWmkKZUg67JGTnHfAMe1qOnike3jA9pNccaJ9adQAghOttI3vOXBq',
    repPassword: '$2b$10$GWmkKZUg67JGTnHfAMe1qOnike3jA9pNccaJ9adQAghOttI3vOXBq',
    age: '26',
  };

  const fetchTrailers = useCallback(async () => {
    console.log('get fetch');
    setLoading(true);
    setNotFound(false);

    try {
      console.log('before response');
      const response = await axios.get('http://localhost:5000/api/trailer/trailers', {
        params: {
          email: userex.email,
          _page: activePage,
          _limit: trailersPerPage,
        },
      });
      console.log('after response');
      const fetchedTrailers = response.data;
      setTrailers(fetchedTrailers);
      console.log(trailers);
      if (fetchedTrailers.length === 0) {
        setNotFound(true);
      }

      const totalCount = parseInt(response.headers['x-total-count'], 10);
      const totalPagesCount = Math.ceil(totalCount / trailersPerPage);
      setTotalPages(totalPagesCount);
    } catch (err) {
      setError('Error fetching trailers....');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activePage, trailersPerPage, userex.email]);

  useEffect(() => {
    fetchTrailers();
  }, [fetchTrailers]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const pagination = {
    email: userex.email,
    currPage: activePage,
    totalPages: totalPages,
    handlePageChange: handlePageChange,
  };

  return { trailers, loading, error, pagination, notFound };
};

export default useTrailers;

