import * as trpc from '@trpc/server';
import bcrypt from 'bcrypt';
import { Context } from '../Context';
import db from '../db';
const UserController = trpc.router<Context>().query('all', {
  resolve: async ({ ctx }) => {
    const users = await db.user.findMany();
    return users;
  },
});

export default UserController;
