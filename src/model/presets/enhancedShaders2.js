import type { Preset } from './enbPresetTypes'

// THIS IS JUST FOR TESTING IN EARLY DEV.
// DIFFERENT FLAVORS OF THE SAME ENB SHOULD BE HANDLED IN 'advanced options' or so.

/**
 * This is a configuration file for an ENB preset.
 * The orgValue fields are not necessarily the same
 * on every machine but it doesn't matter because
 * they get overwritten with the actual values from
 * the ini files.
 */
let enhancedShadersNeutral: Preset = {
    isSelected: false,
    isInstalled: false,
    isFetching: false,
    lastUpdated: 0,
    name: 'Enhanced Shaders - Neutral Edition',
    id: 2342,
    fileId: 0,
    gameId: 130,
    gameName: 'FalloutNV',
    enbMinVersion: '0.278',
    ini: [
      {
        key: 'iMultiSample',
        value: 0,
        orgValue: 0,
        meta: 'Seems to have no influence on the game, but anyway'
      },
      {
        key: 'iMaxAnisotropy',
        value: 0,
        orgValue: 15,
        meta: 'Seems to have no influence on the game, but anyway'
      },
      {
        key: 'bUseWaterDisplacements',
        value: 0,
        orgValue: 1,
        meta: 'Seems to have no influence on the game, but anyway'
      }

    ],
    prefs: [
      {
        section: 'Display',
        key: 'iMultiSample',
        value: 0,
        orgValue: 8,
        meta: 'This represents MSSA (MultiSample AntiAliasing)'
      },
      {
        section: 'Display',
        key: 'iMaxAnisotropy',
        value: 0,
        orgValue: 15
      },
      {
        section: 'Display',
        key: 'bTransparencyMultisampling',
        value: 0,
        orgValue: 1
      }, {
        section: 'Water',
        key: 'bUseWaterDisplacements',
        value: 0,
        orgValue: 1
      }
    ]
  }

export default enhancedShadersNeutral
