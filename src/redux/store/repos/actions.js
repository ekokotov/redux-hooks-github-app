import {LOADING_END, LOADING_FAILED, LOADING_START, LOADING_SUCCESS} from './action-types';
import API from "../../../lib/api";

export const loadRepositories = () => async dispatch => {
  dispatch({type: LOADING_START});
  try {
    const repos = await API.getRepos();

    dispatch({type: LOADING_SUCCESS, payload: {repos}});
  } catch (e) {
    dispatch({type: LOADING_FAILED});
  }
  dispatch({type: LOADING_END});
};
