import Reducer from './Reducer';
// const r = reducers;

describe('an initialState', () => {
  it('has a games field', () => {
    expect(r.initialState.games).toBeDefined();
  });

  it('has a enbPresets field', () => {
    expect(r.initialState.enbPresets).toBeDefined();
  })
});

describe('a masterReducer', () => {
  it('should return the initial state when called without arguments', () => {
    expect(mainReducer()).toEqual(r.initialState);
  })
})
