import React from 'react';
import TeamInfo from '../../Elements/TeamInfo';

const Header = ({ teamData }) => {
  const teamInfo = team => (team.id ? <TeamInfo team={team} /> : null);
  return <div>{teamInfo(teamData)}</div>;
};

export default Header;
