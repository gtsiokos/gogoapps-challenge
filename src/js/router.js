import React, {useState, useCallback} from 'react';
import Loadable from 'react-loadable';

import ReactNotification from 'react-notifications-component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SpotifyApiContext } from 'react-spotify-api';

import LoginPage from './pages/login';

const Loading = ({error}) => {
  if(error) console.log(error);
  return (
    <span>loading...</span>
  );
};

let Router = () => {
  const HomePage            = Loadable({loader: () => import('./pages/home'), loading:Loading});
  const GenrePage           = Loadable({loader: () => import('./pages/genre'), loading:Loading});
  const Player              = Loadable({loader: () => import('./components/player'), loading:Loading});
  
  let [token, updateToken]  = useState();

  if(!token){
    return <LoginPage onSuccess={(token) => updateToken(token)} />;
  }

  return (
    <BrowserRouter>
      <SpotifyApiContext.Provider value={token}>

        <div className='container'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/search' component={HomePage} />
            <Route exact path='/genre/:category' component={GenrePage} />
            <Route exact path='/collection/playlists' component={HomePage} />
          </Switch>
          <Route component={Player} />
          <Route component={ReactNotification} />
        </div>

      </SpotifyApiContext.Provider>
    </BrowserRouter>
  );
}

export default Router;
