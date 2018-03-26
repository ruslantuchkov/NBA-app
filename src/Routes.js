import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import NewsArticle from './components/Articles/News/Post';
import VideoArticle from './components/Articles/Videos/Video';

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles/:id" exact component={NewsArticle} />
          <Route path="/videos/:id" exact component={VideoArticle} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
