import axios from 'axios'

export const endpoint = {

  addObjective(objectiveId) {
    return axios.put(`http://localhost:8000/api/loggedUser/objectives/${objectiveId}`, {})
      .then(response => response.data)
  },

  findObjectives() {
    return axios.get(`http://localhost:8000/api/loggedUser/objectives`)
      .then(response => response.data)
  },

  removeObjective(objectiveId) {
    return axios.delete(`http://localhost:8000/api/loggedUser/objectives/${objectiveId}`)
  }

}
