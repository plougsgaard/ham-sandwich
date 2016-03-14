import KoaRouter from 'koa-router'
import Boom from 'boom'
import _ from 'lodash'

import {
  getUserById,
  getUsers
} from '../../controllers/users'

const router = new KoaRouter()

router.get('/users/:userId', async (ctx) => {
  const { userId } = ctx.params
  ctx.body = await getUserById(userId)
  console.log(ctx.session)
})

router.get('/users', async (ctx) => {
  ctx.body = await getUsers()
})

export default router
