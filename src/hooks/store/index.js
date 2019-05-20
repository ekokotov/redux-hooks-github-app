import React from 'react';
// import reducers from "./reducer";
// import {devToolsEnhancer} from 'redux-devtools-extension';

export const Store = React.createContext();
// const devTools = devToolsEnhancer;
// let _redux;

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
      if (props.middlewares && props.middlewares.length) {
        return setState(action);
      } else {
        return props.middlewares(state, setState, action);
      }
    }
  }

  return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>;
}

export const createStore = (reducers, initialState) => ({reducers, initialState});
export const compose = (...funcs) => (...args) => funcs.forEach(f => f(...args));
export const applyMiddleware = compose;

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
