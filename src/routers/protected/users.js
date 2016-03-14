import KoaRouter from 'koa-router'
import Boom from 'boom'
import _ from 'lodash'

import {
  getUserById,
  getUserByToken,
  getUsers
} from '../../controllers/users'

const router = new KoaRouter()

router.get('/profile', async (ctx) => {
  const { user_id } = ctx.session
  ctx.body = await getUserById(user_id)
})

router.get('/:userId', async (ctx) => {
  const { userId } = ctx.params
  ctx.body = await getUserById(userId)
})

router.get('/', async (ctx) => {
  ctx.body = await getUsers()
})

export default router
