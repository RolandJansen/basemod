import os from 'os'
import fs from 'fs'
import mockfs from 'mock-fs'
import IniParser from './IniParser'

describe('An ini parser', () => {
  const game = 'Fallout3'
  const iniFile = 'Fallout.ini'
  const homedir = 'C:\\Users\\someguy'
  const fullPath = homedir + '\\Documents\\My Games\\' + game + '\\' + iniFile
  const iniData = '[General]\r\n'
  + 'bAnimationUseBlendFromPose=1\r\n'
  + 'bEnableProfile=0\r\n\r\n'
  + '[Display]\r\n'
  + 'iMultiSample=0\r\n'
  + 'bDoTallGrassEffect=1\r\n'
  const iniDataObj = {
    General: {
      bAnimationUseBlendFromPose: '1',
      bEnableProfile: '0'
    },
    Display: {
      iMultiSample: '0',
      bDoTallGrassEffect: '1'
    }
  }
  let ip

  beforeEach(() => {

    // mock the filesystem
    mockfs({
      'C:\\Users\\someguy\\Documents\\My Games\\Fallout3': {
        'Fallout.ini': iniData
      }
    })
    os.homedir = jest.fn(() => homedir)
    ip = new IniParser(game, iniFile)
  })

  afterEach(() => {
    // restore normal fs functionallity
    mockfs.restore()
  })

  it('sets the path to \'My Games\'', () => {
    const expectedPath = ip.setupMyGamesPath(game, iniFile)
    expect(expectedPath).toEqual(fullPath)
  })

  it('loads data from an ini file and returns a js object', () => {
    let data = ip.loadIniFile(fullPath)
    expect(data).toEqual(iniDataObj)
  })

  // there should be tests for errors as well

  it('converts an object to ini data and saves it to disk', () => {
    const path = homedir + '\\Documents\\My Games\\' + game + '\\Test.ini'
    ip.iniData = iniDataObj
    const res = ip.saveIniFile(path)
    expect(res).toBeTruthy()
    expect(fs.existsSync(path)).toBeTruthy()
    expect(fs.readFileSync(path, 'utf-8')).toEqual(iniData)
  })

  // there should be tests for errors as well

  describe('getNumberValue', () => {

    // we don't want to rely on other functions so we use a fresh object here
    beforeEach(() => {
      ip.iniData = JSON.parse(JSON.stringify(iniDataObj))
    })

    it('returns a value from ini data as number', () => {
      const numVal = ip.getNumberValue('General', 'bEnableProfile')
      expect(typeof numVal).toEqual('number')
      expect(numVal).toEqual(0)
    })

    it('returns a TypeError if the value can\'t be converted to number', () => {
      ip.iniData.Display.iMultiSample = 'This wont work'
      const err = ip.getNumberValue('Display', 'iMultiSample')
      expect(err.constructor.name).toEqual('TypeError')
    })

    it('returns a TypeError if section or key is wrong', () => {
      const err1 = ip.getNumberValue('Invalid', 'iMultiSample')
      const err2 = ip.getNumberValue('Display', 'iAmNotThere')
      expect(err1.constructor.name).toEqual('TypeError')
      expect(err2.constructor.name).toEqual('TypeError')
      expect(err1.message).toEqual('Section: Invalid and/or key: iMultiSample doesn\'t exist')
    })
  })

  describe('getStringValue', () => {

    // we don't want to rely on other functions so we use a fresh object here
    beforeEach(() => {
      ip.iniData = JSON.parse(JSON.stringify(iniDataObj))
    })

    it('returns a value from ini data as string', () => {
      const strVal = ip.getStringValue('General', 'bEnableProfile')
      expect(typeof strVal).toEqual('string')
      expect(strVal).toEqual('0')
    })

    it('returns a TypeError if section or key is wrong', () => {
      const err1 = ip.getStringValue('Invalid', 'iMultiSample')
      const err2 = ip.getStringValue('Display', 'iAmNotThere')
      expect(err1.constructor.name).toEqual('TypeError')
      expect(err2.constructor.name).toEqual('TypeError')
      expect(err1.message).toEqual('Section: Invalid and/or key: iMultiSample doesn\'t exist')
    })
  })

  describe('changeNumberValue', () => {

    // we don't want to rely on other functions so we use a fresh object here
    beforeEach(() => {
      ip.iniData = JSON.parse(JSON.stringify(iniDataObj))
      ip.iniDataBkup = JSON.parse(JSON.stringify(iniDataObj))
    })

    it('overwrites a field with a number', () => {
      ip.changeNumberValue('General', 'bEnableProfile', 1)
      expect(ip.iniData.General.bEnableProfile).toEqual('1')
    })

    it('overwrites a field with a 0 value', () => {
      ip.changeNumberValue('General', 'bEnableProfile', 0)
      expect(ip.iniData.General.bEnableProfile).toEqual('0')
    })

    it('returns the original value', () => {
      const orgVal = ip.changeNumberValue('General', 'bEnableProfile', 1)
      expect(orgVal).toEqual(0)
    })

    it('returns a TypeError if the field value is not a number', () => {
      ip.iniData.General.bEnableProfile = 'This is not a number'
      const err = ip.changeNumberValue('General', 'bEnableProfile', 4)
      expect(err.constructor.name).toEqual('TypeError')
      expect(err.message).toEqual('Field value: This is not a number is not a number')
    })

    it('returns a TypeError if section or key is wrong', () => {
      const err1 = ip.changeNumberValue('Invalid', 'iMultiSample', 4)
      const err2 = ip.changeNumberValue('Display', 'iAmNotThere', 4)
      expect(err1.constructor.name).toEqual('TypeError')
      expect(err2.constructor.name).toEqual('TypeError')
      expect(err1.message).toEqual('Section: Invalid and/or key: iMultiSample doesn\'t exist')
    })
  })

  describe('changeStringValue', () => {

    // we don't want to rely on other functions so we use a fresh object here
    beforeEach(() => {
      ip.iniData = JSON.parse(JSON.stringify(iniDataObj))
      ip.iniDataBkup = JSON.parse(JSON.stringify(iniDataObj))
    })

    it('overwrites a field with a string value', () => {
      ip.iniData.General.bEnableProfile = 'abc'
      ip.changeStringValue('General', 'bEnableProfile', 'def')
      expect(ip.iniData.General.bEnableProfile).toEqual('def')
    })

    it('returns the original value', () => {
      ip.iniData.General.bEnableProfile = 'abc'
      ip.iniDataBkup.General.bEnableProfile = 'abc'
      const orgVal = ip.changeStringValue('General', 'bEnableProfile', 'def')
      expect(orgVal).toEqual('abc')
    })

    it('returns a TypeError if the field value is a number', () => {
      const err = ip.changeStringValue('General', 'bEnableProfile', 'abc')
      expect(err.constructor.name).toEqual('TypeError')
      expect(err.message).toEqual('Field value: 0 is a number, not a string')
    })

    it('returns a TypeError if section or key is wrong', () => {
      const err1 = ip.changeStringValue('Invalid', 'iMultiSample', 'abc')
      const err2 = ip.changeStringValue('Display', 'iAmNotThere', 'abc')
      expect(err1.constructor.name).toEqual('TypeError')
      expect(err2.constructor.name).toEqual('TypeError')
      expect(err1.message).toEqual('Section: Invalid and/or key: iMultiSample doesn\'t exist')
    })
  })

  it('restores the original values of the ini data', () => {
    ip.iniData = JSON.parse(JSON.stringify(iniDataObj))
    ip.iniDataBkup = JSON.parse(JSON.stringify(iniDataObj))
    ip.iniData.General.bEnableProfile = 'abc'
    ip.iniData.Display.iMultiSample = '23'
    ip.restoreOrgValues()
    expect(ip.iniData).toEqual(iniDataObj)
  })
})
