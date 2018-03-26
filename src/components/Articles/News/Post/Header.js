import React from 'react';
import TeamInfo from '../../Elements/TeamInfo';
import PostData from '../../Elements/PostData';

const Header = ({ teamData, date, author }) => {
  const teamInfo = team => (team ? <TeamInfo team={team} /> : null);

  const postData = (date, author) => <PostData date={date} author={author} />;

  return (
    <div>
      {teamInfo(teamData)}
      {postData(date, author)}
    </div>
  );
};

export default Header;
