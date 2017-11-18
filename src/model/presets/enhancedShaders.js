import type { Preset } from './enbPresetTypes'

/**
 * This is a configuration file for an ENB preset.
 * The orgValue fields are not necessarily the same
 * on every machine but it doesn't matter because
 * they get overwritten with the actual values from
 * the ini files.
 */
let enhancedShaders: Preset = {
    isSelected: false,
    isInstalled: false,
    isRequesting: false,
    lastUpdate: 0,
    name: 'Enhanced Shaders - ENB',
    id: 49882,
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

export default enhancedShaders
