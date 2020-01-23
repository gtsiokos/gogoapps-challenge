import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';

import MainIcon from './main.icon';

import styles from '../../css/main.nav.css';

const MainNav = (props) => {

  return (
    <div className={styles.panel}>
      <NavLink 
        exact
        className={styles.iconLink}
        tabIndex={-1} 
        to={'/'}>
        <div className={styles.icon}>
          <MainIcon />
        </div>
      </NavLink>
      <div className={styles.nav}>
        <NavLink 
          exact
          tabIndex={-1} 
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
          to={'/'}>
          <span className={'fa fa-home'} />
          <span>Home</span>
        </NavLink>
        <NavLink 
          exact
          tabIndex={-1} 
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
          to={'/search'}>
          <span className={'fa fa-search'} />
          <span>Search</span>
        </NavLink>
        <NavLink 
          exact
          tabIndex={-1} 
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
          to={'/collection/playlists'}>
          <span className={'fa fa-headphones'} />
          <span>Your Library</span>
        </NavLink>
      </div>
    </div>
  );
};

export default MainNav;