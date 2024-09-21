// import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { TrailerContext } from '../context/TrailerContext';
import ItemView from '../components/ItemView/ItemView';
import Trailer from '../components/Trailer/Trailer';
import useTrailer from '../hooks/useTrailer';

const TrailerPage = () => {
   const { id } = useParams(); // Get trailerName from URL
  //  const { trailer, setTrailerId } = useContext(TrailerContext); // Get context values

  const { trailer, loading, error} = useTrailer(id);
  // useEffect(() => {
  //   setTrailerId(id); // Set trailerName to trigger fetch
  // }, [id, setTrailerId]);

  // if (!trailer) {
  //   return <div>Loading...</div>; //use not found if you try to pass not found id
  // }
   return (
    <div>
      {error && <p>{error}</p>}
      {
        
        trailer ? (
          <ItemView trailer={trailer} />
        ) : loading ? (
          <p>Loading Trailer...</p>
        ) : ( 
          <p>No trailer found</p> 
        )
      }
    </div>
  

   )

};

export default TrailerPage;

// import React, { useContext, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { TrailerContext } from '../../context/TrailerContext';
// import ItemView from '../../components/ItemView/ItemView';
// import useTrailer from '../../hooks/useTrailer';

// // const TrailerPage = () => {
// //   const { id } = useParams(); 
// //   const { trailer, loading, error } = useTrailer(id);

// //   if (loading) return <p>Loading Trailer...</p>;
// //   if (!trailer) return <p>No trailer found</p>; // If the trailer is null or undefined
// //   if (error) return <p>{error}</p>;

// //   return <ItemView item={trailer} />;
// // };

// // export default TrailerPage;
