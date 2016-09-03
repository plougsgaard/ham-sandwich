import KoaRouter from 'koa-router'
import _ from 'lodash'

import { created, badRequest } from '../../responses'

import {
  getUserById,
  getUserByToken,
  getUsers,
  updateProfile
} from '../../controllers/users'

import {
  renewSession
} from '../../controllers/auth'

const router = new KoaRouter()

router.post('/renew', async (ctx) => {
  const { id } = ctx.session
  ctx.body = await renewSession(id)
})

router.get('/profile', async (ctx) => {
  const { user_id } = ctx.session
  ctx.body = await getUserById(user_id)
})

router.put('/profile', async (ctx) => {
  const { user_id } = ctx.session
  const entry = ctx.request.body
  if (_.isEmpty(entry)) {
    return badRequest(ctx)
  }
  ctx.body = await updateProfile(user_id, entry)
})

router.get('/:userId', async (ctx) => {
  const { userId } = ctx.params
  ctx.body = await getUserById(userId)
})

router.get('/', async (ctx) => {
  ctx.body = await getUsers()
})

export default router
