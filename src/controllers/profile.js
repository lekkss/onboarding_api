import BadRequestError from "../errors/bad-request.js";
import { db } from "../models/index.js";
const { User } = db.models;

const getProfile = async (req, res) => {
  const id = req.user.id;
  const user = await findUserById(id);
  res.json({
    status: true,
    message: "My Profile",
    data: { role: "user", user: user },
  });
};

export async function findUserById(id) {
  const user = await User.findByPk(id);
  if (!user) throw new BadRequestError(`User does not found`);
  return user;
}

export { getProfile };