import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {render} from 'react-dom'

require('./style.scss')

// Required by MaterialUI until React reaches v1
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import {UI} from '../ui'

const muiTheme = getMuiTheme({})

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <UI/>
  </MuiThemeProvider>,
  document.getElementById('root')
)
