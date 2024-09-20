import React from 'react';
import styles from './Home.module.css';
import FilterBox from '../../components/FilterAndSort/FilterBox';
// import SortBox from '../../components/FilterAndSort/SortBox';


const Home = () => {
  return (
    <div className={styles.home}>
      <FilterBox />
      </div>
  );
};

export default Home;