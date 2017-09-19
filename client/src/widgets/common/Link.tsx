import * as React from 'react'
import {router} from '../../router/router'

const navigateTo = (path: string) => (event) => {
   event.preventDefault()
   router.goTo(path)
}

export const Link: React.StatelessComponent<{ path: string }> = ({path, children}) =>
   <a onClick={navigateTo(path)}>
      {children}
   </a>
