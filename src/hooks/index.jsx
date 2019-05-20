import React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router-dom'
import Routes from './routes';
import {StoreProvider} from './store';

console.log('React hooks implementation');

render(
  <StoreProvider>
    <HashRouter>
      <Routes/>
    </HashRouter>
  </StoreProvider>, document.getElementById('root'));
