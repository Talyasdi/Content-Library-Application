import React from 'react';
import FilterSortBox from '../components/FilterAndSort/FilterAndSortBox';
import TrailerForm from '../../components/TrailerForm'


const Home = () => {
  return (
    <div className="home">
       <div>	
        <FilterBox />
       </div> 
       <TrailerForm/> 
    </div>  
  )
}


export default Home