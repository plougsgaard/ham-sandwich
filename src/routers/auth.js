import KoaRouter from 'koa-router'

import {
  login,
  logout
} from '../controllers/auth'

const router = new KoaRouter()

router.post('/auth/login', async (ctx) => {
  const token = await login(1)
  if (token) {
    ctx.status = 200
    ctx.body = token
  } else {
    ctx.status = 403
  }
})

router.post('/auth/logout', async (ctx) => {
  const { token } = ctx.req.headers
  await logout(token)
  ctx.status = 204
})

export default router
