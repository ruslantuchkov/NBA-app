import React from 'react';
import styles from '../articles.css';

const TeamInfo = ({ team }) => {
  return (
    <div className={styles.articleTeamHeader}>
      <div
        className={styles.left}
        style={{ background: `url(/images/teams/${team.logo})` }}
      />
      <div className={styles.right}>
        <div>
          <span>
            {team.city} {team.name}
          </span>
        </div>
        <div>
          <strong>
            W{team.stats && team.stats[0].wins}-L{team.stats &&
              team.stats[0].defeats}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
