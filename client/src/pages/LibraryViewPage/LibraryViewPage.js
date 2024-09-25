import React from 'react';
import Trailer from '../../components/TrailerLibraryView/TrailerView';
import Pagination from '../../components/Pagination/Pagination';

const LibraryView = ({ trailers, loading, error, notFound, pagination }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading trailers: {error.message}</p>;
  if (notFound) return <p>No trailers found.</p>;

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {trailers.map((trailer) => (
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
