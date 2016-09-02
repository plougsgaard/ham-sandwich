import KoaRouter from 'koa-router'

import { created, noContent, badRequest, unauthorized } from '../../responses'

import {
  login,
  logout,
  resetRequest,
  resetConfirm
} from '../../controllers/auth'

const router = new KoaRouter()

router.post('/auth/login', async (ctx) => {
  try {
    ctx.body = await login(ctx.request.body)
    ctx.status = 200
  }
  catch (err) {
    return unauthorized(ctx)
  }
})

router.post('/auth/logout', async (ctx) => {
  const { token } = ctx.req.headers
  await logout(token)
  return noContent(ctx)
})

router.post('/auth/reset/confirm', async (ctx) => {
  const { digest, token } = ctx.request.body
  if (!digest || !token) {
    return badRequest(ctx, 'Missing digest or token in body.')
  }
  try {
    await resetConfirm({ digest, token })
    return created(ctx)
  }
  catch (err) {
    return badRequest(ctx, 'The reset token has been deemed unsatisfactory.')
  }
})

router.post('/auth/reset', async (ctx) => {
  const { email } = ctx.request.body
  if (!email) {
    return badRequest(ctx, 'Missing email in body.')
  }
  try {
    await resetRequest(email)
  }
  catch (err) {
    // ignore? yep
  }
  finally {
    // same response always to hide internals
    return created(ctx)
  }
})

export default router
