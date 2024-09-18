import { useState, useEffect,useCallback } from 'react';
import api from '../services/api';
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
    const userEmail = 'userName1@example.com';

  //const getAllTrailers = async () => {
  const fetchTrailers = useCallback(async () => {
    setLoading(true);
    setNotFound(false); 
  
    try {
      // const response = await api.get('/trailer/trailers',{
        const response = await axios.get(`http://localhost:5000/api/trailer/email?email=${userEmail}`, {
      params:{
          _page:activePage,
          _limit: trailersPerPage,
        },
      });
      const fetchedTrailers = response.data;
      setTrailers(fetchedTrailers);
      // setTrailers(response.data);
      if(trailers.length === 0){
        setNotFound(true);
      }
      const totalCount = parseInt(response.headers['x-total-count']);
      const totalPagesCount = Math.ceil(totalCount / trailersPerPage);
      setTotalPages(totalPagesCount);
    } catch (err) {
      setError('Error fetching trailers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  },[activePage, trailersPerPage, userEmail]);

  useEffect(() => {
    fetchTrailers();
  }, [fetchTrailers]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };
  
  const pagination = {
    currPage: activePage,
    totalPages: totalPages,
    handlePageChange: handlePageChange
  };

  return { trailers, loading, error, pagination, notFound };
};

export default useTrailers;
