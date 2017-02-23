import createHistory from 'history/createBrowserHistory'

const history = createHistory()

export const router = {

   history,

   goTo(path) {
      history.push(path)
   }

}
