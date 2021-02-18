import React from 'react';
import ReactDOM from 'react-dom';
import Root from './views/Root';
import { browserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Root/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

