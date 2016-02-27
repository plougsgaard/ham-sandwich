import fs from 'fs'
import path from 'path'
import bunyan from 'bunyan'
import restify from 'restify'

import { log } from './logger'
import { createServer } from './server'

const server = createServer({
  log
})

server.listen(8200, () => {
  log.info(`Listening at ${server.url}..`)
})
