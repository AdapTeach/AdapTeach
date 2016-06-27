import {DataStore, eventQueue, Endpoint} from 'util'

const endpoint = Endpoint('quiz')

class QuizData extends DataStore {

  constructor() {
    super(eventQueue, endpoint)
  }

}

export const quizData = new QuizData()
