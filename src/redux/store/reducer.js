import {combineReducers} from 'redux';
import authReducer from './auth/reducer';
import reposReducer from './repos/reducer';
import followersReducer from './followers/reducer';

const reducer = combineReducers({
  auth: authReducer,
  repositories: reposReducer,
  followers: followersReducer
});

export default reducer;
