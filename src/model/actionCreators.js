/* @flow */
import {
  CHANGE_NMM_VERSION,
  ACTIVATE_GAME,
  ACTIVATE_ENB_PRESET,
  DISABLE_ENB_PRESETS,
  INSTALL_ENB_PRESET
} from './actionTypes';

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
   meta?: string
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

export function activateGame(key: string): Action {
  return {
    type: ACTIVATE_GAME,
    payload: key
  }
}

export function activateEnbPreset(presetId: number): Action {
  return {
    type: ACTIVATE_ENB_PRESET,
    payload: presetId
  }
}

export function disableEnbPresets(presetId: number): Action {
  return {
    type: DISABLE_ENB_PRESETS,
    payload: presetId
  }
}

export function installEnbPreset(presetId: number): Action {
  return {
    type: INSTALL_ENB_PRESET,
    payload: presetId
  }
}
