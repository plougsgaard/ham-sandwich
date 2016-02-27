export const setProtectedRoutes = (server) => {
  server.get('/foo', (req, res, next) => {
    res.send(200, {
      message: 'FOOOO'
    })
    return next()
  })
}
