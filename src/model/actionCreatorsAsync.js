/* @flow */
import type { Action } from './actionCreators'
import type { Preset } from './presets/enbPresetTypes'
import {
  requestEnbFile,
  receiveEnbFile,
  changeFirefoxVersion,
  changeFFVRequestStatus
} from './actionCreators'
import DownloadClient from '../services/http/DownloadClient'
import NexusClient from '../services/http/NexusClient'
const electron = window.require('electron')
const request = electron.remote.require('request-promise-native')

type AsyncAction = (...stateApi: any) => void
type Dispatch = (action: Action | AsyncAction) => void
type GetState = () => any

export function installEnbPreset(enbID: number) {
  return (dispatch: Dispatch, getState: GetState) => {

    // first we have to download the enb software if not already done
    // dispatch(downloadEnbIfNeeded())
    // fetchModInfos
    // dispatch(fetchModFileInfos(enbID))
    dispatch(fetchModFileDownloadUrl(enbID))
  }
}

export function downloadEnbIfNeeded() {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const game = state.selectedGame
    const dlFolder = state.appFolder + '\\' + state.downloadFolder

    let downloader = new DownloadClient(dlFolder)
    console.log(state[game].lastUpdated)
    if (state[game].lastUpdated === 0) {
      dispatch(requestEnbFile(game, true))
      console.log('Note: enb download is faked by local server')
      // downloader.getRegularFile(state[game]['enbUrl'])
      downloader.getRegularFile('http://127.0.0.1:8080/enbseries_falloutnv_v0278.zip')
      .then(() => {
        dispatch(receiveEnbFile(game, false))
        console.log('download done.')
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}

export function fetchModInfos(modID: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const nexus = new NexusClient(state.nmmVersion)
    const game = state.selectedGame
    nexus.getModInfo(game, state[game]['id'], modID)
    .then(json => {
      console.log(json)
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function fetchModFileInfos(modID: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const nexus = new NexusClient(state.nmmVersion)
    const game = state.selectedGame
    nexus.getModFileInfo(game, state[game]['id'], modID)
    .then(json => {
      console.log(json)
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function fetchModFileDownloadUrl(modID: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const nexus = new NexusClient(state.nmmVersion)
    const game = state.selectedGame
    const fileId = getEnbPresetFileId(state[game]['enbPresets'], modID)
    if (fileId > 0) {
      console.log(fileId)
      nexus.getModFileDownloadUrls(game, state[game]['id'], fileId)
      .then(json => {
        console.log(json)
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      //dispatch an error here (fileId not found in enb preset list)
    }
  }
}

export function fetchFirefoxVersion() {
  return (dispatch: Dispatch) => {
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
function getEnbPresetFileId(presets: Array<Preset>, modId: number): number {
  let fileId = 0
  presets.forEach(preset => {
    if (preset.id === modId) {
      fileId = preset.fileId
    }
  })
  return fileId
}

function getFirefoxVersion() {
  const header = {
    method: 'GET',
    url: 'https://product-details.mozilla.org/1.0/firefox_versions.json',
  }
  return request(header)
}
