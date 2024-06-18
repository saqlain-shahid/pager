import { TryCatch } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from 'jsonwebtoken'

 const isAuthenticated = (req,res,next) => {
    const token = req.cookies['pager-token']
    console.log("cookies ",req.cookies)
    if(!token) return next(new ErrorHandler('Please login first', 401))
    const decodedData = jwt.verify(token,process.env.JWT_SECRET) 
    console.log(decodedData)

    next()
 }

export {isAuthenticated}