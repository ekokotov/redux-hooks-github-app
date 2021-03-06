export const actionLogger = store => dispatch => action => {
  console.info('dispatching', action);
  return dispatch(action);
};

export const stateLogger = store => dispatch => action => {
  let result = dispatch(action);
  console.log('next state', store.getState());
  return result
};
