import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

// Required by MaterialUI until React reaches v1
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import store from './store'

import {App} from '../ui'

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
