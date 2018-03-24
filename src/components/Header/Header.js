import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import SideNav from './SideNav/SideNav';
import styles from './header.css';

const Header = props => {
  const logo = () => (
    <Link to="/" className={styles.logo}>
      <img alt="nba logo" src="/images/nba_logo.png" />
    </Link>
  );
  const navBars = () => (
    <div className={styles.bars}>
      <FontAwesome
        onClick={props.onOpenNav}
        name="bars"
        style={{
          color: '#dfdfdf',
          padding: '10px',
          cursor: 'pointer'
        }}
      />
    </div>
  );

  return (
    <header className={styles.header}>
      <SideNav {...props} />
      <div className={styles.headerOpt}>
        {navBars()}
        {logo()}
      </div>
    </header>
  );
};

export default Header;
