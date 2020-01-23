import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Viewport from './ui/viewport';

import '../css/base.css';

const render = Router => {
  ReactDOM.render(
    <AppContainer>
      <Viewport portrait={[1280,800]} landscape={[1280,800]}>
          <Router />
      </Viewport>
    </AppContainer>,
    document.querySelector('#root')
  )
};

const load = () => {
  import('./router').then(router => render(router.default));
};

if(module.hot) {
  module.hot.accept('./router', () => load());
}

load();