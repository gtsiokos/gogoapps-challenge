import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import SpotifyLogin from 'react-spotify-login';

import {useSpotifyToken, useSpotifyScopes} from '../hooks';
import MainIcon from '../components/main.icon';

import styles from '../../css/login.css';

const LoginPage = (props) => {
  let [token, {setToken}] = useSpotifyToken();
  let [scopes] = useSpotifyScopes();

  if(token) {
    props.onSuccess(token);
  }

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.panelIcon}>
         <MainIcon />
        </div>
        <SpotifyLogin 
          buttonText={'CONNECT'}
          scope={scopes.join(' ')}
          className={styles.panelBtn}
          clientId={process.env.SPOTIFY_CLIENT_ID}
          redirectUri={process.env.SPOTIFY_REDIRECT_URI}
          onSuccess={({access_token}) => {
            setToken(access_token);
            props.onSuccess(access_token);
          }}
          onFailure={response => console.log(response)}
        />
      </div>
    </div>
  );
};

export default LoginPage;