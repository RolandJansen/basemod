/* @flow */
// import type State from '../../model/initialState'
import isValidPath from 'is-valid-path'
const electron = window.require('electron')
const fs = electron.remote.require('fs')
// const os = electron.remote.require('os')
const request = electron.remote.require('request-promise-native')
// import { URL } from 'url'
// import fs from 'fs'

// import os from 'os'

// guter und knapper artikel über das request packet:
// https://www.sitepoint.com/making-http-requests-in-node-js/
//
// Hier ist die github seite mit viel Documents
// https://github.com/request/request
//
// in den node api docs gibts auch viele nützliche tools, mal reingucket
class Downloader {
  downloadFolder: string
  userAgent: string
  nmmUserAgent: string

  constructor(destFolder: string, firefoxVersion: string = '57.0') {
    this.userAgent = this.getUnsuspiciousUserAgent(firefoxVersion)
    if (isValidPath(destFolder)) {
      this.downloadFolder = destFolder
    } else {
      throw new TypeError(destFolder + ' is not a valid path.')
    }
    if (!fs.existsSync(this.downloadFolder)) {
      console.log('folder does not exist')
      fs.mkdir(this.downloadFolder)
    }
  }

  getUnsuspiciousUserAgent(firefoxVersion: string): string {
    // return 'Firefox/' + firefoxVersion
    return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:57.0) Gecko/20100101 Firefox/57.0'
  }

  getNMMUserAgent(version: string): string {
    return 'Nexus Client v' + version
  }

  getEnbArchive(downloadUrl: string): Promise<any> {

    let url
    try {
      url = new URL(downloadUrl)
    } catch (error) {
      // $FlowFixMe
      return Promise.reject(error)
    }

    // the user agent should be assembled so that it matches the os
    const header = {
      uri: url,
      headers: {
        'User-Agent': this.userAgent,
        'Referer': 'http://enbdev.com/mod_falloutnv_v0322.htm'
      },
      encoding: null
    }

    return this.getFile(header)
  }

  getModFromNexus(nmmVersion: string, href: string): Promise<any> {
    const agent = 'Nexus Client v' + nmmVersion
    let url
    try {
      url = new URL(href)
    } catch (error) {
      return Promise.reject(error)
    }

    const header = {
      uri: url,
      headers: { 'User-Agent': agent },
      encoding: null
    }

    return this.getFile(header)
  }

  getFile(header: Object): Promise<any> {
    const fpath: string = this.downloadFolder + '\\' + this.getFileName(header.uri)

    if (!fs.existsSync(fpath)) {
      console.log('Downloading ' + header.uri.href + ' ...')
      return request(header)
      .then(data => {
        fs.writeFileSync(fpath, data)
      })
    }
    return Promise.resolve(true)
  }

  // getUrl(urlString: string, queryString: string = ''): URL {
  //   let url = new URL(urlString);
  //   url.search = queryString;
  //   return url;
  // }

  getFileName(url: URL | string): string {
    let path
    if (typeof url === 'string') {
      path = url
    } else {
      path = url.pathname
    }
    const pathParts = path.split('/')
    return pathParts[pathParts.length - 1]
  }

}

export default Downloader
