import Jwt from "jsonwebtoken";

const generateToken = (id, email, role) => {
  return Jwt.sign(
    { id: id, email: email, role: role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};
export { generateToken };
