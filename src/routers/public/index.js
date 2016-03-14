import KoaRouter from 'koa-router'
import Boom from 'boom'

import hatsRouter from './hats'

import {
  login,
  logout,
  resetRequest,
  resetConfirm
} from '../../controllers/auth'

const router = new KoaRouter()

router.use('/hats', hatsRouter.routes(), hatsRouter.allowedMethods())

// START DUMMY ROUTES
// ------------------
// ------------------
// ------------------
router.get('/user/profile', async (ctx) => {
  ctx.body = {
    name: 'Handsome Bob',
    age: 29
  }
})
// router.get('', async (ctx) => {})
// router.get('', async (ctx) => {})
// router.get('', async (ctx) => {})









//  END DUMMY ROUTES
// ------------------
// ------------------
// ------------------


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

router.post('/auth/reset/confirm', async (ctx) => {
  const { digest, token } = ctx.request.body
  if (!digest || !token) {
    ctx.body = Boom.badRequest('Missing digest and/or token in body.')
    ctx.status = 400
    return
  }
  try {
    await resetConfirm({ digest, token })
    ctx.status = 201
  }
  catch (err) {
    console.error(err)
    ctx.body = Boom.badRequest('The reset token has been deemed unsatisfactory.')
    ctx.status = 400
  }
})

router.post('/auth/reset', async (ctx) => {
  const { email } = ctx.request.body
  if (!email) {
    ctx.body = Boom.badRequest('Missing email in body.')
    ctx.status = 400
    return
  }
  try {
    await resetRequest(email)
  }
  catch (err) {
    // ignore? yep
  }
  finally {
    // same response always to hide internals
    ctx.status = 201
  }
})

export default router
