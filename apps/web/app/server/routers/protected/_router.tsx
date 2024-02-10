import {publicProcedure, router} from "../../trpc";


export const categoryRouter = router({
  categoryList: publicProcedure.query(async () => {
    return ["Hello"]
  })
})
