import React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router-dom'
import Routes from './routes';
import {StoreProvider} from 'redux2hooks';
// import {actionLogger, stateLogger} from "./store/middleware";
import reducers from './store/reducer';

console.log('React hooks implementation');

// const middleware = null; //applyMiddleware(actionLogger, stateLogger);

render(
  <StoreProvider reducers={reducers}>
    <HashRouter>
      <Routes/>
    </HashRouter>
  </StoreProvider>, document.getElementById('root'));
