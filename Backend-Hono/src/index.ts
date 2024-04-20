import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
//we can't initialize the prisma client in global but inside each routes, coz can't access the .env from outside without c of hono

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.post('/api/v1/signup', async (c) => {
  console.log(c);
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });
    console.log(user);
    return c.text('jwt here');
  } catch (e) {
    console.log(e);
    return c.status(403);
  }
});

app.post('/api/v1/user/signin', (c) => {
  return c.text('User login');
});

app.post('/api/v1/blog', (c) => {
  return c.json({
    mesg: 'new blog',
  });
});

app.put('/api/v1/blog', (c) => {
  return c.text('updated put req');
});

app.get('/api/v1/blog', (c) => {
  return c.text('updated put req');
});

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('updated put req');
});

export default app;
