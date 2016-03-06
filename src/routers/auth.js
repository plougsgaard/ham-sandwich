import KoaRouter from 'koa-router'
import Boom from 'boom'

import {
  login,
  logout
} from '../controllers/auth'

const router = new KoaRouter()

router.post('/auth/login', async (ctx) => {
  try {
    ctx.body = await login(ctx.request.body)
    ctx.status = 200
  }
  catch (err) {
    ctx.body = Boom.unauthorized('(╯°□°）╯︵ ┻━┻')
    ctx.status = 401
  }
})

router.post('/auth/logout', async (ctx) => {
  const { token } = ctx.req.headers
  await logout(token)
  ctx.status = 204
})

export default router
