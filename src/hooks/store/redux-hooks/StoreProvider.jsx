import React from 'react';
import PropTypes from 'prop-types';
export const Store = React.createContext();

// const devTools = devToolsEnhancer;
// let _redux;
// import {devToolsEnhancer} from 'redux-devtools-extension';

export function StoreProvider(props) {
  let [state, setState] = React.useReducer(props.reducers, props.initialState || props.reducers());
  // _redux = devTools.connect();
  // _redux.init(state);
  //
  // _redux.subscribe((message) => {
  //   if (message.type === 'DISPATCH' && message.state) {
  //     console.log('DevTools requested to change the state to', message);
  //   }
  // });
  function getState() {
    return state;
  }

  function dispatch(action) { //own dispatch
    if (typeof action === 'function') {
      return action(dispatch, getState);
    } else if (typeof action === 'object') {
      // devTools.send(action, reducers(state, action));
      // if (props.middleware && props.middleware.length) {
      //   return props.middleware(state, setState, action);
      // } else {
      //   return setState(action);
      // }
      return setState(action);
    }
  }

  return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>;
}

StoreProvider.propTypes = {
  store: PropTypes.shape({
    initialState: PropTypes.object.optional,
    reducers: PropTypes.func.isRequired,
  })
};

export default StoreProvider;
