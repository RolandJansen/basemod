/* @flow */
import { createStore } from 'redux';
import { initialState } from './initialState'
import reducer from './reducers'

let store: Object = createStore(reducer, initialState)

export default store
