import db from "../models/index.js";
import BadRequestError from "../errors/bad-request.js";
const { user: User, bank: Bank } = db;
const getAllAccounts = async (req, res) => {
  const id = req.user.id;
  //   const user = await findUserById(id);
  const bank = await Bank.findAll({
    where: { user_id: id },
  });
  if (!bank) throw new BadRequestError(`Bank does not found`);
  res.json({ status: true, message: "Bank Accounts", data: bank });
};

const getAccount = async (req, res) => {
  const id = req.user.id;
  const { uuid } = req.params;
  const bank = await Bank.findOne({
    where: { user_id: id, uuid: uuid },
  });
  if (!bank) throw new BadRequestError(`Bank does not found`);
  res.json({ status: true, message: "Bank Accounts", data: bank });
};

export { getAllAccounts as getAllAccouts, getAccount };
