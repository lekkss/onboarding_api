import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import { generateToken } from "../utils/token.js";
import { generateOtp } from "../utils/generateOtp.js";
import db from "../models/index.js";
const { user: User, bank: Bank } = db;

//Login auth
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(await User.findOne({ where: { email: email } }))) {
    res.json({
      statusCode: StatusCodes.ACCEPTED,
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
      statusCode: StatusCodes.OK,
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
  const user = await User.findOne({ where: { phone: phone } });
  if (req.body) {
    if (user) {
      const {
        created_at,
        uuid,
        phone: userphone,
        country_code,
        updated_at,
      } = user.dataValues;
      if (updated_at !== null) {
        res.status(StatusCodes.CREATED).json({
          statusCode: StatusCodes.BAD_REQUEST,
          status: false,
          message: "Phone number verified, Proceed to complete signup",
          data: { step: "completed", uuid: uuid },
        });
      } else if (created_at !== null) {
        res.status(StatusCodes.CREATED).json({
          statusCode: StatusCodes.BAD_REQUEST,
          status: false,
          message: "Signup Initialized, Proceed to verify phone number",
          data: {
            step: "verify",
            phone: userphone,
            country_code: country_code,
          },
        });
      }
    } else {
      const otp = generateOtp();
      await User.create({ ...req.body, otp: otp, created_at: Date.now() });
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.OK,
        status: true,
        data: { otp: otp },
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
  const { otp: userOtp, updated_at, uuid } = user.dataValues;
  console.log(userOtp, otp);

  if (updated_at !== null) {
    res.status(StatusCodes.CREATED).json({
      statusCode: StatusCodes.BAD_REQUEST,
      status: false,
      message: "phone number already verified, proceed to signup",
      data: { step: "completed", uuid: uuid },
    });
  }
  if (otp === userOtp) {
    Object.assign(user, {
      updated_at: Date.now(),
    });
    await user.save();
    res.status(StatusCodes.CREATED).json({
      statusCode: StatusCodes.OK,
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
      statusCode: StatusCodes.OK,
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

const resendOtp = async (req, res) => {
  const { phone } = req.body;
  const user = await findUserByPhone(phone);
  const otp = generateOtp();
  Object.assign(user, {
    otp: otp,
    updated_at: Date.now(),
  });
  await user.save();
  res.status(StatusCodes.CREATED).json({
    statusCode: StatusCodes.OK,
    status: true,
    data: { otp: otp },
    message: "OTP sent successfully",
  });
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
  const user = await User.findOne({
    where: { id: id },
    include: [
      {
        model: Bank,
      },
    ],
  });
  if (!user) throw new BadRequestError(`User does not exist`);
  return user;
}

export { login, initializeSignup, verifySignup, completeSignup, resendOtp };
