import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.scss';
import App from './App';
import ScrollToTop from './components/ScrollToTop'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <App />
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
