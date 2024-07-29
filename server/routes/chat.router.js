import express from 'express'

import { isAuthenticated } from '../middlewares/auth.js'
import { addMembers, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember } from '../controllers/chat.controller.js'


const router = express.Router()
 
//user loggedin routes
router.use(isAuthenticated)
router.post('/new',newGroupChat)
router.get('/my',getMyChats)
router.get('/my/groups',getMyGroups)
router.put('/addmembers',addMembers)
router.put('/removemember',removeMember)
router.delete('/leave/:id',leaveGroup)

//send attachment 
//get msgs
//get chat detail,rename,delete

export default router