/* @flow */

/**
 * All data and objects that form the initial state of the app go here.
 */

type Game = {
  name: string,
  id: number,
  active: boolean
}

export type State = {
  nmmVersion: string,
  games: Array<Object>,
  enbPresets: Array<Object>
}

var games: Array<Game> = [
  {
    name: 'Fallout3',
    id: 120,
    active: true
  }, {
    name: 'FalloutNV',
    id: 130,
    active: false
  }, {
    name: 'Fallout4',
    id: 1151,
    active: false
  }, {
    name: 'Morrowind',
    id: 100,
    active: false
  }, {
    name: 'Oblivion',
    id: 101,
    active: false
  }, {
    name: 'Skyrim',
    id: 110,
    active: false
  }, {
    name: 'SkyrimSE',
    id: 1704,
    active: false
  }
]

export var initialState: State = {
  nmmVersion: '0.63.14',
  games: games,
  enbPresets: []
}
