import Koa from 'koa'
import KoaRouter from 'koa-router'

import bodyParser from 'koa-bodyparser'
import corsMiddleware from 'kcors'
import errorsMiddleware from './middleware/errors'
import loggerMiddleware from './middleware/logger'

import { authRouter, protectedRouter } from './routers'

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

  // public routes
  server.use(authRouter.routes())

  // protected routes
  server.use(protectedRouter.routes())

  server.listen(port, () => {
    console.log(`Listening at ${port}..`)
  })
}

// BEGIN LEGACY
module.exports = run
// END LEGACY
