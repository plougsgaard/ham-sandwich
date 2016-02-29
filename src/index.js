import Koa from 'koa'
import KoaRouter from 'koa-router'

import corsMiddleware from 'kcors'
import errorsMiddleware from './middleware/errors'
import loggerMiddleware from './middleware/logger'

import { authRouter, protectedRouter } from './routers'

import { PORT } from './config'

const server = new Koa()

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

server.listen(PORT, () => {
  console.log(`Listening at ${PORT}..`)
})
