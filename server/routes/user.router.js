import express from "express";
import {
    acceptFriendRequest,
  getMyFriends,
  getMyNotifications,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.controller.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  acceptRequestvalidator,
  loginValidator,
  registerValidator,
  sendRequestvalidator,
  validateHandler,
} from "../lib/validators.js";

const router = express.Router();

router.post(
  "/new",
  singleAvatar,
  registerValidator(),
  validateHandler,
  newUser
);
router.post("/login", loginValidator(), validateHandler, login);

//user loggedin routes
router.use(isAuthenticated);
router.get("/profile", getMyProfile);
router.get("/logout", logout);
router.get("/search", searchUser);
router.put(
  "/sendrequest",
  sendRequestvalidator(),
  validateHandler,
  sendFriendRequest
);
router.put(
  "/acceptrequest",
  acceptRequestvalidator(),
  validateHandler,
  acceptFriendRequest
);
router.get(
  "/notification",
  getMyNotifications
);
router.get(
    "/friends",
    getMyFriends
  );

export default router;
