/* @flow */
import type { Preset } from './presets/enbPresetTypes'
import midhrasticEnb from './presets/midhrasticEnb'
import enhancedShaders from './presets/enhancedShaders'

/**
 * All data and objects that form the initial state of the app go here.
 */
export type Game = {
  name: string,
  id: number,
  enbPresets: Array<Preset>
}

export type State = {
  nmmVersion: string,
  activeGame: string,
  Fallout3: Game,
  FalloutNV: Game,
  // Fallout4: Game,
  // Skyrim: Game,
  // SkyrimSE: Game,
  // Morrowind: Game,
  // Oblivion: Game
}

let Fallout3: Game = {
  name: 'Fallout3',
  id: 120,
  enbPresets: [ midhrasticEnb ]
}

let FalloutNV: Game = {
  name: 'FalloutNV',
  id: 130,
  enbPresets: [ enhancedShaders ]
}

let Fallout4: Game = {
  name: 'Fallout4',
  id: 1151,
  enbPresets: []
}

let Skyrim: Game = {
  name: 'Skyrim',
  id: 110,
  enbPresets: []
}

let SkyrimSE: Game = {
  name: 'SkyrimSE',
  id: 1704,
  enbPresets: []
}

let Morrowind: Game = {
  name: 'Morrowind',
  id: 100,
  enbPresets: []
}

let Oblivion: Game = {
  name: 'Oblivion',
  id: 101,
  enbPresets: []
}

export const initialState: State = {
  nmmVersion: '0.63.14',
  activeGame: '',
  Fallout3: Fallout3,
  FalloutNV: FalloutNV,
  // Fallout4: Fallout4,
  // Skyrim: Skyrim,
  // SkyrimSE: SkyrimSE,
  // Morrowind: Morrowind,
  // Oblivion: Oblivion
}
