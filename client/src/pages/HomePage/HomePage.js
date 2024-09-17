import React from 'react';
import styles from './Home.module.css';
import LibraryView from '../LibraryViewPage/LibraryViewPage';
import FirstButton from '../../components/common/FirstButton/FirstButton';
import { Link } from 'react-router-dom';
//import {handleClick} from '../LibraryViewPage/LibraryViewPage';

const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Duck It</h1>
      {/* <LibraryView blogs={blogs} title="All Blogs" /> */}
      {/* <Link to={`/trailers/`} className={styles.trailerLink}> */}
      {/* <FirstButton >Trailers Library</FirstButton> */}
      <LibraryView /> 
      {/* </Link> */}
    </div>
  );
};

export default Home;
