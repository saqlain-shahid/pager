import express from 'express'

import { isAuthenticated } from '../middlewares/auth.js'
import { newGroupChat } from '../controllers/chat.controller.js'


const router = express.Router()
 
//user loggedin routes
router.use(isAuthenticated)
router.post('/new',newGroupChat)

export default router