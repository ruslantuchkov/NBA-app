import React, { Component } from 'react';
import {
  firebaseDB,
  firebaseLooper,
  firebaseTeams,
  firebaseVideos
} from '../../../../firebase';
import styles from '../../articles.css';
import Header from './Header';
import VideosRelated from '../../../widgets/VideosList/VideosRelated/VideosRelated';

class VideoArticle extends Component {
  state = {
    article: [],
    team: [],
    teams: [],
    related: []
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    if (+this.props.match.params.id !== this.state.article.id) {
      this.loadData();
    }
  }

  loadData = () => {
    firebaseDB
      .ref(`videos/${this.props.match.params.id}`)
      .once('value')
      .then(snapshot => {
        let video = snapshot.val();
        firebaseTeams
          .orderByChild('id')
          .equalTo(video.team)
          .once('value')
          .then(snapshot => {
            const team = firebaseLooper(snapshot);
            this.setState({ article: video, team });
            this.getRelated();
          });
      });
  };

  // axios
  //   .get(`${URL}/videos?id=${this.props.match.params.id}`)
  //   .then(response => {
  //     let article = response.data[0];
  //     axios.get(`${URL}/teams?id=${article.team}`).then(response => {
  //       this.setState({ article, team: response.data });
  //       this.getRelated();
  //     });
  //   });
  // };

  getRelated = () => {
    firebaseTeams.once('value').then(snapshot => {
      const teams = firebaseLooper(snapshot);

      firebaseVideos
        .orderByChild('team')
        .equalTo(this.state.article.team)
        .limitToFirst(3)
        .once('value')
        .then(snapshot => {
          const related = firebaseLooper(snapshot);
          this.setState({ teams, related });
        });
    });

    //   axios.get(`${URL}/teams`).then(response => {
    //     let teams = response.data;
    //     axios
    //       .get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
    //       .then(response => this.setState({ teams, related: response.data }));
    // });
  };

  render() {
    const { article, team, related, teams } = this.state;
    return (
      <div>
        <Header teamData={team[0]} />
        <div className={styles.videoWrapper}>
          <h1>{article.title}</h1>
          <iframe
            title="videoplayer"
            width="100%"
            height="300px"
            src={`https://www.youtube.com/embed/${article.url}`}
          />
        </div>
        <VideosRelated data={related} teams={teams} />
      </div>
    );
  }
}

export default VideoArticle;
