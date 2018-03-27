import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import {
  firebaseTeams,
  firebaseArticles,
  firebaseLooper
} from '../../../firebase';
import styles from './newsList.css';
import Button from '../Buttons/Buttons';
import CardInfo from '../CardInfo/CardInfo';

class NewsList extends Component {
  state = {
    items: [],
    teams: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  };

  componentDidMount() {
    this.request(this.state.start, this.state.end);
  }

  request = (start, end) => {
    if (!this.state.teams.length) {
      firebaseTeams.once('value').then(snapshot => {
        const teams = firebaseLooper(snapshot);
        this.setState({ teams });
      });

      // axios
      //   .get(`${URL}/teams`)
      //   .then(response => this.setState({ teams: response.data }));
    }

    firebaseArticles
      .orderByChild('id')
      .startAt(start)
      .endAt(end)
      .once('value')
      .then(snapshot => {
        const articles = firebaseLooper(snapshot);
        this.setState({ items: [...this.state.items, ...articles], end });
      });
    // axios
    //   .get(`${URL}/articles?_start=${start}&_end=${end}`)
    //   .then(response =>
    //     this.setState({ items: [...this.state.items, ...response.data], end })
    //   );
  };

  loadMore = () => {
    const { end, amount } = this.state;
    this.request(end, end + amount);
  };

  renderNews = type => {
    let template = null;

    switch (type) {
      case 'card':
        template = this.state.items.map(({ id, title, team, date }) => (
          <CSSTransition
            classNames={{
              enter: styles.newsList_wrapper,
              enterActive: styles.newsList_wrapper_enter
            }}
            timeout={500}
            key={id}
          >
            <div className={styles.newslist_item}>
              <Link to={`/articles/${id}`}>
                <CardInfo teams={this.state.teams} team={team} date={date} />
                <h2>{title}</h2>
              </Link>
            </div>
          </CSSTransition>
        ));
        break;

      case 'cardMain':
        template = this.state.items.map(({ id, title, team, date, image }) => (
          <CSSTransition
            classNames={{
              enter: styles.newsList_wrapper,
              enterActive: styles.newsList_wrapper_enter
            }}
            timeout={500}
            key={id}
          >
            <Link to={`/articles/${id}`}>
              <div className={styles.flex_wrapper}>
                <div
                  className={styles.left}
                  style={{ background: `url(/images/articles/${image})` }}
                >
                  <div />
                </div>
                <div className={styles.right}>
                  <CardInfo teams={this.state.teams} team={team} date={date} />
                  <h2>{title}</h2>
                </div>
              </div>
            </Link>
          </CSSTransition>
        ));
        break;

      default:
        template = null;
    }

    return template;
  };

  render() {
    return (
      <div>
        <TransitionGroup component="div" className="list">
          {this.renderNews(this.props.type)}
        </TransitionGroup>

        <Button type="loadmore" loadMore={this.loadMore} cta="Load More News" />
      </div>
    );
  }
}

export default NewsList;
