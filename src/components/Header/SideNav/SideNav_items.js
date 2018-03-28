import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { firebase } from '../../../firebase';
import styles from './sideNav.css';

const SideNavItems = props => {
  const items = [
    {
      type: styles.option,
      icon: 'home',
      text: 'Home',
      link: '/',
      login: ''
    },
    {
      type: styles.option,
      icon: 'file-text-o',
      text: 'News',
      link: '/news',
      login: ''
    },
    {
      type: styles.option,
      icon: 'play',
      text: 'Videos',
      link: '/videos',
      login: ''
    },
    {
      type: styles.option,
      icon: 'sign-in',
      text: 'Dashboard',
      link: '/dashboard',
      login: true
    },
    {
      type: styles.option,
      icon: 'sign-in',
      text: 'Sign in',
      link: '/sign-in',
      login: false
    },
    {
      type: styles.option,
      icon: 'sign-out',
      text: 'Sign out',
      link: '/sign-out',
      login: true
    }
  ];

  const element = (item, i) => (
    <Link to={item.link} key={i}>
      <div className={item.type}>
        <FontAwesome name={item.icon} />
        {item.text}
      </div>
    </Link>
  );

  const restricted = (item, i) => {
    let template = null;

    if (props.user === null && !item.login) {
      template = element(item, i);
    }

    if (props.user !== null && item.login) {
      if (item.link === '/sign-out') {
        template = (
          <div
            className={item.type}
            key={i}
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => props.history.push('/'));
            }}
          >
            <FontAwesome name={item.icon} />
            {item.text}
          </div>
        );
      } else {
        template = element(item, i);
      }
    }

    return template;
  };

  const showItems = () =>
    items.map(
      (item, i) => (item.login !== '' ? restricted(item, i) : element(item, i))
    );

  return <div>{showItems()}</div>;
};

export default withRouter(SideNavItems);
