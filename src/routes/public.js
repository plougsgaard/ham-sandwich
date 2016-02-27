export const setPublicRoutes = (server) => {
  server.get('/bar', (req, res, next) => {
    res.send(200, {
      message: 'Bar'
    })
    return next()
  })
}
