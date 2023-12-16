import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import { BadRequestError } from "../errors/index.js";
import { generateToken } from "../services/token.js";
import { db } from "../models/index.js";
const { User } = db.models;

//Login auth
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  if (!(await User.findOne({ where: { email: email } }))) {
    res.json({
      status: false,
      message: `Email does not exist`,
    });
  } else {
    const user = await User.scope("withPassword").findOne({
      where: { email },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestError("Invalid password provided");
    }
    const token = generateToken(user.id, user.email);
    return res.status(StatusCodes.OK).json({
      status: true,
      message: "Login successful",
      data: {
        role: "user",
        user: { ...omitPassword(user.get()) },
        token: token,
      },
    });
  }
};

const initializeSignup = async (req, res) => {
  const { phone } = req.body;

  if (req.body) {
    if (await User.findOne({ where: { phone: phone } })) {
      res.json({
        status: false,
        message: "Phonenumber already in use",
      });
    } else {
      await User.create(req.body);
      res.status(StatusCodes.CREATED).json({
        status: true,
        data: { otp: "1234" },
        message: "Signup initialized successfully",
      });
    }
  } else {
    throw new BadRequestError("Please provide phonenumber and countrycode");
  }
};

const verifySignup = async (req, res) => {
  const { phone, otp } = req.body;
  const user = await findUserByPhone(phone);
  const { created_at, uuid } = user.dataValues;
  if (created_at !== null) {
    res.status(StatusCodes.CREATED).json({
      status: false,
      message: "Phone number verified, Proceed to complete signup",
      data: { step: "completed", uuid: uuid },
    });
  }
  if (otp === "1234") {
    Object.assign(user, {
      created_at: Date.now(),
    });
    await user.save();
    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Signup verified successfully",
    });
  } else {
    throw new BadRequestError("Invalid otp entered");
  }
};

const completeSignup = async (req, res) => {
  const { email, password, password_confirmation, type } = req.body;
  const { uuid } = req.params;
  const user = await findUserByUuid(uuid);
  if (await User.findOne({ where: { email: email } })) {
    throw new BadRequestError("Email already exists");
  } else if (password !== password_confirmation) {
    throw new BadRequestError("password do not match");
  }
  if (req.body) {
    let hashedPassword = await bcrypt.hash(password, 8);
    Object.assign(user, {
      password: hashedPassword,
      email: email,
      type: type,
      updated_at: Date.now(),
    });
    await user.save();
    res.status(StatusCodes.CREATED).json({
      status: true,
      message: "Signup completed successfully",
      data: {
        role: "user",
        user: { ...omitPassword(user.get()) },
        token: false,
      },
    });
  } else {
    throw new BadRequestError("Please enter all fields");
  }
};

function omitPassword(user) {
  const { password, ...userWithoutHash } = user;
  return userWithoutHash;
}

//helper to find user with id
async function findUserByPhone(phone) {
  const user = await User.findOne({ where: { phone: phone } });
  if (!user) throw new BadRequestError(`User does not exist`);
  return user;
}

export async function findUserByUuid(uuid) {
  const user = await User.findOne({ where: { uuid: uuid } });
  if (!user) throw new BadRequestError(`User does not exist`);
  return user;
}

export async function findUserById(id) {
  const user = await User.findOne({ where: { id: id } });
  if (!user) throw new BadRequestError(`User does not exist`);
  return user;
}

export { login, initializeSignup, verifySignup, completeSignup };
