import React from 'react';
import {Store} from '.';
import PropTypes from 'prop-types';

// const devTools = devToolsEnhancer;
// let _redux;
// import {devToolsEnhancer} from 'redux-devtools-extension';

export function StoreProvider(props) {
  let [state, setState] = React.useReducer(props.store.reducers, props.store.initialState || props.store.reducers());
  // _redux = devTools.connect();
  // _redux.init(state);
  //
  // _redux.subscribe((message) => {
  //   if (message.type === 'DISPATCH' && message.state) {
  //     console.log('DevTools requested to change the state to', message);
  //   }
  // });

  function dispatch(action) { //own dispatch
    if (typeof action === 'function') {
      return action(dispatch);
    } else if (typeof action === 'object') {
      // devTools.send(action, reducers(state, action));
      if (props.middleware && props.middleware.length) {
        return setState(action);
      } else {
        return props.middleware(state, setState, action);
      }
    }
  }

  return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>;
}

StoreProvider.propTypes = {
  store: PropTypes.object.shape({
    initialState: PropTypes.object.optional,
    reducers: PropTypes.func.isRequired,
  }),
  middleware: PropTypes.array.optional
};

export default StoreProvider;
