import KoaRouter from 'koa-router'

import {
  getMessages
} from '../controllers/messages'

const router = new KoaRouter()

router.get('/messages', getMessages)

export default router
