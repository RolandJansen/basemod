/* @flow */
import { connect } from 'react-redux'
import { activateEnbPreset } from '../model/actionCreators'
import EnbChooser from '../components/EnbChooser'

const getENBsForCurrentGame = state => {
  let enbs = []
  if (state.selectedGame) {
    const enbSubTree = state[state.selectedGame]['enbPresets']
    enbSubTree.forEach((enb) => {
      enbs.push({
        id: enb.id,
        name: enb.name
      })
    })
  }
  return enbs
}

const mapStateToProps = state => {
  return {
    enbs: getENBsForCurrentGame(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEnbChange: enbID => {
      console.log('ID is: ' + enbID)
      dispatch(activateEnbPreset(enbID))
    },
    onEnbInstall: enbID => {
      console.log('Install id: ' + enbID)
    }
  }
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnbChooser)

export default MainContainer
