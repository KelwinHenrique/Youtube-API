import { Router } from 'express'

const router = new Router()

router.use('/videos', () => console.log('Hello'))

export default router
