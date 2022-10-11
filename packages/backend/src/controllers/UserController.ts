import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import * as Yup from 'yup';
import { Context } from '../Context';
import db from '../db';
const UserController = trpc
  .router<Context>()
  .query('all', {
    resolve: async ({ ctx }) => {
      const users = await db.user.findMany({
        where: {
          id: {
            not: ctx.user?.id,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: { followers: true, followings: true },
      });
      // 根据followings在所有列表中过滤出未关注和关注的
      return users;
    },
  })
  .query('list', {
    resolve: async ({ ctx }) => {
      const list = await db.user.findFirst({
        where: {
          id: {
            equals: ctx.user?.id,
          },
        },
        include: {
          followers: {
            include: {
              follower: true,
            },
          },
          followings: {
            include: {
              following: true,
            },
          },
        },
      });
      return {
        followerslist: list?.followers,
        followinglist: list?.followings,
      };
    },
  })
  .query('follow', {
    resolve: async ({ ctx }) => {
      const user = await db.user.findFirst({
        where: {
          id: ctx.user?.id,
        },
        select: {
          followers: true,
          followings: true,
        },
      });
      return user;
    },
  })
  .query('checkFollow', {
    input: Yup.object({
      id: Yup.string().required(),
    }),
    output: Yup.object({
      isFollow: Yup.boolean(),
    }),
    resolve: async ({ ctx, input }) => {
      const check = await db.follow.findFirst({
        where: {
          followerId: ctx.user?.id,
          followingId: input.id,
        },
      });
      return {
        isFollow: check ? true : false,
      };
    },
  })
  .mutation('subscribe', {
    input: Yup.object({
      id: Yup.string().required(),
    }),
    resolve: async ({ ctx, input }) => {
      if (ctx.user?.id !== input.id) {
        await db.follow.create({
          data: {
            followingId: input.id,
            followerId: ctx.user!.id,
          },
        });
        return {
          success: true,
        };
      } else {
        throw new TRPCError({
          message: 'You can not subscribe your self',
          code: 'BAD_REQUEST',
        });
      }
    },
  })
  .mutation('unsubscribe', {
    input: Yup.object({
      id: Yup.string().required(),
    }),
    resolve: async ({ ctx, input }) => {
      if (ctx.user?.id !== input.id) {
        await db.follow.delete({
          where: {
            followingId_followerId: {
              followingId: input.id,
              followerId: ctx.user!.id,
            },
          },
        });
        return {
          success: true,
        };
      } else {
        throw new TRPCError({
          message: 'You can not unsubscribe your self',
          code: 'BAD_REQUEST',
        });
      }
    },
  });
export default UserController;
