import Koa from 'koa'
import KoaRouter from 'koa-router'
import Boom from 'boom'

import bodyParser from 'koa-bodyparser'
import corsMiddleware from 'kcors'
import errorsMiddleware from './middleware/errors'
import loggerMiddleware from './middleware/logger'
import cleanBodyMiddleware from './middleware/cleanBody'

import { publicRouter, protectedRouter } from './routers'

module.exports = (port) => {
  const server = new Koa()

  // gain access to request bodies
  server.use(bodyParser())

  // CORS
  server.use(corsMiddleware())

  // middleware for handling (uncaught) errors
  server.use(errorsMiddleware)

  // middleware for logging and timing
  server.use(loggerMiddleware)

  // no need to look at dirty bodies here
  server.use(cleanBodyMiddleware)

  // public routes
  server.use(publicRouter.allowedMethods())
  server.use(publicRouter.routes())

  // protected routes
  server.use(protectedRouter.allowedMethods())
  server.use(protectedRouter.routes())

  // the 404 catch-all
  server.use(async (ctx) => {
    ctx.status = 404
    ctx.body = Boom.notFound('┬─┬ノ( º _ ºノ)')
  })
  server.listen(port, () => {
    console.log(`Listening at ${port}..`)
  })
}
