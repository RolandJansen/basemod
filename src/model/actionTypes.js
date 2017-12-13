/* @flow */

// system internal action types
export const CHANGE_NMM_VERSION: string = 'CHANGE_NMM_VERSION'
export const CHANGE_APP_FOLDER: string = 'CHANGE_APP_FOLDER'
export const CHANGE_DOWNLOAD_FOLDER: string = 'CHANGE_DOWNLOAD_FOLDER'
export const CHANGE_FIREFOX_VERSION: string = 'CHANGE_FIREFOX_VERSION'  //not testet, tobe removed?
export const IS_FFV_REQUESTING: string = 'IS_FFV_REQUESTING'  //not tested, tobe removed?
export const SELECT_GAME: string = 'SELECT_GAME'
export const SELECT_ENB_PRESET: string = 'SELECT_ENB_PRESET'
export const DESELECT_ENB_PRESETS: string = 'DESELECT_ENB_PRESETS'
export const SET_INI_FILE_PATH: string = 'SET_INI_FILE_PATH'
export const SET_PREFS_FILE_PATH: string = 'SET_PREFS_FILE_PATH'

// async middleware entry points
export const INSTALL_ENB_PRESET: string = 'INSTALL_ENB_PRESET'

// action types for async dispatching (middleware)
export const DOWNLOAD_ENB_INIT: string = 'DOWNLOAD_ENB_INIT'
export const DOWNLOAD_ENB_SUCCESS: string = 'DOWNLOAD_ENB_SUCCESS'
export const DOWNLOAD_ENB_ERROR: string = 'DOWNLOAD_ENB_ERROR'

export const FETCH_MOD_INFOS_INIT: string = 'FETCH_MOD_INFOS_INIT'
export const FETCH_MOD_INFOS_SUCCESS: string = 'FETCH_MOD_INFOS_SUCCESS'
export const FETCH_MOD_INFOS_ERROR: string = 'FETCH_MOD_INFOS_ERROR'
export const FETCH_MOD_FILE_INFOS_INIT: string = 'FETCH_MOD_FILE_INFOS_INIT'
export const FETCH_MOD_FILE_INFOS_SUCCESS: string = 'FETCH_MOD_FILE_INFOS_SUCCESS'
export const FETCH_MOD_FILE_INFOS_ERROR: string = 'FETCH_MOD_FILE_INFOS_ERROR'
export const FETCH_MOD_FILE_DLURL_INIT: string = 'FETCH_MOD_FILE_DLURL_INIT'
export const FETCH_MOD_FILE_DLURL_SUCCESS: string = 'FETCH_MOD_FILE_DLURL_SUCCESS'
export const FETCH_MOD_FILE_DLURL_ERROR: string = 'FETCH_MOD_FILE_DLURL_ERROR'
export const DOWNLOAD_MOD_FILE_INIT: string = 'DOWNLOAD_MOD_FILE_INIT'
export const DOWNLOAD_MOD_FILE_SUCCESS: string = 'DOWNLOAD_MOD_FILE_SUCCESS'
export const DOWNLOAD_MOD_FILE_ERROR: string = 'DOWNLOAD_MOD_FILE_ERROR'

export const FILE_EXTRACT_INIT: string = 'FILE_EXTRACT_INIT'
export const FILE_EXTRACT_SUCCESS: string = 'FILE_EXTRACT_SUCCESS'
export const FILE_EXTRACT_ERROR: string = 'FILE_EXTRACT_ERROR'

export const INI_FILE_LOAD_INIT: string = 'INI_FILE_LOAD_INIT'
export const INI_FILE_LOAD_SUCCESS: string = 'INI_FILE_LOAD_SUCCESS'
export const INI_FILE_LOAD_ERROR: string = 'INI_FILE_LOAD_ERROR'
export const INI_FILE_SAVE_INIT: string = 'INI_FILE_SAVE_INIT'
export const INI_FILE_SAVE_SUCCESS: string = 'INI_FILE_SAVE_SUCCESS'
export const INI_FILE_SAVE_ERROR: string = 'INI_FILE_SAVE_ERROR'
