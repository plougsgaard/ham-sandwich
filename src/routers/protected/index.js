import KoaRouter from 'koa-router'

import sessionMiddleware from '../../middleware/session'
import authMiddleware from '../../middleware/auth'

import usersRouter from './users'
import hatsRouter from './hats'
import foodsRouter from './foods'
import brandsRouter from './brands'

const router = new KoaRouter()

router.use(sessionMiddleware, authMiddleware)

router.use('/hats', hatsRouter.routes(), hatsRouter.allowedMethods())
router.use('/foods', foodsRouter.routes(), foodsRouter.allowedMethods())
router.use('/brands', brandsRouter.routes(), brandsRouter.allowedMethods())
router.use('/users', usersRouter.routes(), usersRouter.allowedMethods())

export default router
