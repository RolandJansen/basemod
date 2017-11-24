/* @flow */

// all action types gathered in one place:
export const CHANGE_NMM_VERSION: string = 'CHANGE_NMM_VERSION'
export const CHANGE_APP_FOLDER: string = 'CHANGE_APP_FOLDER'
export const CHANGE_DOWNLOAD_FOLDER: string = 'CHANGE_DOWNLOAD_FOLDER'
export const CHANGE_FIREFOX_VERSION: string = 'CHANGE_FIREFOX_VERSION'
export const IS_FFV_REQUESTING: string = 'IS_FFV_REQUESTING'
export const SELECT_GAME: string = 'SELECT_GAME'
export const SELECT_ENB_PRESET: string = 'SELECT_ENB_PRESET'
export const DISABLE_ENB_PRESETS: string = 'DISABLE_ENB_PRESETS'
export const INSTALL_ENB_PRESET: string = 'INSTALL_ENB_PRESET'

// action types for middleware
export const REQUEST_ENB_FOR_FO3NV: string = 'REQUEST_ENB_FOR_FO3NV'
export const RECEIVE_ENB_FOR_FO3NV: string = 'RECEIVE_ENB_FOR_FO3NV_SUCCESS'
export const RECEIVE_ENB_FOR_FO3NV_FAILURE: string = 'RECEIVE_ENB_FOR_FO3NV_FAILURE'
