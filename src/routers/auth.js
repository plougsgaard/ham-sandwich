import KoaRouter from 'koa-router'

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
    console.error(err)
    ctx.status = 403
  }
})

router.post('/auth/logout', async (ctx) => {
  const { token } = ctx.req.headers
  await logout(token)
  ctx.status = 204
})

export default router
