/* @flow */
import { combineReducers } from 'redux'
import type { Action } from './actionCreators'
import {
  CHANGE_NMM_VERSION,
  ADD_ENB_PRESET,
  ACTIVATE_GAME
} from './actionTypes'

function nmmVersion(state: string = '0.63.14', action: Action) {
  if (typeof action !== 'undefined') {
    switch (action.type) {
      case CHANGE_NMM_VERSION:
      return action.payload
      default:
      return state
    }
  }
  return state
}

function enbPresets(state: Array<Object> = [], action: Action) {
  if (typeof action !== 'undefined') {
    switch (action.type) {
      case ADD_ENB_PRESET:
      return [
        ...state,
        action.payload
      ]
      default:
      return state
    }
  }
  return state
}

function games(state: Array<Object> = [], action: Action) {
  if (typeof action !== 'undefined') {
    switch (action.type) {
      case ACTIVATE_GAME:
      return state.map((game) => {
        if (game.name === action.payload) {
          return Object.assign({}, game, { active: true });
        }
        return game
      })
      default:
      return state
    }
  }
  return state
}

const reducer: Function = combineReducers({
  nmmVersion,
  enbPresets,
  games
})

export default reducer;
