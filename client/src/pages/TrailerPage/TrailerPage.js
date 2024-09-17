import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TrailerContext } from '../../context/TrailerContext';
import ItemView from '../../components/ItemView/ItemView';

const TrailerPage = () => {
  const { trailerName } = useParams(); // Get trailerName from URL
  const { trailer, setTrailerName } = useContext(TrailerContext); // Get context values

  useEffect(() => {
    setTrailerName(trailerName); // Set trailerName to trigger fetch
  }, [trailerName, setTrailerName]);

  if (!trailer) {
    return <div>Loading...</div>;
  }

  return <ItemView item={trailer} />;
};

export default TrailerPage;

