import endpoint from './endpoint'

import {DataStore, eventQueue} from 'util'

class QuizData extends DataStore {

  constructor() {
    super(eventQueue, endpoint)
  }

}

export const quizData = new QuizData()
