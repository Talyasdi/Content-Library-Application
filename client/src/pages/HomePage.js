import React from 'react';
import styles from './Home.module.css';
import FilterBox from '../../components/FilterAndSort/FilterBox';
import TrailerForm from '../../components/TrailerForm'



const Home = () => {
  return (
    <div className={styles.home}>
       <div>	
        <FilterBox />
       </div> 
       <TrailerForm/> 
    </div>  
  )
}

export default Home