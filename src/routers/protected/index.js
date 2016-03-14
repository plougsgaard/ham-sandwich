import KoaRouter from 'koa-router'

import sessionMiddleware from '../../middleware/session'
import authMiddleware from '../../middleware/auth'

import usersRouter from './users'
import hatsRouter from './hats'

const router = new KoaRouter()

router.use(sessionMiddleware, authMiddleware)

router.use('/hats', hatsRouter.routes(), hatsRouter.allowedMethods())
router.use('/users', usersRouter.routes(), usersRouter.allowedMethods())

export default router
