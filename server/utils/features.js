import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const cookieOption = {
  maxAge: '10*24*60*60*1000', //10days
  sameSite: 'none',
  httpOnly: true,
  secure: true,
}

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Pager" })
    .then((data) => console.log(`Connected to DB`))
    .catch((err) => {
      
      throw err;
    });
};

const sendToken = (res,user,code,message) => {
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

  return res.status(code).cookie('pager-token',token,cookieOption).json({
    success: true,
    token,
    message,
    user
  })
}

const TryCatch = (passedFunc) => async(req,res,next) => {
  try {
    await passedFunc(req,res,next)
  } catch (error) {
    next(error)
  }
}

export {connectDB, sendToken, TryCatch}
