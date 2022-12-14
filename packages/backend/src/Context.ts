import { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import crypto from 'crypto';
import { getUserFromHeader } from './auth';

const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const user = await getUserFromHeader(req.headers);
  const requestId = crypto.randomBytes(10).toString('hex');

  return {
    headers: req.headers,
    user: user,
    req: { ...req, id: requestId },
    res,
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;

export const protectedRoute = trpc
  .router<Context>()
  .middleware(async ({ ctx, next }) => {
    const user = await getUserFromHeader(ctx.headers);
    if (!user) {
      throw new Error(`Unauthenticated when trying to access ${ctx.req.url}`);
    }
    ctx.user = user;
    return next();
  });
export default createContext;
