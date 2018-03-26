import React from 'react';
import styles from '../videosList.css';
import VideosListTemplate from '../VideosListTemplate';

const VideosRelated = props => {
  return (
    <div className={styles.relatedWrapper}>
      <VideosListTemplate {...props} />
    </div>
  );
};

export default VideosRelated;
