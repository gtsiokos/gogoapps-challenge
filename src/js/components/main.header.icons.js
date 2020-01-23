import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';


import styles from '../../css/main.header.css';

const MainHeaderGoBackIcon = () => (
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"></path>
  </svg>
);

const MainHeaderGoForwardIcon = () => (
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"></path>
  </svg>
);

export {
  MainHeaderGoBackIcon,
  MainHeaderGoForwardIcon
};