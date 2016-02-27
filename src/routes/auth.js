import { UnauthorizedError } from 'restify-errors'

export const setAuthCheck = (server) => {
  server.use((req, res, next) => {
    return next(new UnauthorizedError('Must be authorized.'))
  })
}
