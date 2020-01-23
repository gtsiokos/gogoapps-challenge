import { createHook } from 'react-sweet-state';

import Store from './store/index';

let useSpotify = createHook(Store.Spotify);
let useSpotifyToken = createHook(Store.Spotify, {selector: state => state.auth.token});
let useSpotifyScopes = createHook(Store.Spotify, {selector: state => state.auth.scopes});
let useSpotifyTrack = createHook(Store.Spotify, {selector: state => state.player.track});
let useSpotifyPlaylist = createHook(Store.Spotify, {selector: state => state.player.playlist});

export {
  useSpotify,
  useSpotifyToken,
  useSpotifyScopes,
  useSpotifyTrack,
  useSpotifyPlaylist,
};