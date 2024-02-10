import {mergeRouters} from './trpc'
import {categoryRouter} from "./routers/protected/_router";


export const appRouter = mergeRouters(categoryRouter)


export type AppRouter = typeof appRouter;
