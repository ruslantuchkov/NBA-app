import React from 'react';
import { Link } from 'react-router-dom';
import CardInfo from '../CardInfo/CardInfo';
import styles from './videosList.css';

const VideosListTemplate = ({ data, teams }) => {
  return data.map(({ id, image, title, team, date }) => (
    <Link to={`/videos/${id}`} key={id}>
      <div className={styles.videosListItem_wrapper}>
        <div
          className={styles.left}
          style={{ background: `url(/images/videos/${image})` }}
        >
          <div />
        </div>
        <div className={styles.right}>
          <CardInfo teams={teams} team={team} date={date} />
          <h2>{title}</h2>
        </div>
      </div>
    </Link>
  ));
};

export default VideosListTemplate;
