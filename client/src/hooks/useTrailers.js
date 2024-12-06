import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';

const useTrailers = (filterString = '') => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const trailersPerPage = 6;
  const { user } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = parseInt(searchParams.get('page')) || 1;

  const getTrailers = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await api.get(`/trailer/trailers${filterString ? `/filter?${filterString}` : ''}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        params: { age: user.age, _page: activePage, _limit: trailersPerPage },
      });

      const fetchedTrailers = response.data;
      setTrailers(fetchedTrailers);

      const totalCount = parseInt(response.headers['x-total-count'], 10);
      setTotalPages(Math.ceil(totalCount / trailersPerPage));
    } catch (err) {
      setError('Error fetching trailers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activePage, filterString, trailersPerPage, user]);

  useEffect(() => {
    getTrailers();
  }, [getTrailers]);

  const handlePageChange = (page) => {
    const searchParamsObj = { page };
    if (filterString) {
      const queryParams = new URLSearchParams(filterString);
      queryParams.forEach((value, key) => {
        searchParamsObj[key] = value;
      });
    }
    setSearchParams(searchParamsObj);
  };

  return {
    trailers,
    loading,
    error,
    pagination: { currPage: activePage, totalPages, handlePageChange },
  };
};

export default useTrailers;
