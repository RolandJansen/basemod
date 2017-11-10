/* @flow */
import fs from 'fs'
import os from 'os'
import ini from 'ini'

/**
 * Reads an ini or pref file and converts it to a js
 * object. The data can be modified, converted into
 * ini format and saved back to the file.
 * @type {class}
 */
class IniParser {
  iniPath: string
  iniData: Object
  iniDataBkup: Object

  constructor(gameName: string, iniFileName: string) {
    this.iniPath = this.setupMyGamesPath(gameName, iniFileName)
    this.iniData = this.loadIniFile(this.iniPath)
    this.iniDataBkup = JSON.parse(JSON.stringify(this.iniData))  // make a (deep) copy by value
  }

  /**
   * Assembles the full path of the ini file
   * @param  {string} gameName    The game this ini belongs to
   * @param  {string} iniFileName Name of ini file
   * @return {string}             full path of the ini file
   */
  setupMyGamesPath(gameName: string, iniFileName: string): string {
    return os.homedir() + '\\Documents\\My Games\\' + gameName + '\\' + iniFileName
  }

  /**
   * Loads the data from an ini file
   * @param  {string} path full path of the ini file
   * @return {Object}      ini data wrapped in a js object
   */
  loadIniFile(path: string): Object {
    let iniData: Object = {}
    try {
      iniData = ini.parse(fs.readFileSync(path, 'utf-8'))

    } catch(err) {
      console.log('error')
      if (err.code === 'ENOENT') {
        // we have a file not found error
        // wrap the error, build/dispatch action, and exit
      } else {
        // something else went wrong
        // wrap the error, build/dispatch action, and exit
      }
    }
    return iniData
  }

  /**
   * Saves the data to an ini file
   * @param  {string} path full path of the ini file
   * @return {boolean}      success indicator
   */
  saveIniFile(path: string): boolean {
    let success = false
    try {
      fs.writeFileSync(path, ini.stringify(this.iniData))
      success = true
    } catch(err) {
      if (err.code === 'ENOENT') {
        // see above
      } else {
        // see above
      }
      success = false
    }
    return success
  }

  /**
   * Retrieve a value as number from the ini data
   * @param  {string} section Section where the key is defined
   * @param  {string} key     Variable or keyword
   * @return {number}         data from the specified key
   */
  getNumberValue(section: string, key: string): number | Object {
    if (this.iniData[section] && this.iniData[section][key]) {
      const val = this.iniData[section][key]
      if (!isNaN(val)) {
        return Number(val)
      }
      return new TypeError('Value: ' + val + ' cannot converted to type number')
    } else {
      return new TypeError('Section: ' + section + ' and/or key: ' + key + ' doesn\'t exist')
    }
  }

  /**
   * Retrieve a value as string from the ini data
   * @param  {string} section Section where the key is defined
   * @param  {string} key     Variable or keyword
   * @return {string}         data from the specified key
   */
  getStringValue(section: string, key: string): string | Object {
    // values are strings by default so we don't have to check this
    if (this.iniData[section] && this.iniData[section][key]) {
      return this.iniData[section][key]
    }
    return new TypeError('Section: ' + section + ' and/or key: ' + key + ' doesn\'t exist')
  }

  /**
   * Change a number value in the ini object
   * @param  {string} section Section where the key is defined
   * @param  {string} key     Variable or keyword
   * @param  {number} val     New value
   * @return {number}         The old value that has been replaced
   */
  changeNumberValue(section: string, key: string, val: number): number | Object {
    if (this.iniData[section] && this.iniData[section][key]) {
      if (!isNaN(this.iniData[section][key])) {
        this.iniData[section][key] = val.toString()
        return Number(this.iniDataBkup[section][key])
      }
      return new TypeError('Field value: ' + this.iniData[section][key] + ' is not a number')
    }
    return new TypeError('Section: ' + section + ' and/or key: ' + key + ' doesn\'t exist')
  }

  /**
   * Change a string value in the ini object
   * @param  {string} section Section where the key is defined
   * @param  {string} key     Variable or keyword
   * @param  {string} val     New value
   * @return {string}         The old value that has been replaced
   */
  changeStringValue(section: string, key: string, val: string): string | Object {
    if (this.iniData[section] && this.iniData[section][key]) {
      if (isNaN(this.iniData[section][key])) {
        this.iniData[section][key] = val
        return this.iniDataBkup[section][key]
      }
      return new TypeError('Field value: ' + this.iniData[section][key] + ' is a number, not a string')
    }
    return new TypeError('Section: ' + section + ' and/or key: ' + key + ' doesn\'t exist')
  }

  /**
   * Restores the original values, overwrites all changes made
   * to the ini object. Can be used to startover without an expensive
   * file read.
   * @return {Object}   The ini object that gets overwritten
   */
  restoreOrgValues(): Object {
    const rejectedIniState = JSON.parse(JSON.stringify(this.iniData))
    this.iniData = JSON.parse(JSON.stringify(this.iniDataBkup))
    return rejectedIniState
  }
}

export default IniParser
