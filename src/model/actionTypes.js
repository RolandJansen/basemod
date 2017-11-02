/* @flow */

// if actions should get too complicated, typedefs could be outsourced
// to a file like actionTypes.js

// like described in https://github.com/acdlite/flux-standard-action actions should
// have a type and that's the only required field. Further it can have:
//
// payload: a value, should be an object but can also be a naive data type
// error: boolean to indicate that something went wrong. payload should
//        be the stacktrace or the error itself
// meta: don't know, any meta information that might be necessary to explain the action.
//       I don't think that this will ever be used.
//
// these are the only valid fields for an action and non others are allowed.

// all action types gathered in one place:
export const ADD_NMM_VERSION = 'ADD_NMM_VERSION';
