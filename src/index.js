import React from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { initialState } from './model/initialState'
import reducer from './model/reducers'
import App from './components/App'
import { downloadFirefoxVersion } from './model/actionCreatorsAsync'
import registerServiceWorker from './registerServiceWorker'
// import stylesheets
import 'bootstrap/dist/css/bootstrap.css'
import 'open-iconic/font/css/open-iconic-bootstrap.css'
import './index.css'
// import system stuff from Electron
const electron = window.require('electron')
const fs = electron.remote.require('fs')
const os = electron.remote.require('os')

const appFolder: string = os.homedir() + '\\.basemod'
const downloadFolder: string = 'downloads'

// set the app folder where everything gets stored
if (!fs.existsSync(appFolder)) {
  fs.mkdirSync(appFolder)
}
initialState.appFolder = appFolder
initialState.downloadFolder = downloadFolder

// create the store that handles the state tree
let store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunkMiddleware)
)

// <Provider> 'magically' provides the store to every container
render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
)

// not needed in dev
// store.dispatch(downloadFirefoxVersion())

// registerServiceWorker() initializes Electron
registerServiceWorker();

export default store
