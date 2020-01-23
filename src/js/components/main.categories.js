import React, {memo} from 'react';
import ReactDOM from 'react-dom';
import striptags from 'striptags';
import {NavLink} from 'react-router-dom';
import {
  BrowseCategory,
  BrowseCategories,
  BrowseCategoryPlaylists
} from 'react-spotify-api';

import {useSpotifyPlaylist} from '../hooks';


import styles from '../../css/main.categories.css';

const MainCategoryItem = (props) => {
  let [, {setPlaylist}] = useSpotifyPlaylist();

  let cover = props.images[0].url;

  return (
    <div className={styles.categoryItem}>
      <div className={styles.categoryItemCover} style={{backgroundImage:`url(${cover})`}} />
      <div className={styles.categoryItemInfo}>
        <h3 className={styles.categoryItemName}>
          {props.name}
        </h3>
        <div className={styles.categoryItemDescription}>
          {striptags(props.description)}
        </div>
      </div>
      <div className={styles.categoryItemButtonPlayback}>
        <button onClick={(ev) => setPlaylist(props.id)}>
          <span className={'fa fa-play'}></span>
        </button>
      </div>
    </div>
  );
};

const MainCategory = (props) => (
  <BrowseCategory id={props.id}>
  {
    (category, loading, error) => {
      if(!category) return null;

      return (
        <BrowseCategoryPlaylists id={props.id}>
        {
          (payload, loading, error) => {
            if(!payload) return null;
            if(!payload.playlists.items.length) return null;
            
            let playlists = payload.playlists.items;
            let limit = props.limit ? Number(props.limit) : null;
            let hasCategoryLink = limit && (playlists.length > limit);

            if(limit){
              playlists.length = limit;
            }
            
            return (
              <div className={styles.category}>
                <div className={styles.categoryName}>
                  <h2>{category.name}</h2>
                </div>
                <div className={styles.categoryLink}>
                  <NavLink 
                    exact
                    style={hasCategoryLink ? {} : {display:'none'}} 
                    tabIndex={-1} 
                    to={`/genre/${props.id}`}>
                    <span>{'SEE ALL'}</span>
                  </NavLink>
                </div>
                <React.Fragment>
                {
                  playlists.map(playlist => 
                    <MainCategoryItem key={playlist.id} {...playlist} />
                  )
                }
                </React.Fragment>
              </div>
            );
          }
        }
        </BrowseCategoryPlaylists>
      );
    }
  }
  </BrowseCategory>
);

const MainCategories = memo((props) => (
  <BrowseCategories>
  { (payload, loading, error) => {
      if(!payload) return null;

      let categories = payload.categories.items;

      return (
        <React.Fragment>
        {
          categories.map(category => <MainCategory key={category.id} id={category.id} limit={6} />)
        }
        </React.Fragment>
      );
    }
  }
  </BrowseCategories>
));

export {
  MainCategory,
  MainCategories,
  MemoMainCategories
};