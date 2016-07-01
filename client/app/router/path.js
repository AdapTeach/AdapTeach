export const path = {

  contribute: {

    category: {
      create: '/contribute/category/create',
      display: id => `/contribute/category/${id}`
    },

    item: {
      create: '/contribute/item/create',
      display: id => `/contribute/item/${id}`
    },

    composite: {
      create: '/contribute/composite/create',
      display: id => `/contribute/composite/${id}`
    },

    quiz: {
      create: '/contribute/quiz/create',
      display: id => `/contribute/quiz/${id}`
    }
  },

  profile: {

    objectives: '/profile/objectives'

  }

}
