import express from 'express'

const router = express.Router()

router.get('/')
router.post('/verify')
router.get('/logout')
router.get('/users')
router.get('/chats')
router.get('/messages')

export default router