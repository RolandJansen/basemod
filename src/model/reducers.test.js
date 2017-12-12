import {createStore} from 'redux'
import type {Preset}
from './presets/enbPresetTypes'
import {initialState} from './initialState'
import reducer from './reducers'
import * as at from './actionTypes'
import * as ac from './actionCreators'

/**
 * These its are made against the public API.
 * For every it a store is created, then an
 * action gets dispatched and the new state will be
 * compared to the old one. This is much more realistic
 * then iting each and every function in isolation.
 */
describe('A synchronous action', () => {
  let store
  let oldState
  let newState

  beforeEach(() => {
    const state = JSON.parse(JSON.stringify(initialState))  //keep initialState clean
    store = createStore(reducer, state)
  })

  afterEach(() => {
    store = oldState = newState = null
  })

  describe(at.CHANGE_APP_FOLDER, () => {

    it('changes app folder when given a valid path', () => {
      const path = 'D:\\a\\new\\app\\folder'
      oldState = store.getState()['appFolder']
      store.dispatch(ac.changeAppFolder(path))
      newState = store.getState()['appFolder']
      expect(oldState).toBe('')
      expect(newState).toBe(path)
    })

    it('doesn\'t changes app folder when given an invalid path', () => {
      const path = 'not a valid path 123 **#&%$'
      store.dispatch(ac.changeAppFolder(path))
      newState = store.getState()['appFolder']
      expect(newState).toBe('')
    })
  })

  describe(at.CHANGE_DOWNLOAD_FOLDER, () => {

    it('changes download folder when given a valid path', () => {
      const path = 'a\\valid\\path'
      oldState = store.getState()['downloadFolder']
      store.dispatch(ac.changeDownloadFolder(path))
      newState = store.getState()['downloadFolder']
      expect(oldState).toBe('')
      expect(newState).toBe(path)
    })

    it('doesn\'t change download folder when given an invalid path', () => {
      const path = 'not a valid path 123 **#&%$'
      store.dispatch(ac.changeDownloadFolder(path))
      newState = store.getState()['downloadFolder']
      expect(newState).toBe('')
    })
  })

  describe(at.SELECT_GAME, () => {

    it('changes the selected game when given a valid name', () => {
      const game = 'FalloutNV'
      oldState = store.getState()['selectedGame']
      store.dispatch(ac.selectGame(game))
      newState = store.getState()['selectedGame']
      expect(oldState).toBe('')
      expect(newState).toBe(game)
    })

    it('doesn\'t change the selected game when given an invalid name', () => {
      // why does this work? Should be a flow error.
      store.dispatch(ac.selectGame('foo'))
      newState = store.getState()['selectedGame']
      expect(newState).toBe('')
    })
  })

  describe(at.SELECT_ENB_PRESET, () => {
    const gameName: string = 'FalloutNV'
    const presetId: number = 49882
    let presets: Array<Preset>
    let presetPos: number

    beforeEach(() => {
      presets = store.getState()[gameName]['enbPresets']
      presets.forEach((preset, key) => {
        if (preset.id === presetId) {
          presetPos = key
        }
      })
    })

    it('selects an ENB preset when given a valid id', () => {
      oldState = store.getState()[gameName]['enbPresets'][presetPos]
      store.dispatch(ac.selectEnbPreset(presetId, gameName))
      newState = store.getState()[gameName]['enbPresets'][presetPos]
      expect(oldState.isSelected).toBeFalsy()
      expect(newState.isSelected).toBeTruthy()
    })

    it('does nothing when given an invalid id', () => {
      let value: boolean //will be true if any preset is selected
      store.dispatch(ac.selectEnbPreset(23, gameName))
      store.getState()[gameName]['enbPresets'].forEach(preset => {
        if (preset.isSelected) {
          value = true
        }
      })
      expect(value).toBeFalsy()
    })

    it('deselects all other ENB presets', () => {
      // make another preset active
      let otherPreset: number
      const epLength = store.getState()['FalloutNV']['enbPresets'].length
      if (presetPos < epLength - 1) {
        otherPreset = presetPos + 1
      } else {
        otherPreset = presetPos - 1
      }
      store.getState()[gameName]['enbPresets'][otherPreset].isSelected = true

      // here's the test
      store.dispatch(ac.selectEnbPreset(presetId, gameName))
      expect(store.getState()[gameName]['enbPresets'][otherPreset].isSelected).toBeFalsy()
      expect(store.getState()[gameName]['enbPresets'][presetPos].isSelected).toBeTruthy()
    })
  })

  describe(at.DESELECT_ENB_PRESETS, () => {

    beforeEach(() => {
      store.getState()['FalloutNV']['enbPresets'][0].isSelected = true
      oldState = store.getState()['FalloutNV']['enbPresets'][0].isSelected
    })

    it('deselects all ENB presets', () => {
      store.dispatch(ac.deselectEnbPresets('FalloutNV'))
      newState = store.getState()['FalloutNV']['enbPresets'][0].isSelected
      expect(oldState).toBeTruthy()
      expect(newState).toBeFalsy()
    })

    it('does nothing when given an invalid game name', () => {
      store.dispatch(ac.deselectEnbPresets('noValidGame'))
      newState = store.getState()['FalloutNV']['enbPresets'][0].isSelected
      expect(newState).toBeTruthy()
    })
  })

  /*****************************************************************
   * actions below are triggered by async actions in the middleware
   */
  describe('represets middleware state', () => {
    const gameName = 'FalloutNV'
    const error = new Error('A very serious problem occurred!')

    describe(at.DOWNLOAD_ENB_INIT, () => {

      it('sets isFetching for a game to true', () => {
        oldState = store.getState()[gameName]['isFetching']
        store.dispatch(ac.downloadEnbInit(gameName))
        newState = store.getState()[gameName]['isFetching']
        expect(oldState).toBe(false)
        expect(newState).toBe(true)
      })

      it('does nothing when given an invalid game name', () => {
        store.dispatch(ac.downloadEnbInit('noValidGame'))
        newState = store.getState()[gameName]['isFetching']
        expect(newState).toBe(false)
      })
    })

    describe(at.DOWNLOAD_ENB_SUCCESS, () => {

      beforeEach(() => {
        store.getState()[gameName]['isFetching'] = true
        oldState = store.getState()[gameName]['isFetching']
      })

      it('sets isFetching for a game to false', () => {
        store.dispatch(ac.downloadEnbSuccess(gameName))
        newState = store.getState()[gameName]['isFetching']
        expect(oldState).toBe(true)
        expect(newState).toBe(false)
      })

      it('sets lastUpdated to a timestamp value', () => {
        const action = store.dispatch(ac.downloadEnbSuccess(gameName))
        newState = store.getState()[gameName]['lastUpdated']
        expect(newState).toEqual(action.timestamp)
      })

      it('does nothing when given an invalid game name', () => {
        store.dispatch(ac.downloadEnbSuccess('noValidGame'))
        newState = store.getState()[gameName]['isFetching']
        const ts = store.getState()[gameName]['lastUpdated']
        expect(newState).toBe(true)
        expect(ts).toEqual(0)
      })
    })

    describe(at.DOWNLOAD_ENB_ERROR, () => {

      beforeEach(() => {
        store.getState()[gameName]['isFetching'] = true
        oldState = store.getState()[gameName]['isFetching']
      })

      it('sets isFetching for a game to false', () => {
        store.dispatch(ac.downloadEnbError(gameName, error))
        newState = store.getState()[gameName]['isFetching']
        expect(oldState).toBe(true)
        expect(newState).toBe(false)
      })

      //TODO: ADD ERROR HANDLING TEST HERE

      it('does nothing when given another game name', () => {
        store.dispatch(ac.downloadEnbError('Oblivion', error))
        newState = store.getState()[gameName]['isFetching']
        expect(newState).toBe(true)
      })
    })

    describe('for enb presets', () => {
      const modID = 49882 // enhanced shaders
      let enbs: Object<any>
      let modPointer: number

      beforeEach(() => {
        enbs = store.getState()[gameName]['enbPresets']
        enbs.forEach((preset, key) => {
          if (preset.id === modID) {
            modPointer = key
          }
        })
      })

      afterEach(() => {
        enbs = null
      })

      describe(at.FETCH_MOD_INFOS_INIT, () => {

        it('sets isFetching for a preset to true', () => {
          oldState = enbs[modPointer]['isFetching']
          store.dispatch(ac.fetchModInfosInit(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['isFetching']
          expect(oldState).toBe(false)
          expect(newState).toBe(true)
        })
      })

      describe(at.FETCH_MOD_INFOS_SUCCESS, () => {

        it('sets isFetching for a preset to false', () => {
          oldState = enbs[modPointer]['isFetching'] = true
          store.dispatch(ac.fetchModInfosSuccess(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['isFetching']
          expect(oldState).toBe(true)
          expect(newState).toBe(false)
        })

        it('sets lastUpdated to action.timestamp', () => {
          const ts = Date.now()
          oldState = enbs[modPointer]['lastUpdated']
          store.dispatch(ac.fetchModInfosSuccess(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['lastUpdated']
          expect(oldState).toEqual(0)
          expect(newState).toBeGreaterThanOrEqual(ts)
        })
      })

      describe(at.FETCH_MOD_INFOS_ERROR, () => {})

      describe(at.FETCH_MOD_FILE_INFOS_INIT, () => {

        it('sets isFetching for a preset to true', () => {
          oldState = enbs[modPointer]['isFetching']
          store.dispatch(ac.fetchModFileInfosInit(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['isFetching']
          expect(oldState).toBe(false)
          expect(newState).toBe(true)
        })
      })

      describe(at.FETCH_MOD_FILE_INFOS_SUCCESS, () => {

        it('sets isFetching for a preset to false', () => {
          oldState = enbs[modPointer]['isFetching'] = true
          store.dispatch(ac.fetchModFileInfosSuccess(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['isFetching']
          expect(oldState).toBe(true)
          expect(newState).toBe(false)
        })

        it('sets lastUpdated to action.timestamp', () => {
          const ts = Date.now()
          oldState = enbs[modPointer]['lastUpdated']
          store.dispatch(ac.fetchModFileInfosSuccess(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['lastUpdated']
          expect(oldState).toEqual(0)
          expect(newState).toBeGreaterThanOrEqual(ts)
        })
      })

      describe(at.FETCH_MOD_FILE_INFOS_ERROR, () => {})

      describe(at.FETCH_MOD_FILE_DLURL_INIT, () => {

        it('sets isFetching for a preset to true', () => {
          oldState = enbs[modPointer]['isFetching']
          store.dispatch(ac.fetchModFileDurlInit(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['isFetching']
          expect(oldState).toBe(false)
          expect(newState).toBe(true)
        })
      })

      describe(at.FETCH_MOD_FILE_DLURL_SUCCESS, () => {

        it('sets isFetching for a preset to false', () => {
          oldState = enbs[modPointer]['isFetching'] = true
          store.dispatch(ac.fetchModFileDurlSuccess(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['isFetching']
          expect(oldState).toBe(true)
          expect(newState).toBe(false)
        })

        it('sets lastUpdated to action.timestamp', () => {
          const ts = Date.now()
          oldState = enbs[modPointer]['lastUpdated']
          store.dispatch(ac.fetchModFileDurlSuccess(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['lastUpdated']
          expect(oldState).toEqual(0)
          expect(newState).toBeGreaterThanOrEqual(ts)
        })
      })

      describe(at.FETCH_MOD_FILE_DLURL_ERROR, () => {})

      describe(at.DOWNLOAD_MOD_FILE_INIT, () => {

        it('sets isFetching for a preset to true', () => {
          oldState = enbs[modPointer]['isFetching']
          store.dispatch(ac.downloadModFileInit(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['isFetching']
          expect(oldState).toBe(false)
          expect(newState).toBe(true)
        })
      })

      describe(at.DOWNLOAD_MOD_FILE_SUCCESS, () => {

        it('sets isFetching for a preset to false', () => {
          oldState = enbs[modPointer]['isFetching'] = true
          store.dispatch(ac.downloadModFileSuccess(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['isFetching']
          expect(oldState).toBe(true)
          expect(newState).toBe(false)
        })

        it('sets lastUpdated to action.timestamp', () => {
          const ts = Date.now()
          oldState = enbs[modPointer]['lastUpdated']
          store.dispatch(ac.fetchModFileDurlSuccess(modID, gameName))
          newState = store.getState()[gameName]['enbPresets'][modPointer]['lastUpdated']
          expect(oldState).toEqual(0)
          expect(newState).toBeGreaterThanOrEqual(ts)
        })
      })

      describe(at.DOWNLOAD_MOD_FILE_ERROR, () => {})
    })

    describe(at.FILE_EXTRACT_INIT, () => {
      const fname = 'A:\\valid\\windows\\path\\file.zip'

      it('sets isExtracting in 7zip state to true', () => {
        oldState = store.getState().sevenZip.isExtracting
        store.dispatch(ac.fileExtractInit(fname))
        newState = store.getState().sevenZip.isExtracting
        expect(oldState).toBe(false)
        expect(newState).toBe(true)
      })
    })

    describe(at.FILE_EXTRACT_SUCCESS, () => {
      const fname = 'A:\\valid\\windows\\path\\file.zip'

      it('sets isExtracting in 7zip state to false', () => {
        oldState = store.getState().sevenZip.isExtracting = true
        store.dispatch(ac.fileExtractSuccess(fname))
        newState = store.getState().sevenZip.isExtracting
        expect(oldState).toBe(true)
        expect(newState).toBe(false)
      })

      it('adds a new entry to the extractedFiles array', () => {
        oldState = store.getState().sevenZip.extractedFiles
        const action = store.dispatch(ac.fileExtractSuccess(fname))
        newState = store.getState().sevenZip.extractedFiles
        expect(oldState.length).toEqual(0)
        expect(newState.length).toEqual(1)
        expect(newState[0]).toEqual({
          fullPath: action.payload,
          timestamp: action.timestamp
        })
      })
    })

    describe(at.FILE_EXTRACT_ERROR, () => {})
  })

})
