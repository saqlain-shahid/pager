import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import userRoute from "./routes/user.router.js";
import chatRoute from "./routes/chat.router.js";
import adminRoute from "./routes/admin.router.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.model.js";

dotenv.config({
  path: "./.env",
});

//DB
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "sasakelojihitamori";
const userSocketIDs = new Map()

connectDB(mongoURI);

// createUser(10) //fakerrr
// createSingleChats(10) //fakerr
// createGroupChats(10) //fakerr

const app = express();
const server = createServer(app);
const io = new Server(server, {});

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});
io.use((socket, next)=> {})

io.on("connection", (socket) => {
  const user = {
    _id: "saq",
    name: "SaqL",
  };
  userSocketIDs.set(user._id.toString(), socket.id)

  console.log(userSocketIDs);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };
    const membersSocket = getSockets(members)
    io.to(membersSocket).emit(NEW_MESSAGE,{
        chatId,
        message: messageForRealTime
    })
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, {chatId})
    console.log("new Message", messageForRealTime);

    try {
        await Message.create(messageForDB)
    } catch(err){
        console.log(err)
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    userSocketIDs.delete(user._id.toString())
  });
});

//errr middlware
app.use(errorMiddleware);

//listen
server.listen(port, () => {
  console.log(`server is up at ${port} in ${envMode} Mode`);
});

export { envMode, adminSecretKey, userSocketIDs };
