import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Required by MaterialUI until React reaches v1
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import store from './store'

import {UI} from '../ui'

const muiTheme = getMuiTheme({})

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <UI/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
