import { createSubscriber } from 'react-sweet-state';

import Store from './store/index';

let Spotify = createSubscriber(Store.Spotify);

export {
  Spotify
};

