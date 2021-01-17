import { Router } from 'express'
import { videosRouter } from './videos'

const router = new Router()

router.use('/videos', videosRouter)

export default router
