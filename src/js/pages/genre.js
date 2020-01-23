import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import {useScroll} from 'react-use';
import {useParams} from 'react-router-dom';

import MainNav from '../components/main.nav';
import MainHeader from '../components/main.header';
import {MainCategory} from '../components/main.categories';
import styles from '../../css/main.css';

const GenrePage = (props) => {
  const ref = useRef(null);
  const {min} = Math;
  const {x,y} = useScroll(ref);
  const {category} = useParams();

  return (
    <div className={styles.container}>
      <MainNav />
      <div className={styles.panel}>
        <div ref={ref} className={styles.panelScroll}>
          <MainHeader bgStyle={{'opacity': min(1,y)}} />
          <MainCategory key={category} id={category} />
        </div>
      </div>
    </div>
  );
};

export default GenrePage;