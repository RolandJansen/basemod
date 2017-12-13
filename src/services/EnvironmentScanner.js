const electron = window.require('electron')
const os = electron.remote.require('os')
const fs = electron.remote.require('fs')

class EnvironmentScanner {

  /**
   * Assembles the full path of the ini file
   * @param  {string} gameName    The game this ini belongs to
   * @param  {string} iniFileName Name of ini file
   * @return {string}             full path of the ini file
   */
  getMyGamesPath(gameName: string, iniFileName: string): string {
    // is iniFileName valid?
    const myGames = os.homedir() + '\\Documents\\My Games\\' + gameName + '\\' + iniFileName
    // does this path exists?
    return myGames
  }
}

export default EnvironmentScanner
