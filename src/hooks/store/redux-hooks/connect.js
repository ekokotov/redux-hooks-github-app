import React from 'react';
import {Store} from "./index";

export default function connect(mapStateToProps, mapActions) {
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