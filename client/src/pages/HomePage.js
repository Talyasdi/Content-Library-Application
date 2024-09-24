import React from 'react';
import FilterSortBox from '../components/FilterAndSort/FilterAndSortBox';
import LibraryView from './LibraryViewPage/LibraryViewPage';

const Home = () => {
  return (
    <div className="home">
      <FilterSortBox />
      <LibraryView />
    </div>
  );
};

export default Home;