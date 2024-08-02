import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const cookieOption = {
  maxAge: '604800000', //7days
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
    user,
    message,
  })
}

const TryCatch = (passedFunc) => async(req,res,next) => {
  try {
    await passedFunc(req,res,next)
  } catch (error) {
    next(error)
  }
}

const emitEvent = (req,event,users,data) => {
  console.log('emitting envt', event)
}
const deleteFilesFromCloudinary = async(public_ids) => {

}

export {connectDB, sendToken, TryCatch, emitEvent, cookieOption, deleteFilesFromCloudinary}
