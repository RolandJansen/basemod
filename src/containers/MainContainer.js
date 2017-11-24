/* @flow */
import { connect } from 'react-redux'
import { selectEnbPreset } from '../model/actionCreators'
import { installEnbPreset } from '../model/actionCreatorsAsync'
import EnbSelector from '../components/EnbSelector'


const getENBsForSelectedGame = state => {
  let enbs = []
  if (state.selectedGame) {
    enbs = state[state.selectedGame]['enbPresets']
  }
  return enbs
}

const mapStateToProps = state => {
  return {
    enbs: getENBsForSelectedGame(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEnbSelect: enbID => {
      dispatch(selectEnbPreset(enbID))
    },
    onEnbInstall: enbID => {
      dispatch(installEnbPreset(enbID))
    }
  }
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnbSelector)

export default MainContainer
