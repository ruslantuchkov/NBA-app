import React from 'react';
import moment from 'moment';
import styles from '../articles.css';

const formatDate = date => moment(date).format(' MM-DD-YYYY');

const PostData = ({ date, author }) => {
  return (
    <div className={styles.articlePostData}>
      <div>
        Date:
        <span>{formatDate(date)}</span>
      </div>
      <div>
        Author:
        <span>{author}</span>
      </div>
    </div>
  );
};

export default PostData;
