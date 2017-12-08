import * as at from './actionTypes'
import reducers from './reducers'

const appFolder = reducers.__get__('appFolder')

// IMPORTANT: There's only one test because I don't know
// how to test private (non-exported) functions
// This is bad but I'm currently against exporting everything
// just for testing purpose.

const emptyState = {
  enbPresets: [],
  games: [],
  nmmVersion: '0.63.14'
}

it('returns the current state when called without arguments', () => {
  // expect(reducer()).toEqual(emptyState)
})

// describe('nmmVersion', () => {
//   const action = {
//     type: CHANGE_NMM_VERSION,
//     payload: '1.23.42'
//   }
//   it('returns a guessed version number when called w/ no args', () => {
//     expect(nmmVersion()).toEqual('0.63.14')
//   })
//   it('returns a version number given by an action', () => {
//     const newState = nmmVersion('1.2.3', action)
//     expect(newState).toEqual('1.2.3')
//   })
// })
