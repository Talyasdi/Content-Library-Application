import React from 'react';
import FilterSortBox from '../components/FilterAndSort/FilterAndSortBox';
import LibraryView from './LibraryViewPage/LibraryViewPage';

const Home = () => { // Receive success message as prop
  return (
    <div className="home">
      <FilterSortBox />
    </div>    
  );
};

export default Home;


