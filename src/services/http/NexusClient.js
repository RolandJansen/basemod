/* @flow */
// import store from '../../index'
// import type { Game } from '../../model/initialState'
const electron = window.require('electron')
// const fs = electron.remote.require('fs')
// const os = electron.remote.require('os')
const request = electron.remote.require('request-promise-native')

class NexusClient {

  userAgent: string
  baseURL: string = 'http://www.nexusmods.com/'
  nmmURL: string = 'http://nmm.nexusmods.com/'

  constructor(nmmVersion: string) {
    this.userAgent = 'Nexus Client v' + nmmVersion
  }

  getModInfo(gameName: string, gameID: number, modID: number): Promise<any> {
    const href = this.nmmURL + gameName.toLowerCase() + '/Mods/' + modID.toString() + '/'
    const query = 'game_id=' + gameID.toString()
    const url = this.getUrl(href, query)
    console.log(url.href)
    return request({
      url: url.href,
      headers: { 'User-Agent': this.userAgent }
    })
  }

  getModFileInfo(gameName: string, gameID: number, modID: number): Promise<any> {
    const href = this.nmmURL + gameName.toLowerCase() + '/Files/indexfrommod/' + modID.toString()
    const query = 'game_id=' + gameID.toString()
    const uri = this.getUrl(href, query)
    return request({
      uri: uri,
      headers: { 'User-Agent': this.userAgent }
    })
  }

  getModFileDownloadUrls(gameName: string, gameID: number, fileID: number): Promise<any> {
    const href = this.nmmURL + gameName.toLowerCase() + '/Files/download/' + fileID.toString()
    const query = 'game_id=' + gameID.toString()
    const uri = this.getUrl(href, query)
    return request({
      uri: uri,
      headers: { 'User-Agent': this.userAgent }
    })
  }

  getNmmVersion() {
    const href = this.nmmURL + 'NMM'
    const query = 'GetLatestVersion'
    const uri = this.getUrl(href, query)
    return request({
      uri: uri,
      headers: { 'User-Agent': this.userAgent }
    })
  }

  getUrl(hostname: string, query: string): URL {
    console.log(hostname)
    var url = new URL(hostname);
    url.search = query;
    return url;
  }

}

export default NexusClient
