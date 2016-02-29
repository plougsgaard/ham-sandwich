import _ from 'lodash'
import Koa from 'koa'
import KoaRouter from 'koa-router'

import errorsMiddleware from './middleware/errors'
import loggerMiddleware from './middleware/logger'

import {
  authRouter,
  usersRouter
} from './routers'

const PORT = process.env.PORT || 8200

const server = new Koa()

// middleware for handling (uncaught) errors
server.use(errorsMiddleware)

// middleware for logging and timing
server.use(loggerMiddleware)

// public routes
server.use(authRouter.routes())

// protected routes
server.use(usersRouter.routes())

server.listen(PORT, () => {
  console.log(`Listening at ${PORT}..`)
})
