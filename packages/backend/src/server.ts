import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import createContext, { Context } from './Context';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
export const appRouter = trpc
  .router<Context>()
  .query('hello', {
    resolve() {
      return 'world';
    },
  })
  .merge('auth/', AuthController)
  .merge('user/', UserController);

export type AppRouter = typeof appRouter;
const app = express();
app.use(
  cors({
    origin: ['https://follow.szuhy.xyz/', 'http://localhost:3000'],
  })
);
const port = process.env.PORT || 8000;
app.use(
  '/api',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
