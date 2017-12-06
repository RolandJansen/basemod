/* @flow */
import {
  CHANGE_NMM_VERSION,
  CHANGE_APP_FOLDER,
  CHANGE_DOWNLOAD_FOLDER,
  CHANGE_FIREFOX_VERSION,
  IS_FFV_REQUESTING,
  SELECT_GAME,
  SELECT_ENB_PRESET,
  DISABLE_ENB_PRESETS,
  INSTALL_ENB_PRESET,
  REQUEST_ENB_FOR_FO3,
  RECEIVE_ENB_FOR_FO3,
  REQUEST_ENB_FOR_FNV,
  RECEIVE_ENB_FOR_FNV,
  REQUEST_MOD_FILE_DOWNLOAD_URL,
  RECEIVE_MOD_FILE_DOWNLOAD_URL,
  INIT_FILE_EXTRACT,
  FILE_EXTRACT_FINISHED,
  FILE_EXTRACT_ERROR
} from './actionTypes';
import isValidPath from 'is-valid-path'

/**
 * This file exports functions that creates actions.
 * It is recommended that there is an action creator for
 * every single action in the system.
 *
 * The idea behind this is that other parts should import
 * these functions instead of the actions themselfs so we
 * can maintain all code related to actions here in one place.
 */

 // actions must have an action type. They may have these field:
 // payload: a value, should be an object but can also be a primitive
 // error: boolean to indicate that something went wrong. payload should
 //        be the stacktrace or the error itself
 // meta: don't know, any meta information that might be necessary to explain the action.
 //       I don't think that this will ever be used.
 // these are the only valid fields for an action and non others are allowed.
 export type Action = {
   type: string,
   payload?: any,
   error?: boolean,
   meta?: string,
   timestamp?: number
 }

/**
 * Tests if the version is valid and returns an action object
 * @param {string} version The current NMM version in the format [0-9].[0-9]*.[0-9]*
 * @return {Action} An action of type CHANGE_NMM_VERSION
 */
export function changeNmmVersion(version: string): Action {
 const vPattern = new RegExp('^(?:(\\d+)\\.)?(?:(\\d+)\\.)?(\\*|\\d+)$') // eslint-disable-line
 if (vPattern.test(version)) {
   return {
     type: CHANGE_NMM_VERSION,
     payload: version
   };
 }
 return {
   type: CHANGE_NMM_VERSION,
   payload: version,
   error: true,
   meta: 'Wrong version format'
 };
}

export function changeAppFolder(folder: string): Action {
  if (isValidPath(folder)) {
    return {
      type: CHANGE_APP_FOLDER,
      payload: folder
    }
  }
  return {
    type: CHANGE_APP_FOLDER,
    payload: folder,
    error: true,
    meta: 'Not a valid filesystem path'
  }
}

export function changeDownloadFolder(folder: string): Action {
  if (isValidPath(folder)) {
    return {
      type: CHANGE_DOWNLOAD_FOLDER,
      payload: folder
    }
  }
  return {
    type: CHANGE_DOWNLOAD_FOLDER,
    payload: folder,
    error: true,
    meta: 'Not a valid filesystem path'
  }
}

export function changeFirefoxVersion(version: string): Action {
  const vPattern = new RegExp('^(?:(\\d+)\\.)?(?:(\\d+)\\.)?(\\*|\\d+)$') // eslint-disable-line
  if (vPattern.test(version)) {
    return {
      type: CHANGE_FIREFOX_VERSION,
      payload: version
    };
  }
  return {
    type: CHANGE_FIREFOX_VERSION,
    payload: version,
    error: true,
    meta: 'Wrong version format'
  };
}

export function changeFFVRequestStatus(status: boolean): Action {
  return {
    type: IS_FFV_REQUESTING,
    payload: status
  }
}

export function selectGame(storeKey: string): Action {
  return {
    type: SELECT_GAME,
    payload: storeKey
  }
}

export function selectEnbPreset(presetId: number): Action {
  return {
    type: SELECT_ENB_PRESET,
    payload: presetId
  }
}

export function disableEnbPresets(presetId: number): Action {
  return {
    type: DISABLE_ENB_PRESETS,
    payload: presetId
  }
}

// entry point for an async action chain
export function installEnbPreset(presetId: number): Action {
  return {
    type: INSTALL_ENB_PRESET,
    payload: presetId
  }
}

export function requestEnbFile(game: string, isRequesting: boolean): Action {
  let actionType: string = ''
  switch (game) {
    case 'Fallout3':
      actionType = REQUEST_ENB_FOR_FO3
      break;
    case 'FalloutNV':
      actionType = REQUEST_ENB_FOR_FNV
      break
    default:
      break;
  }
  return {
    type: actionType,
    payload: isRequesting
  }
}

export function receiveEnbFile(game: string, isRequesting: boolean): Action {
  let actionType: string = ''
  switch (game) {
    case 'Fallout3':
      actionType = RECEIVE_ENB_FOR_FO3
      break
    case 'FalloutNV':
      actionType = RECEIVE_ENB_FOR_FNV
      break
    default:
      break
  }
  return {
    type: actionType,
    payload: isRequesting,
    timestamp: Date.now()
  }
}

export function requestModFileDownloadUrl(): Action {
  return {
    type: REQUEST_MOD_FILE_DOWNLOAD_URL,
    payload: ''
  }
}

export function receiveModFileDownloadUrl(): Action {
  return {
    type: RECEIVE_MOD_FILE_DOWNLOAD_URL,
    payload: ''
  }
}

export function initFileExtract(fname: string): Action {
  return {
    type: INIT_FILE_EXTRACT,
    payload: fname
  }
}

export function fileExtractFinished(fname: string): Action {
  return {
    type: FILE_EXTRACT_FINISHED,
    payload: fname
  }
}

export function fileExtractError(error: Error): Action {
  return {
    type: FILE_EXTRACT_ERROR,
    payload: error
  }
}
