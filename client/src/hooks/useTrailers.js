import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { useAuthContext } from './useAuthContext'; 

const useTrailers = (filterString = '') => {
  const [notFound, setNotFound] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const trailersPerPage = 6;
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const activePage = parseInt(searchParams.get('page')) || 1;

  const getTrailers = useCallback(async () => {
    if (!user) {
      console.log("No user found");
      return;
    }
    setLoading(true);
    setNotFound(false);

    try {
      console.log(filterString);
      console.log(`/trailer/trailers${filterString ? `/filter?${filterString}` : ''}`);
      const response = await api.get(`/trailer/trailers${filterString ? `/filter?${filterString}` : ''}`,{
      headers: {
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          age: user.age, // Pass the age parameter only
          _page: activePage,
          _limit: trailersPerPage
        
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
      if (err.code === 422){

      }
      setError('Error fetching trailers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activePage, trailersPerPage, user, filterString]);

  useEffect(() => {
    getTrailers();
  }, [getTrailers]);

  const handlePageChange = (page) => {
    setSearchParams({ page });
  };

  const pagination = {
    currPage: activePage,
    totalPages: totalPages,
    handlePageChange: handlePageChange,
  };

  return { trailers, setTrailers, loading, error, pagination, notFound };
};

export default useTrailers;
