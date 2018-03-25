import React from 'react';
import { Link } from 'react-router-dom';
import styles from './buttons.css';

const Buttons = ({ type, loadMore, cta, linkTo }) => {
  let template = null;

  switch (type) {
    case 'loadmore':
      template = (
        <div className={styles.blue_btn} onClick={loadMore}>
          {cta}
        </div>
      );
      break;
    case 'linkTo':
      template = (
        <Link to={linkTo} className={styles.blue_btn}>
          {cta}
        </Link>
      );
      break;
    default:
      template = null;
  }

  return template;
};

export default Buttons;
