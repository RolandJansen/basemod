import {
  CHANGE_NMM_VERSION,
  ADD_ENB_PRESET
} from './actionTypes';
import {
  changeNmmVersion,
  addEnbPreset
} from './actionCreators'

xdescribe('changeNmmVersion', () => {
  const validVersion1 = '1.23.42'
  const validVersion2 = '1.23'
  const validVersion3 = '1'
  const invalidVersion = '1.foo.666'
  const errorAction = {
    type: CHANGE_NMM_VERSION,
    payload: invalidVersion,
    error: true,
    meta: 'Wrong version format'
  }

  function getValidAction(version: string): Object {
    return {
      type: CHANGE_NMM_VERSION,
      payload: version
    }
  }

  it('returns an action object when given a version format x+.y+.z+', () => {
    const res = changeNmmVersion(validVersion1)
    expect(res).toEqual(getValidAction(validVersion1));
  })

  it('returns an action object when given a version format x+.y+', () => {
    const res = changeNmmVersion(validVersion2)
    expect(res).toEqual(getValidAction(validVersion2));
  })

  it('returns an action object when given a version format x+', () => {
    const res = changeNmmVersion(validVersion3)
    expect(res).toEqual(getValidAction(validVersion3));
  })

  it('sets error to true when not given a valid version', () => {
    const res = changeNmmVersion(invalidVersion)
    expect(res.error).toBeTruthy();
  })

  it('sets a comment as meta field when not given a valid version', () => {
    const res = changeNmmVersion(invalidVersion)
    expect(res.meta).toEqual('Wrong version format');
  })
})

xdescribe('addEnbPreset', () => {
  const preset = { name: 'superEnb', id: 123 }
  const action = { type: ADD_ENB_PRESET, payload: preset }

  it('returns a valid action', () => {
    const res = addEnbPreset(preset)
    expect(res).toEqual(action)
  })
})
