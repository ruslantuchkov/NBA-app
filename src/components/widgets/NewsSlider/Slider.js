import React, { Component } from 'react';
import { firebaseArticles, firebaseLooper } from '../../../firebase';
import SliderTemplates from './Slider_templates';

class NewsSlider extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    firebaseArticles
      .limitToFirst(3)
      .once('value')
      .then(snapshot => {
        const news = firebaseLooper(snapshot);
        this.setState({ news });
      });

    // axios
    //   .get(
    //     `${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`
    //   )
    //   .then(response => this.setState({ news: response.data }));
  }

  render() {
    return (
      <SliderTemplates
        data={this.state.news}
        type={this.props.type}
        settings={this.props.settings}
      />
    );
  }
}

export default NewsSlider;
