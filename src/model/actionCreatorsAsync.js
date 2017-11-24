/* @flow */
import type { Action } from './actionCreators'
import {
  changeFirefoxVersion,
  changeFFVRequestStatus
} from './actionCreators'
import {
  REQUEST_ENB_FOR_FO3NV,
  RECEIVE_ENB_FOR_FO3NV,
  // RECEIVE_ENB_FOR_FO3NV_FAILURE
} from './actionTypes'
import Downloader from '../services/Downloader/Downloader'
const electron = window.require('electron')
const request = electron.remote.require('request-promise-native')

type AsyncAction = (...stateApi: any) => void
type Dispatch = (action: Action | AsyncAction) => void
type GetState = () => any

export function requestEnb(enbUrl: string) {
  return {
    type: REQUEST_ENB_FOR_FO3NV,
    payload: enbUrl
  }
}

export function receiveEnbFile(fileName: string) {
  return {
    type: RECEIVE_ENB_FOR_FO3NV,
    payload: fileName,
    receivedAt: Date.now()
  }
}

export function installEnbPreset(enbID: number) {
  return (dispatch: Dispatch, getState: GetState) => {

    // first we have to download the enb software if not already done
    const state = getState()
    const selectedGame = state.selectedGame
    // const gameTree = state[selectedGame]
    const downloadFolder = state.appFolder + '\\' + state.downloadFolder
    dispatch(downloadEnbIfNeeded(downloadFolder, state[selectedGame]['enbUrl']))
  }
}

export function downloadEnbIfNeeded(downloadFolder: string, enbUrl: string) {
  return (dispatch: Dispatch) => {
    let downloader = new Downloader(downloadFolder)
    dispatch(requestEnb(enbUrl))
    console.log('Note: enb download is faked by local server')
    // downloader.getRegularFile(enbUrl)
    dispatch(downloadFirefoxVersion())
    downloader.getRegularFile('http://127.0.0.1:8080/enbseries_falloutnv_v0278.zip')
  }
}

export function downloadFirefoxVersion() {
  return (dispatch: Dispatch) => {
    console.log('sdfsdfsdf')
    dispatch(changeFFVRequestStatus(true))
    getFirefoxVersion()
    .then(data => {
      const versionData = JSON.parse(data)
      console.log(versionData.LATEST_FIREFOX_VERSION)
      dispatch(changeFirefoxVersion(versionData.LATEST_FIREFOX_VERSION))
      dispatch(changeFFVRequestStatus(false))
    })
    .catch(error => {
      console.log(error)
    })
  }
}

// Helper functions
function getFirefoxVersion() {
  const header = {
    method: 'GET',
    url: 'https://product-details.mozilla.org/1.0/firefox_versions.json',
  }
  return request(header)
}
