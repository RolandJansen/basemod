/* @flow */
import isValidPath from 'is-valid-path'
import * as at from './actionTypes'

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
 // payload: any value, can even be an object
 // error: an object of type Error
 // meta: meta/context information
 export type Action = {
   type: string,
   payload?: any,
   meta?: string,
   error?: Error,
   timestamp?: number
 }

/**
 * Tests if the version is valid and returns an action object
 * @param {string} version The current NMM version in the format [0-9].[0-9]*.[0-9]*
 * @return {Action} An action of type CHANGE_NMM_VERSION
 */
// export function changeNmmVersion(version: string): Action {
//  const vPattern = new RegExp('^(?:(\\d+)\\.)?(?:(\\d+)\\.)?(\\*|\\d+)$') // eslint-disable-line
//  if (vPattern.test(version)) {
//    return {
//      type: CHANGE_NMM_VERSION,
//      payload: version
//    };
//  }
//  return {
//    type: CHANGE_NMM_VERSION,
//    payload: version,
//    error: true,
//    meta: 'Wrong version format'
//  };
// }

export function changeAppFolder(folder: string): Action {
  if (isValidPath(folder)) {
    return {
      type: at.CHANGE_APP_FOLDER,
      payload: folder
    }
  }
  return {
    type: at.CHANGE_APP_FOLDER,
    payload: folder,
    error: new Error('Not a valid filesystem path')
  }
}

export function changeDownloadFolder(folder: string): Action {
  if (isValidPath(folder)) {
    return {
      type: at.CHANGE_DOWNLOAD_FOLDER,
      payload: folder
    }
  }
  return {
    type: at.CHANGE_DOWNLOAD_FOLDER,
    payload: folder,
    error: new Error('Not a valid filesystem path')
  }
}

export function changeFirefoxVersion(version: string): Action {
  const vPattern = new RegExp('^(?:(\\d+)\\.)?(?:(\\d+)\\.)?(\\*|\\d+)$') // eslint-disable-line
  if (vPattern.test(version)) {
    return {
      type: at.CHANGE_FIREFOX_VERSION,
      payload: version
    };
  }
  return {
    type: at.CHANGE_FIREFOX_VERSION,
    payload: version,
    error: new Error('Wrong version format')
  };
}

export function changeFFVRequestStatus(status: boolean): Action {
  return {
    type: at.IS_FFV_REQUESTING,
    payload: status
  }
}

export function selectGame(storeKey: string): Action {
  return {
    type: at.SELECT_GAME,
    payload: storeKey
  }
}

export function selectEnbPreset(presetId: number): Action {
  return {
    type: at.SELECT_ENB_PRESET,
    payload: presetId
  }
}

export function disableEnbPresets(presetId: number): Action {
  return {
    type: at.DISABLE_ENB_PRESETS,
    payload: presetId
  }
}

// entry point for an async action chain
export function installEnbPreset(presetId: number): Action {
  return {
    type: at.INSTALL_ENB_PRESET,
    payload: presetId
  }
}

export function downloadEnbInit(enbUrl: string, game: string): Action {
  return {
    type: at.DOWNLOAD_ENB_INIT,
    payload: enbUrl,
    meta: game,
    timestamp: Date.now()
  }
}

export function downloadEnbSuccess(enbUrl: string, game: string): Action {
  return {
    type: at.DOWNLOAD_ENB_SUCCESS,
    payload: enbUrl,
    meta: game,
    timestamp: Date.now()
  }
}

export function downloadEnbError(enbUrl: string, game: string, error: Error): Action {
  return {
    type: at.DOWNLOAD_ENB_ERROR,
    payload: enbUrl,
    meta: game,
    error: error,
    timestamp: Date.now()
  }
}

export function fetchModInfosInit(modID: number, game: string): Action {
  return {
    type: at.FETCH_MOD_INFOS_INIT,
    payload: modID,
    meta: game,
    timestamp: Date.now()
  }
}

export function fetchModInfosSuccess(modID: number, game: string): Action {
  return {
    type: at.FETCH_MOD_INFOS_SUCCESS,
    payload: modID,
    meta: game,
    timestamp: Date.now()
  }
}

export function fetchModInfosError(modID: number, game: string): Action {
  return {
    type: at.FETCH_MOD_INFOS_ERROR,
    payload: modID,
    meta: game,
    timestamp: Date.now()
  }
}

export function fetchModFileInfosInit(modID: number, game: string): Action {
  return {
    type: at.FETCH_MOD_FILE_INFOS_INIT,
    payload: modID,
    meta: game,
    timestamp: Date.now()
  }
}

export function fetchModFileInfosSuccess(modID: number, game: string): Action {
  return {
    type: at.FETCH_MOD_FILE_INFOS_SUCCESS,
    payload: modID,
    meta: game,
    timestamp: Date.now()
  }
}

export function fetchModFileInfosError(modID: number, game: string, error: Error): Action {
  return {
    type: at.FETCH_MOD_FILE_INFOS_ERROR,
    payload: modID,
    meta: game,
    error: error,
    timestamp: Date.now()
  }
}

export function fetchModFileDurlInit(modID: number, game: string): Action {
  return {
    type: at.FETCH_MOD_FILE_DLURL_INIT,
    payload: modID,
    meta: game,
    timestamp: Date.now()
  }
}

export function fetchModFileDurlSuccess(modID: number, game: string): Action {
  return {
    type: at.FETCH_MOD_FILE_DLURL_SUCCESS,
    payload: modID,
    meta: game,
    timestamp: Date.now()
  }
}

export function fetchModFileDurlError(modID: number, game: string, error: Error): Action {
  return {
    type: at.FETCH_MOD_FILE_DLURL_ERROR,
    payload: modID,
    meta: game,
    error: error,
    timestamp: Date.now()
  }
}

export function downloadModFileInit(modID: number, game: string): Action {
  return {
    type: at.DOWNLOAD_MOD_FILE_INIT,
    payload: modID,
    meta: game,
    timestamp: Date.now()
  }
}

export function downloadModFileSuccess(modID: number, game: string): Action {
  return {
    type: at.DOWNLOAD_MOD_FILE_SUCCESS,
    payload: modID,
    meta: game,
    timestamp: Date.now()
  }
}

export function downloadModFileError(modID: number, game: string, error: Error): Action {
  return {
    type: at.DOWNLOAD_MOD_FILE_ERROR,
    payload: modID,
    meta: game,
    error: error,
    timestamp: Date.now()
  }
}

export function fileExtractInit(fname: string): Action {
  return {
    type: at.FILE_EXTRACT_INIT,
    payload: fname
  }
}

export function fileExtractSuccess(fname: string): Action {
  return {
    type: at.FILE_EXTRACT_SUCCESS,
    payload: fname
  }
}

export function fileExtractError(error: Error): Action {
  return {
    type: at.FILE_EXTRACT_ERROR,
    payload: error
  }
}
