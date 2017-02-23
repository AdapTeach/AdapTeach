export const path = {

   contribute: {

      category: {
         create: '/contribute/category/create',
         display: (uuid: string = ':uuid') => `/contribute/category/${uuid}`
      },

      item: {
         create: '/contribute/item/create',
         display: (uuid: string = ':uuid') => `/contribute/item/${uuid}`
      },

      composite: {
         create: '/contribute/composite/create',
         display: (uuid: string = ':uuid') => `/contribute/composite/${uuid}`
      },

      quiz: {
         create: '/contribute/quiz/create',
         display: (uuid: string = ':uuid') => `/contribute/quiz/${uuid}`
      }
   },

   profile: {

      objectives: '/profile/objectives'

   }

}
