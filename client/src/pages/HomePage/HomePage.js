import React from 'react';
import styles from './Home.module.css';
import FilterBox from '../../components/FilterAndSort/FilterBox';


const Home = () => {
  return (
    <div className={styles.home}>
      <FilterBox />
    </div>
  );
};

export default Home;