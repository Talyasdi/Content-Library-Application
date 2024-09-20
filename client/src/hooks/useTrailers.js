import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {useAuthContext} from './useAuthContext'

// Custom hook to fetch and manage trailers
const useTrailers = () => {
  const [notFound, setNotFound] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const trailersPerPage = 2;
  const {user} = useAuthContext();  // Access user from auth context

  const getTrailers = useCallback(async () => {
    if (!user) {
      console.log("No user found");
      return;
    }
    setLoading(true);
    setNotFound(false);

    try {
      const response = await axios.get('http://localhost:5000/api/trailer/trailers', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          age: user.age,   // Pass the age parameter only
          _page: activePage,
          _limit: trailersPerPage,
        },
      });

      const fetchedTrailers = response.data;
      setTrailers(fetchedTrailers);

      if (fetchedTrailers.length === 0) {
        setNotFound(true);
      }

      const totalCount = parseInt(response.headers['x-total-count'], 10);
      const totalPagesCount = Math.ceil(totalCount / trailersPerPage);
      setTotalPages(totalPagesCount);
    } catch (err) {
      setError('Error fetching trailers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activePage, trailersPerPage, user.age]);

  useEffect(() => {
    getTrailers();
  }, [getTrailers]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const pagination = {
    currPage: activePage,
    totalPages: totalPages,
    handlePageChange: handlePageChange,
  };

  return { trailers, loading, error, pagination, notFound };
};

export default useTrailers;
