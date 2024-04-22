import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { compareSync, hashSync } from 'bcrypt-ts';
import { decode, sign, verify } from 'hono/jwt';
import { signupSchema, signinInput } from 'abbas110-zod-validations';
//we can't initialize the prisma client in global but inside each routes, coz can't access the .env from outside without c of hono

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoute.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signupSchema.safeParse(body);

  if (!success) {
    c.status(403);
    return c.json({
      msg: 'inputs are not correct',
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const hashedPassword = hashSync(body.password, 8);

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: hashedPassword,
        name: body.name,
      },
    });
    //when we create jwt we need to things one is unique id and a secrete to create a token
    const jwtToke = await sign(
      {
        id: user.id,
      },
      c.env?.JWT_SECRET
    );
    return c.text(`Jwt Secret ${jwtToke}`);
  } catch (e) {
    console.log(e);
    return c.status(403);
  }
});

userRoute.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  //zod authentication fails
  if (!success) {
    c.status(403);
    return c.json({
      msg: 'inputs are not correct',
    });
  }

  try {
    //this user will return a object with hashed password now we will decode the hashed and see if password is same as db
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
      },
    });
    if (!user) {
      c.status(403);
      return c.text('invalid username or password');
    }

    const isMatch = compareSync(body.password, user.password);
    if (!isMatch) {
      c.status(403);
      return c.text('invalid username or password');
    }

    const jwtToke = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.text(`Jwt Secret ${jwtToke}`);
  } catch (error) {
    console.log(error);
    return c.text('something went wrong');
  }
});
