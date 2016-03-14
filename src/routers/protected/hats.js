import KoaRouter from 'koa-router'
import Boom from 'boom'
import _ from 'lodash'

import { sleep } from '../../controllers/util'

const router = new KoaRouter()

let dummyHats = [
  {
    id: 'laij4lfij34fl34ighafi4',
    name: 'Tophat'
  },
  {
    id: 'jriar8soghcr8rhsof9d0a',
    name: 'Sixpence'
  },
  {
    id: 'poeeflkjsd34ighafi4',
    name: 'Cap'
  }
]

router.get('/', async (ctx) => {
  ctx.body = dummyHats
})

router.get('/:id', async (ctx) => {
  const res = _.find(dummyHats, { id: ctx.params.id })
  if (res) {
    ctx.body = res
  } else {
    ctx.status = 404
  }
})

router.post('/', async (ctx) => {
  const entry = ctx.request.body
  if (_.isEmpty(entry)) {
    ctx.status = 400
    return
  }
  await sleep(1000) // TODO remove fake sleep
  dummyHats = _.concat(dummyHats, entry)
  ctx.body = entry
})

router.put('/:id', async (ctx) => {
  const entry = _.find(dummyHats, { id: ctx.params.id })
  if (!entry) {
    ctx.status = 404
    return
  }
  const replacement = ctx.request.body
  if (_.isEmpty(replacement)) {
    ctx.status = 400
    return
  }
  await sleep(1000) // TODO remove fake sleep
  dummyHats = _.chain(dummyHats).without(entry).concat(replacement).value()
  ctx.body = replacement
})

export default router
