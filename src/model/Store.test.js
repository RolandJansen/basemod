import store from './store'

it('should contain the initial state', () => {
  const state = store.getState()
  expect(state.nmmVersion).toEqual('0.63.14')
})
