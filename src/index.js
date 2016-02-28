import _ from 'lodash'
import Koa from 'koa'
import KoaRouter from 'koa-router'

import routers from './routers'
import logger from './logger'

const PORT = process.env.PORT || 8200

const server = new Koa()

server.use(logger)
_.each(routers, (r) => {
  server.use(r.routes())
})

server.listen(PORT, () => {
  console.log(`Listening at ${PORT}..`)
})
