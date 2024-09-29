import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useSearchParams , useNavigate } from 'react-router-dom';
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
  const userAge = user.age;
  const activePage = parseInt(searchParams.get('page')) || 1;
  const navigate = useNavigate();

  // const filters = {
  //   genres: searchParams.get('genres')?.split(','),
  //   minAgeLimit: searchParams.get('minAgeLimit'),
  //   releaseYear: searchParams.get('releaseYear'),
  // };

  const getTrailers = useCallback(async () => {
    if (!user) {
      console.log("No user found");
      return;
    }
    setLoading(true);
    setNotFound(false);

    try {
      // const params = {
      //   age: user.age,
      //   _page: activePage,
      //   _limit: trailersPerPage,
      // };

      // Object.keys(filters).forEach((key) => {
      //   if (filters[key]) {
      //     params[key] = filters[key];
      //   }
      // });

      // const response = await api.get('/trailer/trailers/filter', {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      //   params,
      // });
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
  }, [activePage, trailersPerPage, userAge, filterString]);
  //[user, filterString, activePage]);

  useEffect(() => {
    getTrailers();
  }, [getTrailers]);
  //[getTrailers,filterString]);

  // const handlePageChange = (page) => {
  //   setSearchParams({ page });
  // };

  // const handlePageChange = (page) => {
  //   // Append the filters to the search params
  //   const searchParamsObj = {
  //     page,
  //     genres: filterString.genres,
  //     minAgeLimit: filterString.minAgeLimit,
  //     releaseYear: filterString.releaseYear
  //   };
  //   setSearchParams(searchParamsObj);
  // };

  
//   const handlePageChange = (page) => {
//   const searchParamsObj = { page };

//   if (filterString && filterString.genres) { //filters instead of filterString 
//     searchParamsObj.genres = filterString.genres;
//   }
//   if (filterString && filterString.minAgeLimit) {
//     searchParamsObj.minAgeLimit = filterString.minAgeLimit;
//   }
//   if (filterString && filterString.releaseYear) {
//     searchParamsObj.releaseYear = filterString.releaseYear;
//   }

//   setSearchParams(searchParamsObj);
// };

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


  const pagination = {
    currPage: activePage,
    totalPages: totalPages,
    handlePageChange: handlePageChange,
  };

  return { trailers, loading, error, pagination, notFound, filterString};
};

export default useTrailers;