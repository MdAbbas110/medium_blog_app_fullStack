import { Hono } from 'hono';

export const blogRoute = new Hono<{
  Bindings: {
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    };
  };
}>();

blogRoute.post('/', (c) => {
  return c.json({
    mesg: 'new blog',
  });
});

blogRoute.put('/', (c) => {
  return c.text('updated put req');
});

blogRoute.get('/', (c) => {
  return c.text('here is the eq');
});

blogRoute.get('/bulk', (c) => {
  return c.text('all teh blog put req');
});
