import {LOADING_END, LOADING_FAILED, LOADING_START, LOADING_SUCCESS} from './action-types';
import API from "../../lib/api";

export const loadFollowers = () => async dispatch => {
  dispatch({type: LOADING_START});
  try {
    const followers = await API.getFollowers();

    dispatch({type: LOADING_SUCCESS, payload: {followers}});
  } catch (e) {
    dispatch({type: LOADING_FAILED});
  }
  dispatch({type: LOADING_END});
};
