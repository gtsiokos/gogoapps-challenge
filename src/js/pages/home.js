import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import {useScroll} from 'react-use';

import MainNav from '../components/main.nav';
import MainHeader from '../components/main.header';
import {MainCategories} from '../components/main.categories';
import styles from '../../css/main.css';

const HomePage = (props) => {
  const ref = useRef(null);
  const {min} = Math;
  const {x,y} = useScroll(ref);

  return (
    <div className={styles.container}>
      <MainNav />
      <div className={styles.panel}>
        <div ref={ref} className={styles.panelScroll}>
          <MainHeader bgStyle={{'opacity': min(1,y)}} />
          <MainCategories />
        </div>
      </div>
    </div>
  );
};

export default HomePage;