import { createStore } from 'react-sweet-state';

import {parse} from 'query-string';
import {union, unionBy} from 'lodash';

import api from '../services/api';

let initialState = {
  player: {
    playlist: '',
    track: '',
  },
  auth: {
    token: '',
    scopes: [
      'streaming', 
      'user-read-email', 
      'user-read-private', 
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-library-read',
      'user-library-modify'
    ]
  }
}

let actions = {
  setToken: (token) => ({setState, getState}) => {
    let {auth} = getState();

    setState({
      auth: {
        ...auth,
        token
      }
    });
  },
  setPlaylist: (playlist) => ({setState, getState}) => {
    let {player} = getState();
    
    if(player.playlist === playlist) return;

    setState({
      player: {
        ...player,
        playlist
      }
    });
  },
  setTrack: (track) => ({setState, getState}) => {
    let {player} = getState();
    
    if(player.track === track) return;

    setState({
      player: {
        ...player,
        track
      }
    });
  }
}

export default createStore({initialState, actions});