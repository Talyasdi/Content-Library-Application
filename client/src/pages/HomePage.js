import React from 'react';
import FilterSortBox from '../components/FilterAndSort/FilterAndSortBox';
import LibraryView from './LibraryViewPage/LibraryViewPage';

const Home = ({ successMessage }) => { // Receive success message as prop
  return (
    <div className="home">
      <FilterSortBox />
      {successMessage && <div className="success">{successMessage}</div>} {/* Display success message */}
      <LibraryView />
    </div>    
  );
};

export default Home;
