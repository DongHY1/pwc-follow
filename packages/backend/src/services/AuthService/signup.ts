import * as trpc from '@trpc/server';
import * as Yup from 'yup';
import db from '../../db';
import bcrypt from 'bcrypt';
import { TRPCError } from '@trpc/server';

export const SignupSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email().required().max(100),
  password: Yup.string().required().min(8).max(100),
});

const signup = async ({
  name,
  email,
  password,
}: Yup.Asserts<typeof SignupSchema>) => {
  const hashedpassword = await bcrypt.hash(password, 10);

  const existingEmail = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingEmail) {
    throw new TRPCError({
      message: 'The email is already in use',
      code: 'BAD_REQUEST',
    });
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      hashedpassword,
    },
  });

  return user;
};

export default signup;
