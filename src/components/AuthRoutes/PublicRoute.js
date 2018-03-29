import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ user, component: Comp, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props => {
        return user ? (
          <Redirect to="/dashboard" />
        ) : (
          <Comp {...props} user={user} />
        );
      }}
    />
  );
};

export default PrivateRoute;
