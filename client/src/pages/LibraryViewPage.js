import useTrailers from '../hooks/useTrailers';
import Trailer from '../components/TrailerLibraryView/TrailerView';
import Pagination from '../components/Pagination/Pagination';
import styles from '../styles/index.css';
//import styles from './LibraryView.module.css';

const LibraryView = () => {
  const { trailers, loading, error, pagination, notFound } = useTrailers();

  return (
    <div>
    {error && <p>{error}</p>}
    {
      trailers.length > 0 ? (
        <div className={styles.pageContainer}>
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', margin: '0 auto', 
          display: 'gird',justifyContent: 'center'
        }}>
        <div  className={styles.trailersContainer}>
         {trailers.map((trailer) => (
          // <div key={trailer._id}>
          <li key={trailer._id}>
            <Trailer trailer={trailer} />
            {/* </div> */}
            </li>
          ))}
        </div>
        </ul>
        <div className="pagination">
          <Pagination
              pagination={pagination}
          />
        </div>
  
      </div>
      ) : loading ? (
        <p>Loading Trailers...</p>

  ): (
    // this will appear on screen for ms before updating loading and trailers
    <p>No appropriate trailers found for this user.</p> 
  )
  }
    
  </div>
  );
};

export default LibraryView;

// import useTrailers from '../hooks/useTrailers';
// import Trailer from '../components/TrailerLibraryView/TrailerView';
// import Pagination from '../components/Pagination/Pagination';
// import styles from '../styles/index.css';

// const LibraryView = () => {
//   const { trailers, loading, error, pagination, notFound } = useTrailers();

//   return (
//     <div>
//       {error && <p>{error}</p>}
//       {
//         trailers.length > 0 ? (
//           <div className={styles.pageContainer}>
//             <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', margin: '0 auto' }}>
//               <div className={styles.trailersContainer}>
//                 {trailers.map((trailer) => (
//                   <li key={trailer._id} className={styles.trailerItem}>
//                     <Trailer trailer={trailer} />
//                   </li>
//                 ))}
//               </div>
//             </ul>
//             <div className={styles.pagination}>
//               <Pagination pagination={pagination} />
//             </div>
//           </div>
//         ) : loading ? (
//           <p>Loading Trailers...</p>
//         ) : (
//           <p>No appropriate trailers found for this user.</p>
//         )
//       }
//     </div>
//   );
// };

// export default LibraryView;
