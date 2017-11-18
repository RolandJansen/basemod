/* @flow */
import { connect } from 'react-redux'
import { selectGame } from '../model/actionCreators'
import TopNav from '../components/TopNav'

const getGameList = rootState => {
  let games = []
  Object.keys(rootState).forEach(key => {
    if ((rootState[key]['name'])) {
      games.push({
        id: rootState[key]['id'],
        name: rootState[key]['name'],
      })
    }
  })
  return games
}

const mapStateToProps = state => {
  return {
    games: getGameList(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGameSelect: gameName => {
      dispatch(selectGame(gameName))
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNav)

export default HeaderContainer
