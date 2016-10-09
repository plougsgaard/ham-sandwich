import Koa from 'koa'

import bodyParser from 'koa-bodyparser'
import corsMiddleware from 'kcors'
import errorsMiddleware from './middleware/errors'
import loggerMiddleware from './middleware/logger'
import cleanBodyMiddleware from './middleware/cleanBody'

import { publicRouter, protectedRouter } from './routers'

import { notFound } from './responses'

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
  server.use(async (ctx) => notFound(ctx))

  // too clever startup message - bet this is going to bite one day
  server.listen(port, () => {
    console.log(` ${port}`)
    console.log(`┬────┬ (ツ)`)
  })
}
