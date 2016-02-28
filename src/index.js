import _ from 'lodash'
import Koa from 'koa'
import KoaRouter from 'koa-router'

import auth from './auth'
import errors from './errors'
import logger from './logger'
import {
  authRouter,
  usersRouter
} from './routers'

const PORT = process.env.PORT || 8200

const server = new Koa()

// authentication
server.use(auth)

// middleware for handling (uncaught) errors
server.use(errors)

// middleware for logging and timing
server.use(logger)

// public routes
server.use(authRouter.routes())

// protected routes
server.use(usersRouter.routes())

server.listen(PORT, () => {
  console.log(`Listening at ${PORT}..`)
})
