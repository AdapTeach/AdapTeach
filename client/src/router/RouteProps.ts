export interface RouteProps<P> {
   match: {
      isExact: boolean,
      params: P,
      path: string,
      url: string
   }
}
