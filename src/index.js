import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { initialState } from './model/initialState'
import reducer from './model/reducers'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
// import stylesheets
import 'bootstrap/dist/css/bootstrap.css'
import 'open-iconic/font/css/open-iconic-bootstrap.css'
import './index.css'

// create the store that handles the state tree
let store = createStore(reducer, initialState)

// <Provider> 'magically' provides the store to every container
render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
)

// registerServiceWorker() initializes Electron
registerServiceWorker();
