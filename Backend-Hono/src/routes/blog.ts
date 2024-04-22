import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createBlogInput, updateBlogInput } from 'abbas110-zod-validations';
import { Hono } from 'hono';
import { verify } from 'hono/jwt';

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userID: string;
  };
}>();

//middleware for all the req coming on blogs needs the token and person to be logged in
blogRoute.use('/*', async (c, next) => {
  const authToken = c.req.header('authorization') || '';

  try {
    const user = await verify(authToken, c.env.JWT_SECRET);
    if (user) {
      //set the user id in the context of hono c and pass it to next middle were
      c.set('userID', user.id);
      await next();
    } else {
      return c.json({
        msg: 'You are not logged in ',
      });
    }
  } catch (error) {
    return c.text('something went wrong ');
  }
});

blogRoute.post('/', async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(403);
    return c.json({
      msg: 'title descriptions correct',
    });
  }

  const userID = c.get('userID');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.create({
      data: {
        tiitle: body.tiitle,
        content: body.content,
        authorId: Number(userID),
      },
    });

    return c.json({
      msg: 'created blog',
      blogID: blog.id,
    });
  } catch (error) {
    console.log(error);
    return c.text('something went wrong while post');
  }
});

blogRoute.put('/', async (c) => {
  const body = await c.req.json();

  //zod check for the correct type of blog
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({
      msg: 'title descriptions correct',
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        tiitle: body.title,
        content: body.content,
      },
    });

    return c.json({
      msg: 'updated the blog',
    });
  } catch (error) {
    return c.text('something went wrong in put');
  }
});

//? this is where we can implement pagination we don't return all the blog to the user we generally give 10 or 15 blogs in first call

blogRoute.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        tiitle: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      msg: 'all the blogs',
      blog: blogs,
    });
  } catch (error) {
    return c.text('something went wrong in get bulk');
  }
});

blogRoute.get('/:id', async (c) => {
  const id = c.req.param('id');

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        tiitle: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      msg: 'blog found',
      blog,
    });
  } catch (error) {
    console.log(error);
    return c.text('something went wrong in get one');
  }
});
