import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';

const Pages = () => {
  return (
    <Router>
      <Route path="/mynotes" component={MyNotes} />
      <Route path="/favorites" component={Favorites} />
      <Route exact path="/" component={Home} />
    </Router>
  );
};

export default Pages;
