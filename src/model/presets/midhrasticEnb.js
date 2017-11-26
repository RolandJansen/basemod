import type { Preset } from './enbPresetTypes'

/**
 * This is a configuration file for an ENB preset.
 * The orgValue fields are not necessarily the same
 * on every machine but it doesn't matter because
 * they get overwritten with the actual values from
 * the ini files.
 */
let midhrasticEnb: Preset = {
    isSelected: false,
    isInstalled: false,
    isRequesting: false,
    lastUpdate: 0,
    name: 'Midhrastic ENB',
    id: 18107,
    fileId: 85290,
    gameId: 120,
    gameName: 'Fallout3',
    ini: [
      {
        section: 'Display',
        key: 'iMultiSample',
        value: 1,
        orgValue: 0
      },
      {
        section: 'Display',
        key: 'iMaxAnisotropy',
        value: 1,
        orgValue: 8
      }
    ],
    prefs: [
      {
        section: 'Display',
        key: 'iMultiSample',
        value: 1,
        orgValue: 4
      },
      {
        section: 'Display',
        key: 'iMaxAnisotropy',
        value: 1,
        orgValue: 15
      },
      {
        section: 'Display',
        key: 'bTransparencyMultisampling',
        value: 0,
        orgValue: 1,
      },
      {
        section: 'Display',
        key: 'iWaterMultisamples',
        value: 1,
        orgValue: 4
      }
    ]
  }

export default midhrasticEnb
