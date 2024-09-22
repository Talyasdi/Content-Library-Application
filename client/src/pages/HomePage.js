import React from 'react';
import FilterSortBox from '../components/FilterAndSort/FilterAndSortBox';
import LibraryView from './LibraryViewPage/LibraryViewPage';

const Home = () => {
  return (
    <div className="home">
      {/* <div className={styles.FilterBox}>  */}
        <FilterSortBox /> 
      {/* </div> */}
      {/* <div className={styles.LibraryViewBox}>  */}
        <LibraryView /> 
      {/* </div> */}
    </div>
  );
};

export default Home;