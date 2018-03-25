import React, { Component } from 'react';
import axios from 'axios';
import { URL } from '../../../config';
import styles from './videosList.css';
import Button from '../Buttons/Buttons';
import VideosListTemplate from './VideosListTemplate';

class VideosList extends Component {
  state = {
    teams: [],
    videos: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  };

  componentDidMount() {
    this.request(this.state.start, this.state.end);
  }

  request = (start, end) => {
    if (!this.state.teams.length) {
      axios
        .get(`${URL}/teams`)
        .then(response => this.setState({ teams: response.data }));
    }

    axios
      .get(`${URL}/videos?_start=${start}&_end=${end}`)
      .then(response =>
        this.setState({ videos: [...this.state.videos, ...response.data], end })
      );
  };

  loadMore = () => {
    const { end, amount } = this.state;
    this.request(end, end + amount);
  };

  renderVideos = () => {
    let template = null;

    switch (this.props.type) {
      case 'card':
        template = (
          <VideosListTemplate
            data={this.state.videos}
            teams={this.state.teams}
          />
        );
        break;
      default:
        template = null;
    }

    return template;
  };

  renderTitle = () => {
    return this.props.title ? (
      <h3>
        <strong>NBA</strong> Videos
      </h3>
    ) : null;
  };

  renderButton = () => {
    return this.props.loadmore ? (
      <Button type="loadmore" loadMore={this.loadMore} cta="Load More Videos" />
    ) : (
      <Button type="linkTo" cta="More Videos" linkTo="/videos" />
    );
  };

  render() {
    return (
      <div className={styles.videosList_wrapper}>
        {this.renderTitle()}
        {this.renderVideos()}
        {this.renderButton()}
      </div>
    );
  }
}

export default VideosList;
