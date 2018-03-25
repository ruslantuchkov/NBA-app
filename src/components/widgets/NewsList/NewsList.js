import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../config';
import styles from './newsList.css';
import Button from '../Buttons/Buttons';

class NewsList extends Component {
  state = {
    items: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  };

  componentDidMount() {
    this.request(this.state.start, this.state.end);
  }

  request = (start, end) => {
    axios
      .get(`${URL}/articles?_start=${start}&_end=${end}`)
      .then(response =>
        this.setState({ items: [...this.state.items, ...response.data] })
      );
  };

  loadMore = () => {
    const { end, amount } = this.state;
    this.request(end, end + amount);
    this.setState({ end: end + amount });
  };

  renderNews = type => {
    let template = null;

    switch (type) {
      case 'card':
        template = this.state.items.map(({ id, title }) => (
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
                <h2>{title}</h2>
              </Link>
            </div>
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
