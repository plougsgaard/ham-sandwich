import KoaRouter from 'koa-router'
import Boom from 'boom'
import _ from 'lodash'

import { sleep } from '../../controllers/util'

import {
  getUserById,
  getUserByToken,
  getUsers,
  updateProfile
} from '../../controllers/users'

const router = new KoaRouter()

router.get('/profile', async (ctx) => {
  const { user_id } = ctx.session
  ctx.body = await getUserById(user_id)
})

router.put('/profile', async (ctx) => {
  const { user_id } = ctx.session
  const entry = ctx.request.body
  if (_.isEmpty(entry)) {
    ctx.status = 400
    return
  }
  await sleep(1000) // TODO remove fake sleep
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
