import KoaRouter from 'koa-router'

import sessionMiddleware from '../middleware/session'
import authMiddleware from '../middleware/auth'

import {
  getUserById,
  getUsers
} from '../controllers/users'

const router = new KoaRouter()

router.use(sessionMiddleware, authMiddleware)

router.get('/users/:userId', async (ctx) => {
  const { userId } = ctx.params
  ctx.body = await getUserById(userId)
  console.log(ctx.session)
})

router.get('/users', async (ctx) => {
  ctx.body = await getUsers()
})

router.post('/users', async (ctx) => {
  throw new Error('This might result in a 500..')
})

export default router
