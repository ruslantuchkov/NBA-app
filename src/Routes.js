import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import NewsMain from './components/Articles/News/Main';
import VideosMain from './components/Articles/Videos/Main';
import NewsArticle from './components/Articles/News/Post';
import VideoArticle from './components/Articles/Videos/Video';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/AuthRoutes/PrivateRoute';
import PublicRoute from './components/AuthRoutes/PublicRoute';

const Routes = props => (
  <Layout user={props.user}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/news" exact component={NewsMain} />
      <Route path="/videos" exact component={VideosMain} />
      <Route path="/articles/:id" exact component={NewsArticle} />
      <Route path="/videos/:id" exact component={VideoArticle} />
      <PublicRoute {...props} path="/sign-in" exact component={SignIn} />
      <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
    </Switch>
  </Layout>
);

export default Routes;
