import { adminSecretKey } from "../app.js";
import { TryCatch } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";

const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies["pager-token"];

  if (!token) return next(new ErrorHandler("Please login first", 401));
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decodedData._id;
  next();
});
const adminOnly = TryCatch((req, res, next) => {
  const token = req.cookies["pager-admin-token"];

  if (!token) return next(new ErrorHandler("Only Admin can access", 401));
  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;
  if (!isMatched) return next(new ErrorHandler("Only Admin can access", 401));
  next();
});

export { isAuthenticated, adminOnly };
