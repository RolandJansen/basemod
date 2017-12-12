/* @flow */
// import Zip from 'node-7z'
import type { Action } from './actionCreators'
import type { Preset } from './presets/enbPresetTypes'
import {
  downloadEnbInit,
  downloadEnbSuccess,
  downloadEnbError,

  fileExtractInit,
  fileExtractSuccess,
  fileExtractError,
  changeFirefoxVersion,
  changeFFVRequestStatus
} from './actionCreators'
import DownloadClient from '../services/http/DownloadClient'
import NexusClient from '../services/http/NexusClient'
const electron = window.require('electron')
const request = electron.remote.require('request-promise-native')
const Zip = electron.remote.require('node-7z')

type AsyncAction = (...stateApi: any) => void
type Dispatch = (action: Action | AsyncAction) => void
type GetState = () => any

export function installEnbPreset(enbID: number): AsyncAction {
  return (dispatch: Dispatch, getState: GetState) => {

    const state = getState()
    const fName = state.appFolder + '\\' + state.downloadFolder + '\\enbseries_falloutnv_v0322.zip'
    const destFolder = state.appFolder + '\\' + state.downloadFolder + '\\enbseries_test'
    dispatch(extractArchive(fName, destFolder))

    // first we have to download the enb software if not already done
    // dispatch(downloadEnbIfNeeded())
    // fetchModInfos
    // dispatch(fetchModFileInfos(enbID))
    // dispatch(fetchModFileDownloadUrl(enbID))
  }
}

export function extractArchive(fname: string, destFolder: string): AsyncAction {
  return (dispatch: Dispatch) => {
    const zipTask = new Zip()
    dispatch(fileExtractInit(fname))
    zipTask.extractFull(fname, destFolder)
    .then(() => {
      dispatch(fileExtractSuccess(fname))
      console.log('All extracted')
    })
    .catch((error) => {
      dispatch(fileExtractError(fname, error))
      console.log('An error occured: ' + error)
    })
  }
}

export function downloadEnbIfNeeded(): AsyncAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const game = state.selectedGame
    const dlFolder = state.appFolder + '\\' + state.downloadFolder
    const enbDownloadUrl = 'http://127.0.0.1:8080/enbseries_falloutnv_v0278.zip'  // faked by local server

    let downloader = new DownloadClient(dlFolder)
    // this is extremely risky, it should check if the file exists
    if (state[game].lastUpdated === 0) {
      dispatch(downloadEnbInit(game))
      console.log('Note: enb download is faked by local server')
      // downloader.getRegularFile(state[game]['enbUrl'])
      downloader.getEnbArchive(enbDownloadUrl)
      .then(() => {
        dispatch(downloadEnbSuccess(game))
        console.log('download done.')
      })
      .catch((error) => {
        dispatch(downloadEnbError(game, error))
        console.log(error)
      })
    }
  }
}

export function downloadModIfNeeded(modID: number, modHref: string): AsyncAction {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState()
    const dlFolder = state.appFolder + '\\' + state.downloadFolder

    let downloader = new DownloadClient(dlFolder)
    const fileName = downloader.getFileName(modHref)

  }
}

export function fetchModInfos(modID: number): AsyncAction {
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

export function fetchModFileInfos(modID: number): AsyncAction {
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

export function fetchModFileDownloadUrl(modID: number): AsyncAction {
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

export function fetchFirefoxVersion(): AsyncAction {
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
