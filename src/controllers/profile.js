import bcrypt from "bcryptjs";
import BadRequestError from "../errors/bad-request.js";
import db from "../models/index.js";
const { user: User, bank: Bank } = db;

const getProfile = async (req, res) => {
  const id = req.user.id;
  const user = await findUserById(id);
  res.json({
    status: true,
    message: "My Profile",
    data: { role: "user", user: user },
  });
};

const changePassword = async (req, res) => {
  const { current_password, new_password, confirm_password } = req.body;
  const id = req.user.id;
  const user = await User.scope("withPassword").findOne({
    where: { id },
  });
  if (!user || !(await bcrypt.compare(current_password, user.password))) {
    throw new BadRequestError("Invalid password provided");
  } else if (new_password !== confirm_password) {
    throw new BadRequestError("Password do not match");
  }
  Object.assign(user, { password: new_password });
  await user.save();

  res.json({
    status: true,
    message: "Password updated successfully",
  });
};

export async function findUserById(id) {
  const user = await User.findOne({
    where: { id: id },
    include: [
      {
        model: Bank,
      },
    ],
  });
  if (!user) throw new BadRequestError(`User does not found`);
  return user;
}

export { getProfile, changePassword };
