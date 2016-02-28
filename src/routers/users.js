import KoaRouter from 'koa-router'

import {
  getUserById,
  getUsers
} from '../controllers/users'

const router = new KoaRouter()

router.get('/users/:userId', async (ctx) => {
  const { userId } = ctx.params
  ctx.body = await getUserById(userId)
})

router.get('/users', async (ctx) => {
  ctx.body = await getUsers()
})

router.post('/users', async (ctx) => {
  throw new Error('This might result in a 500..')
})

export default router
