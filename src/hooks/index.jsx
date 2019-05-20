import React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router-dom'
import Routes from './routes';
import {createStore, StoreProvider, applyMiddleware} from './store';
import {actionLogger, stateLogger} from "./store/middleware";
import reducers from './store/reducer';

console.log('React hooks implementation');

const middlewares = applyMiddleware(actionLogger, stateLogger);
const store = createStore(reducers);

render(
  <StoreProvider middlewares={middlewares} store={store}>
    <HashRouter>
      <Routes/>
    </HashRouter>
  </StoreProvider>, document.getElementById('root'));
