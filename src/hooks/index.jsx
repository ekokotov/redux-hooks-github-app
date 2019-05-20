import React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router-dom'
import Routes from './routes';
import {Provider} from "react-redux";
import Store from './store';

console.log('React hooks implementation');

render(
  <Provider store={Store}>
    <HashRouter>
      <Routes/>
    </HashRouter>
  </Provider>, document.getElementById('root'));
