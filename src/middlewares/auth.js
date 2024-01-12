// const User = require("../model/User");
import Jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const auth =
  (...args) =>
  async (req, res, next) => {
    console.log(args);
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
      throw new UnauthenticatedError("Authentication Requied");
    }
    const token = authHeaders.split(" ")[1];
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET);
      const { id, email, role } = decoded;
      console.log("ROLE", role);
      console.log(args.includes(role));
      if (args.includes(role)) {
        req.user = { id, email, role };
        next();
      } else {
        return res.status(403).json({
          status: StatusCodes.FORBIDDEN,
          message: "Access forbidden",
        });
      }
    } catch (error) {
      throw new UnauthenticatedError("Authentication invalid");
    }
  };

export default auth;
