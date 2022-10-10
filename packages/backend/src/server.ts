import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import createContext, { Context } from './Context';
import AuthController from './controllers/AuthController';
import TodosController from './controllers/TodosController';
export const appRouter = trpc
  .router<Context>()
  .query('hello', {
    resolve() {
      return 'world';
    },
  })
  .merge('auth/', AuthController)
  .merge('todos/', TodosController);

export type AppRouter = typeof appRouter;
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(
  '/api',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
// create handler
// const handler = trpc.createHttpHandler({
//   router: appRouter,
//   createContext,
// });
app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
