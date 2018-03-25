import React from 'react';
import FontAwesome from 'react-fontawesome';
import styles from './cardInfo.css';

const CardInfo = ({ date, teams, team }) => {
  const teamName = (teams, team) => {
    let data = teams.find(({ id }) => id === team);
    if (data) return data.name;
  };

  return (
    <div className={styles.cardInfo}>
      <span className={styles.teamName}>{teamName(teams, team)}</span>
      <span className={styles.date}>
        <FontAwesome name="clock-o" />
        {date}
      </span>
    </div>
  );
};

export default CardInfo;
