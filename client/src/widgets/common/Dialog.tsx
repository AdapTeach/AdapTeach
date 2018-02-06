import * as React from 'react'

type Props = {
   visible?: boolean
   onConfirm?: () => void
   onCancel?: () => void
}

type State = {}

export class Dialog extends React.Component<Props, State> {

   render() {
      const { children, visible, onConfirm, onCancel } = this.props
      return visible ? <div>
         {children}
         <hr />
         <input type='button' value='OK' onClick={onConfirm} />
         <input type='button' value='Cancel' onClick={onCancel} />
      </div> : null
   }

}
