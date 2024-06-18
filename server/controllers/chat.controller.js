import { TryCatch } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import {Chat}  from '../models/chat.model.js'

const newGroupChat = TryCatch(async(req,res,next) => {
    const {name, members} = req.body

    if(members.length<2) return next(new ErrorHandler('Group chat must have at least 3 members', 400))
    
    const allMembers = [...members, req.user]
    await Chat .create({
        name,
        groupChat: true,
        creator: req.user,
        members: allMembers
    })   
})

export {newGroupChat}