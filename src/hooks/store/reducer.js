import authReducer from './auth/reducer';
import reposReducer from './repos/reducer';
import followersReducer from './followers/reducer';

const combineReducers = reducers => (state = {}, action) =>
  Object.keys(reducers).reduce((nextState, key) => {
    nextState[key] = reducers[key](state[key], action);
    return nextState;
  }, {});

export default combineReducers({
  auth: authReducer,
  repositories: reposReducer,
  followers: followersReducer
});
