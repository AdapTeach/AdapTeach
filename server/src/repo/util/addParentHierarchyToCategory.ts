export const addParentHierarchyToCategory = (category, parents) => {
   if (parents.length > 0) {
      const parentHierarchy = parents.reduceRight((accumulator, current) => {
         if (!accumulator) return current // current Category is root
         current.parent = accumulator
         return current
      })
      category.parent = parentHierarchy
   }
}
