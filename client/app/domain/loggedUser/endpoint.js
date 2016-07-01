import axios from 'axios'

export const endpoint = {

  addObjective(objective) {
    return axios.put(`http://localhost:8000/api/loggedUser/objectives/${objective.uuid}`, {})
      .then(response => response.data)
  }

}
