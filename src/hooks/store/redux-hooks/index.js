import React from 'react';
import Provider from './StoreProvider';
import connectComponent from './connect';
import {combineAllReducers} from './combineReducers';

export const Store = React.createContext();
export const createStore = (reducers, initialState) => ({reducers, initialState});
export const compose = (...funcs) => (...args) => funcs.forEach(f => f(...args));

export const applyMiddleware = compose;
export const StoreProvider = Provider;
export const connect = connectComponent;
export const combineReducers = combineAllReducers;
