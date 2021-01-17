import { Router } from 'express'
import { videosController } from './controller'
import { middleware as query } from 'querymen'

const videosRouter = new Router({ mergeParams: true })

videosRouter.get('/',
  query({
    search: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
  }),
  videosController.processGetVideosBySearch
)

export { videosRouter }
