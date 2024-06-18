import { compare } from "bcrypt";
import { User } from "../models/user.model.js";
import {sendToken, TryCatch} from '../utils/features.js'
import { ErrorHandler } from "../utils/utility.js";

//create a new user and save it to the DB and save it to cookie
const newUser = async (req, res) => {
  const {name,username,password,bio} = req.body
  
  const avatar = {
    public_id: "er",
    url: "wer",
  };

  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });
  sendToken(res,user,201,"User created")
};

//loginn
const login = TryCatch(async(req,res,next) => {
    const {username, password} = req.body
  
    const user = await User.findOne({username}).select('+password')
  
    if(!user) return next(new ErrorHandler('Invalid credentials',404))
  
    const isMatch = await compare(password,user.password)
  
    if(!isMatch) return next(new ErrorHandler('Invalid credentials',404))
    
    sendToken(res, user, 200, `Welcome back ${user.name}`)
})
//profile
const getMyProfile = TryCatch(async(req,res) => {
  const user = await User.findById(req.user)
  res.status(200).json({
    success: true,
    user,
  })
})

//logout
const logout = TryCatch(async(req,res) => {
  return res.status(200).cookie('pager-token','',{...cookieOption, maxAge:0}).json({
    success: true,
    message: 'Logged out successfully',
  })
  
})
export { login, newUser, getMyProfile, logout };
