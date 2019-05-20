import React from 'react';
import reducers from "./reducer";
// import {devToolsEnhancer} from 'redux-devtools-extension';

export const Store = React.createContext();
// const devTools = devToolsEnhancer;
// let _redux;

export function StoreProvider(props) {
  let [state, storeDispatch] = React.useReducer(reducers, reducers());
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
      action(dispatch);
    } else if (typeof action === 'object') {
      // devTools.send(action, reducers(state, action));
      storeDispatch(action)
    }
  }

  return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>;
}

export function connect(mapStateToProps, mapActions) {
  return Component => () => {
    const {state, dispatch} = React.useContext(Store);
    const mappedActions = {};
    const mappedStateToProps = mapStateToProps ? mapStateToProps(state) : {};

    for (const key in mapActions) {
      if (mapActions.hasOwnProperty(key)) {
        mappedActions[key] = args => dispatch(mapActions[key](args))
      }
    }
    // Wraps the input component in a container, without mutating it. Good!
    return <Component {...mappedStateToProps} {...mappedActions} />;
  }
}
