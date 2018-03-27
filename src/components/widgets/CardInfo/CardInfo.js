import React from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import styles from './cardInfo.css';

const CardInfo = ({ date, teams, team }) => {
  const teamName = (teams, team) => {
    let data = teams.find(({ id }) => +id === team - 1);
    if (data) return data.name;
  };

  const formatDate = date => moment(date).format(' MM-DD-YYYY');

  return (
    <div className={styles.cardInfo}>
      <span className={styles.teamName}>{teamName(teams, team)}</span>
      <span className={styles.date}>
        <FontAwesome name="clock-o" />
        {formatDate(date)}
      </span>
    </div>
  );
};

export default CardInfo;
