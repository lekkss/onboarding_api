import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./src/models/index.js";
const app = express();

// Error handlers
import notFound from "./src/middlewares/not-found.js";
import errorHandler from "./src/middlewares/error-handler.js";
import auth from "./src/middlewares/auth.js";

//ROUTERS
import authRouter from "./src/routes/auth.js";
import kycRouter from "./src/routes/kyc.js";
import documentRouter from "./src/routes/document.js";
import profileRouter from "./src/routes/profile.js";

//parse url encoded bodies
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/profile", auth, profileRouter);
app.use("/api/kyc", auth, kycRouter);
app.use("/api/document-types", documentRouter);

// initializing express middlewares
app.use(notFound);
app.use(errorHandler);

//SERVER
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      db.sequelize.sync();
      console.log(`Server is listenning on port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
