import express from 'express'

import { isAuthenticated } from '../middlewares/auth.js'
import { addMembers, getMyChats, getMyGroups, newGroupChat } from '../controllers/chat.controller.js'


const router = express.Router()
 
//user loggedin routes
router.use(isAuthenticated)
router.post('/new',newGroupChat)
router.get('/my',getMyChats)
router.get('/my/groups',getMyGroups)
router.put('/addmembers',addMembers)

export default router