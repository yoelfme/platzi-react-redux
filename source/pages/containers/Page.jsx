import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import Header from '../../shared/components/Header';
import Post from './Post';
import Profile from './Profile';
import Error404 from './Error404';

const routes = (() =>
  (
    <main role="application">
      <Header />

      <Switch>
        <Route
          path="/"
          exact
          component={Home}
        />
        <Route
          path="/posts/:id"
          exact
          component={Post}
        />
        <Route
          path="/users/:id"
          exact
          component={Profile}
        />
        <Route component={Error404} />
      </Switch>
    </main>
  )
);

export default routes;
