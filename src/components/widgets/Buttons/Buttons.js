import React from 'react';
import { Link } from 'react-router-dom';
import styles from './buttons.css';

const Buttons = ({ type, loadMore, cta }) => {
  let template = null;

  switch (type) {
    case 'loadmore':
      template = (
        <div className={styles.blue_btn} onClick={loadMore}>
          {cta}
        </div>
      );
      break;
    default:
      template = null;
  }

  return template;
};

export default Buttons;
