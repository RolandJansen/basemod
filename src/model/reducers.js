/* @flow */
import { combineReducers } from 'redux'
import type { Action } from './actionCreators'
import type { Game, SevenZip } from './initialState'
import type { Preset } from './presets/enbPresetTypes'
import { initialState } from './initialState'
import * as at from './actionTypes'

const gameDummy: Game = {
  name: '',
  id: 0,
  enbVersion: 0,
  enbUrl: '',
  enbFile: '',
  isFetching: false,
  lastUpdated: 0,
  enbPresets: []
}

const sevenZipDummy: SevenZip = {
  isExtracting: false,
  extractedFiles: []
}

/**
 * Changes the NMM version. This is not used because development
 * of nmm is suspended. This could be removed when a new nexus api
 * is released.
 * @param  {string} state  Currently used NMM version
 * @param  {Object} action Action object
 * @return {string}        New NMM version
 */
function nmmVersion(state: string = '0.63.14', action: Action) {
  switch (action.type) {
    case at.CHANGE_NMM_VERSION:
      return action.payload
    default:
      return state
  }
}

function appFolder(state: string = '', action: Action) {
  switch (action.type) {
    case at.CHANGE_APP_FOLDER:
      if (!action.error) {
        return action.payload;
      }
      return state
    default:
      return state
  }
}

function downloadFolder(state: string = '', action: Action) {
  switch (action.type) {
    case at.CHANGE_DOWNLOAD_FOLDER:
      if(!action.error) {
        return action.payload
      }
      return state
    default:
      return state
  }
}

function firefoxVersion(state: string = '57.0', action: Action) {
  switch (action.type) {
    case at.CHANGE_FIREFOX_VERSION:
      return action.payload
    default:
      return state
  }
}

function isFFVRequesting(state: boolean = false, action: Action) {
  switch (action.type) {
    case at.IS_FFV_REQUESTING:
      return action.payload
    default:
      return state
  }
}

/**
 * Changes the 'activeGame' field in the state objects
 * when an ACTIVATE_GAME action arrives
 * @param  {string} state  current state of the activeGame field
 * @param  {string} action Action object
 * @return {string}        next state of the activeGame field
 */
function selectedGame(state: string = '', action: Action) {
  switch (action.type) {
    case at.SELECT_GAME:
      // initialState should probably be replaced with the actual state
      // just to avoid inconsistencies.
      if (initialState.hasOwnProperty(action.payload) &&
        //$FlowFixMe
        initialState[action.payload]['name'] === action.payload) {
        return action.payload
      }
      // this just for the linter, the func would be ok without it
      return state
    default:
      return state
  }
}

function sevenZip(state: SevenZip = sevenZipDummy, action: Action) {
  switch (action.type) {
    case at.FILE_EXTRACT_INIT:
      return Object.assign({}, state, { isExtracting: true })
    case at.FILE_EXTRACT_SUCCESS:
      let newExtFiles = state.extractedFiles.slice()
      newExtFiles.push({
        fullPath: action.payload,
        timestamp: action.timestamp
      })
      return Object.assign({}, state, {
        isExtracting: false,
        extractedFiles: newExtFiles
      })
    case at.FILE_EXTRACT_ERROR:

      return state
    default:
      return state
  }
}

/**
 * Reducer for the Fallout3 state tree
 * @param   {Game}   state  The Fallout3 game state
 * @param   {Action} action The Action that gets perform
 * @return  {Game}          The new Fallout3 game state
 */
function Fallout3(state: Game = gameDummy, action: Action) {
  if (action.meta === 'Fallout3') {
    return genericGame(state, action)
  }
  return state
}

/**
 * Reducer for the FalloutNV state tree
 * @param   {Game}   state  The FalloutNV game state
 * @param   {Action} action The Action that gets perform
 * @return  {Game}          The new FalloutNV game state
 */
function FalloutNV(state: Game= gameDummy, action: Action) {
  if (action.meta === 'FalloutNV') {
    return genericGame(state, action)
  }
  return state
}

/**
 * Generic reducer for any game state tree
 * @param   {Game}   state  The game state
 * @param   {Action} action The Action that gets perform
 * @return  {Game}          The new game state
 */
function genericGame(state: Game = gameDummy, action: Action) {
  let enbs = []
  switch (action.type) {
    case at.SELECT_ENB_PRESET:
    case at.DESELECT_ENB_PRESETS:
    case at.FETCH_MOD_INFOS_INIT:
    case at.FETCH_MOD_INFOS_SUCCESS:
    case at.FETCH_MOD_INFOS_ERROR:
    case at.FETCH_MOD_FILE_INFOS_INIT:
    case at.FETCH_MOD_FILE_INFOS_SUCCESS:
    case at.FETCH_MOD_FILE_INFOS_ERROR:
    case at.FETCH_MOD_FILE_DLURL_INIT:
    case at.FETCH_MOD_FILE_DLURL_SUCCESS:
    case at.FETCH_MOD_FILE_DLURL_ERROR:
    case at.DOWNLOAD_MOD_FILE_INIT:
    case at.DOWNLOAD_MOD_FILE_SUCCESS:
    case at.DOWNLOAD_MOD_FILE_ERROR:
      enbs = EnbPresets(state.enbPresets, action)
      return Object.assign({}, state, { enbPresets: enbs })
    case at.DOWNLOAD_ENB_INIT:
      return Object.assign({}, state, {
        isFetching: true
      })
    case at.DOWNLOAD_ENB_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: action.timestamp
      })
    case at.DOWNLOAD_ENB_ERROR:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

// subtree functions
function EnbPresets(state: Array<Preset> = [], action: Action) {
  switch (action.type) {
    case at.SELECT_ENB_PRESET:
      return state.map(preset => {
        let newPreset = JSON.parse(JSON.stringify(preset))
        if (preset.id === action.payload) {
          newPreset.isSelected = true
          return newPreset
        } else {
          newPreset.isSelected = false
          return newPreset
        }
      })
    case at.DESELECT_ENB_PRESETS:
      return state.map(preset => {
        let newPreset = JSON.parse(JSON.stringify(preset))
        newPreset.isSelected = false
        return newPreset
      })
    case at.FETCH_MOD_INFOS_INIT:
      return state.map(preset => {
        let newPreset = preset
        if (preset.id === action.payload) {
          newPreset = JSON.parse(JSON.stringify(preset))
          newPreset.isFetching = true
        }
        return newPreset
      })
    case at.FETCH_MOD_INFOS_SUCCESS:
      return state.map(preset => {
        let newPreset = preset
        if (preset.id === action.payload) {
          newPreset = JSON.parse(JSON.stringify(preset))
          newPreset.isFetching = false
          newPreset.lastUpdated = action.timestamp
        }
        return newPreset
      })
    case at.FETCH_MOD_FILE_INFOS_INIT:
      return state.map(preset => {
        let newPreset = preset
        if (preset.id === action.payload) {
          newPreset = JSON.parse(JSON.stringify(preset))
          newPreset.isFetching = true
        }
        return newPreset
      })
    case at.FETCH_MOD_FILE_INFOS_SUCCESS:
      return state.map(preset => {
        let newPreset = preset
        if (preset.id === action.payload) {
          newPreset = JSON.parse(JSON.stringify(preset))
          newPreset.isFetching = false
          newPreset.lastUpdated = action.timestamp
        }
        return newPreset
      })
    case at.FETCH_MOD_FILE_DLURL_INIT:
      return state.map(preset => {
        let newPreset = preset
        if (preset.id === action.payload) {
          newPreset = JSON.parse(JSON.stringify(preset))
          newPreset.isFetching = true
        }
        return newPreset
      })
    case at.FETCH_MOD_FILE_DLURL_SUCCESS:
      return state.map(preset => {
        let newPreset = preset
        if (preset.id === action.payload) {
          newPreset = JSON.parse(JSON.stringify(preset))
          newPreset.isFetching = false
          newPreset.lastUpdated = action.timestamp
        }
        return newPreset
      })
    case at.DOWNLOAD_MOD_FILE_INIT:
      return state.map(preset => {
        let newPreset = preset
        if (preset.id === action.payload) {
          newPreset = JSON.parse(JSON.stringify(preset))
          newPreset.isFetching = true
        }
        return newPreset
      })
    case at.DOWNLOAD_MOD_FILE_SUCCESS:
      return state.map(preset => {
        let newPreset = preset
        if (preset.id === action.payload) {
          newPreset = JSON.parse(JSON.stringify(preset))
          newPreset.isFetching = false
          newPreset.lastUpdated = action.timestamp
        }
        return newPreset
      })
    default:
      return state
  }
}


// function enbPresets(state: Array<Object> = [], action: Action) {
//   if (typeof action !== 'undefined') {
//     switch (action.type) {
//       case ADD_ENB_PRESET:
//       return [
//         ...state,
//         action.payload
//       ]
//       default:
//       return state
//     }
//   }
//   return state
// }

// function games(state: Array<Object> = [], action: Action) {
//   if (typeof action !== 'undefined') {
//     switch (action.type) {
//       case ACTIVATE_GAME:
//       return state.map((game) => {
//         if (game.name === action.payload) {
//           return Object.assign({}, game, { active: true });
//         }
//         return game
//       })
//       default:
//       return state
//     }
//   }
//   return state
// }

const reducer: Function = combineReducers({
  nmmVersion,
  appFolder,
  downloadFolder,
  firefoxVersion,
  isFFVRequesting,
  selectedGame,
  Fallout3,
  FalloutNV,
  sevenZip
})

export default reducer;
