import express from 'express'

import { isAuthenticated } from '../middlewares/auth.js'
import { addMembers, deleteChat, getChatDetails, getMyChats, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from '../controllers/chat.controller.js'
import { attachmentsMulter } from '../middlewares/multer.js'


const router = express.Router()
 
//user loggedin routes
router.use(isAuthenticated)
router.post('/new',newGroupChat)
router.get('/my',getMyChats)
router.get('/my/groups',getMyGroups)
router.put('/addmembers',addMembers)
router.put('/removemember',removeMember)
router.delete('/leave/:id',leaveGroup)
router.post('/message', attachmentsMulter, sendAttachments)

router.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat)
//get chat detail,rename,delete

export default router