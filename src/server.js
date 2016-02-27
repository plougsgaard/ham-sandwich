import restify from 'restify'
import _ from 'lodash'

import { setAuthCheck } from './routes/auth'
import { setProtectedRoutes } from './routes/protected'
import { setPublicRoutes } from './routes/public'

const defaultConfig = {
  name: 'ham-sandwich',
  version: '0.0.1'
}

export const createServer = (config) => {
  const {
    name,
    version,
    log
  } = _.extend(defaultConfig, config)

  let server = restify.createServer({
    log,
    name,
    version
  })

  // Ensure we don't drop data on uploads
  server.pre(restify.pre.pause())

  // Clean up sloppy paths like //todo//////1//
  server.pre(restify.pre.sanitizePath())

  // Handles annoying user agents (curl)
  server.pre(restify.pre.userAgentConnection())

  // Set a per request bunyan logger (with requestid filled in)
  server.use(restify.requestLogger())

  // Allow 5 requests/second by IP, and burst to 10
  server.use(restify.throttle({
      burst: 10,
      rate: 5,
      ip: true
  }))

  // Use the common stuff you probably want
  server.use(restify.acceptParser(server.acceptable))
  server.use(restify.dateParser())
  server.use(restify.authorizationParser())
  server.use(restify.queryParser())
  server.use(restify.gzipResponse())
  server.use(restify.bodyParser())

  // Public routes
  setPublicRoutes(server)

  // Auth check - order matters!
  setAuthCheck(server)

  // Protected routes
  setProtectedRoutes(server)

  return server
}
