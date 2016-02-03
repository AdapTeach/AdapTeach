import axios from 'axios'

import store from '../store'

const updateList = function () {
  axios.get('http://localhost:8000/api/category/list')
    .then(response => {
        store.dispatch({
          type: 'CATEGORY_LIST_UPDATED',
          data: response.data
        })
      }
    )
}

updateList()

export default {
  updateList
}
