import Koa from 'koa'
import KoaRouter from 'koa-router'

import bodyParser from 'koa-bodyparser'
import corsMiddleware from 'kcors'
import errorsMiddleware from './middleware/errors'
import loggerMiddleware from './middleware/logger'
import cleanBodyMiddleware from './middleware/cleanBody'

import { publicRouter, protectedRouter } from './routers'

const run = (port) => {
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

  server.listen(port, () => {
    console.log(`Listening at ${port}..`)
  })
}

// BEGIN LEGACY
module.exports = run
// END LEGACY
