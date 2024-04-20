import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET : string
	}
	Variables : {
		userId: string
	}
}>();

app.use('/api/v1/blog/*', async (c, next) => {

	const header = c.req.header('authorization') || '';
	if (!header) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

	const token = header.split(" ")[1]
	const response = await (verify(token, c.env.JWT_SECRET))
	if (response.id) {
		
		next()
	} else{
		c.status(403)
		return c.json({error: 'unauthorized'})
	}
	c.set('userId', response.id);
	await next()
  })

app.post('/api/v1/signup',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const body = await c.req.json()

	const user = await prisma.user.create({
		data: {
			email: body.email,
			password: body.password
		}
	})
	const token = sign({id: user.id}, c.env.JWT_SECRET)

	return c.json({
		jwt: token
	})
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})

app.get('/api/v1/blog', (c) => {
	// const id = c.req.param('')
	// console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;

