import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink, useHistory} from 'react-router-dom';

import SearchInput from './search.input';
import {
  MainHeaderGoBackIcon, 
  MainHeaderGoForwardIcon
} from './main.header.icons';

import styles from '../../css/main.header.css';

const MainHeader = (props) => {
  const history = useHistory();
  const {pathname} = history.location;

  return (
    <div className={styles.panel}>
      <div className={styles.bg} style={props.bgStyle}></div>
      <div className={styles.panelSection}>
        <div className={styles.history}>
          <button onClick={(ev) => history.goBack()} className={styles.historyIcon}>
            <MainHeaderGoBackIcon />
          </button>
          <button onClick={(ev) => history.goForward()} className={styles.historyIcon}>
            <MainHeaderGoForwardIcon />
          </button>
        </div>
        {
          pathname === '/search'
          ? <SearchInput />
          : null
        }
      </div>
      <div className={styles.panelSection}>
        <a href={'https://github.com/gtsiokos'}>
          <button className={styles.upgradeBtn}>
            {'UPGRADE'}
          </button>
        </a>
      </div>
    </div>
  );
};

export default MainHeader;