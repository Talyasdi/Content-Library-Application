import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { useAuthContext } from './useAuthContext'; 

const useTrailers = () => {
  const [notFound, setNotFound] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const trailersPerPage = 2;
  const { user } = useAuthContext();  
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get the current page from URL query params (default to page 1 if not found)
  const activePage = parseInt(searchParams.get('page')) || 1;

  const getTrailers = useCallback(async () => {
    if (!user) {
      console.log("No user found");
      return;
    }
    setLoading(true);
    setNotFound(false);

    try {
      const response = await api.get(`/trailer/trailers`,{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          age: user.age,  // Pass the age parameter only
          _page: activePage,
          _limit: trailersPerPage,
        },
      });

      const fetchedTrailers = response.data;
      setTrailers(fetchedTrailers);

      if (fetchedTrailers.length === 0) {
        setNotFound(true);
      }

      // Parse the total count from headers and calculate total pages
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

  // Handle page change and update URL
  const handlePageChange = (page) => {
    setSearchParams({ page });  // Update URL query param
  };

  const pagination = {
    currPage: activePage,
    totalPages: totalPages,
    handlePageChange: handlePageChange,
  };

  return { trailers, loading, error, pagination, notFound };
};

export default useTrailers;