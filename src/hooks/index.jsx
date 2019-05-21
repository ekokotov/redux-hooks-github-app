import React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router-dom'
import Routes from './routes';
import {createStore, applyMiddleware, StoreProvider} from './store/redux-hooks';
import {actionLogger, stateLogger} from "./store/middleware";
import reducers from './store/reducer';

console.log('React hooks implementation');

const middleware = null; //applyMiddleware(actionLogger, stateLogger);
const store = createStore(reducers);

render(
  <StoreProvider middleware={middleware} store={store}>
    <HashRouter>
      <Routes/>
    </HashRouter>
  </StoreProvider>, document.getElementById('root'));
