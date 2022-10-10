import { inferAsyncReturnType } from '@trpc/server';
import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import crypto from 'crypto';
import { getUserFromHeader } from './auth';
import { User } from '.prisma/client';

const ADMIN_ROLES = ['ADMIN', 'SUPERADMIN'];

export const isAdmin = (userRole: User['role'] | undefined) => {
  return userRole && ADMIN_ROLES.includes(userRole);
};

const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const user = await getUserFromHeader(req.headers);
  const requestId = crypto.randomBytes(10).toString('hex');

  return {
    headers: req.headers,
    user: user,
    isAdmin: isAdmin(user?.role),
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
      console.log(`Unauthenticated while accesing ${ctx.req.url}`, ctx.headers);
      throw new Error(`Unauthenticated when trying to access ${ctx.req.url}`);
    }
    ctx.user = user;
    ctx.isAdmin = isAdmin(user.role);
    return next();
  });

export const adminRoute = trpc
  .router<Context>()
  .middleware(async ({ ctx, next }) => {
    const user = await getUserFromHeader(ctx.headers);

    if (!user) {
      console.log(`Unauthenticated while accesing ${ctx.req.url}`, ctx.headers);
      throw new Error(`Unauthenticated when trying to access ${ctx.req.url}`);
    }

    if (!isAdmin(user.role)) {
      throw new Error('Unauthorized');
    }

    ctx.user = user;
    ctx.isAdmin = true;
    return next();
  });

export default createContext;
