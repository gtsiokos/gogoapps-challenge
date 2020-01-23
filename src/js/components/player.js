import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Playlist} from 'react-spotify-api';

import {useAudio} from 'react-use';
import {useSpotifyPlaylist, useSpotifyTrack} from '../hooks';
import styles from '../../css/player.css';

const Player = (props) => {
  let [playlistId]                    = useSpotifyPlaylist();
  let [trackId, {setTrack}]           = useSpotifyTrack();
  let [trackCursor, setTrackCursor]   = useState(0);
  let [trackRepeat, setTrackRepeat]   = useState(false);
  let [trackShuffle, setTrackShuffle] = useState(false);
  let [playlist, setPlaylist]         = useState({id:'', tracks:{ items:[] }});
  
  let updateTracks = (playlist) => {
    return playlist.tracks.items.filter(o => o.track && o.track.preview_url).map(o => o.track);
  };

  let updatePlaylist = (playlist, loading, error) => {
    if(loading) return null;
    if(!playlist) return null;
    
    setPlaylist(playlist);
    setTrackCursor(0);

    tracks = updateTracks(playlist);
    if(tracks.length) setTrack(tracks[0].id);
    return null;
  };

  let getTrackCursor = (step) => {
    let {floor, random} = Math;

    return (trackShuffle)
      ? floor(random()*tracks.length)
      : trackCursor + step;
  }

  let prevTrack = (ev) => {
    if(trackRepeat){
      controls.seek(0);
      controls.play();
      return;
    }

    let idx = Math.max(getTrackCursor(-1), 0);
    let track = tracks[idx];
    setTrackCursor(idx);
    setTrack(track.id);
  };

  let nextTrack = (ev) => {
    if(trackRepeat){
      controls.seek(0);
      controls.play();
      return;
    }

    let idx = Math.min(getTrackCursor(1), tracks.length-1);
    let track = tracks[idx];
    setTrackCursor(idx);
    setTrack(track.id);
  };

  let shuffleTrack = () => {
    setTrackShuffle(!trackShuffle);
  };

  let repeatTrack = () => {
    setTrackRepeat(!trackRepeat);
  };

  let renderTrack = (track) => {
    if(!track) return null;

    let cover = track.album.images[track.album.images.length-1].url;
    let artists = track.artists.map(artist => artist.name).join(', ');

    return (
      <React.Fragment>
        <div className={styles.trackCover} style={{backgroundImage:`url(${cover})`}} />
        <div className={styles.trackInfo}>
          <div className={styles.trackInfoName}>{track.name}</div>
          <div className={styles.trackInfoArtists}>{artists}</div>
        </div>
      </React.Fragment>
    );
  };
  
  let tracks = updateTracks(playlist);
  let track = tracks.find(o => o.id === trackId);
  let [audio, state, controls, ref] = useAudio({
    src: track ? track.preview_url : '',
    autoPlay: true,
    crossOrigin: 'anonymous',
    onEnded: (ev) => nextTrack()
  });

  /*
  useEffect(() => {
    console.log(track);
  }, [trackId]);
  */
  return (
    <div className={styles.panel}>
      {
        playlist.id == playlistId ? null : <Playlist id={playlistId}>{updatePlaylist}</Playlist>
      }
      <div className={styles.panelLeft}>
      {renderTrack(track)}
      </div>
      <div className={styles.panelCenter}>
        <div style={{position:'absolute', right:0}}>{audio}</div>
        <div className={styles.controls}>
          <div className={styles.controlButtons}>
            <div className={
              (trackShuffle) 
              ? styles.controlButtonActive 
              : styles.controlButton
            }>
              <button onClick={() => shuffleTrack()}>
                <span className={'fa fa-random'} />
              </button>
            </div>
            <div className={
              (trackCursor === 0) 
                ? styles.controlButtonDisabled 
                : styles.controlButton
            }>
              <button onClick={() => prevTrack()}>
                <span className={'fa fa-step-backward'} />
              </button>
            </div>
            <div className={styles.controlButtonPlayback}>
            {
              state.paused
              ? <button onClick={() => controls.play()}>
                  <span className={'fa fa-play-circle-o'} />
                </button>
              : <button onClick={() => controls.pause()}>
                  <span className={'fa fa-pause-circle-o'} />
                </button>
            }
            </div>
            <div className={
              (trackCursor === tracks.length-1) 
                ? styles.controlButtonDisabled 
                : styles.controlButton
            }>
              <button onClick={() => nextTrack()}>
                <span className={'fa fa-step-forward'} />
              </button>
            </div>
            <div className={trackRepeat ? styles.controlButtonActive : styles.controlButton}>
              <button onClick={() => repeatTrack()}>
                <span className={'fa fa-retweet'} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.panelRight}></div>
    </div>
  );
};

export default Player;