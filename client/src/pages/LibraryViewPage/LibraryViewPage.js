import React from 'react';
import Trailer from '../../components/TrailerLibraryView/TrailerView';
import Pagination from '../../components/Pagination/Pagination';

const LibraryView = ({ trailers = [], loading, error, notFound, pagination = {} }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading trailers: {error.message}</p>;
  if (notFound) return <p>No trailers found.</p>;

  // Ensure trailers is an array before mapping
  const trailerList = Array.isArray(trailers) ? trailers : [];

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {trailerList.map((trailer) => (
          <Trailer key={trailer._id} trailer={trailer} />
        ))}
      </div>
      
      <div className="pagination">
        <Pagination pagination={pagination} />
      </div>
    </div>
  );
};

export default LibraryView;
