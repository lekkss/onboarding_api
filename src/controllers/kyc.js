import { db } from "../models/index.js";
import { findUserById } from "./auth.js";
import BadRequestError from "../errors/bad-request.js";
import { findDocumentById } from "./document.js";
const { User, Kyc } = db.models;

const completeKyc = async (req, res) => {
  const userData = req.body;
  const id = req.user.id;
  const user = await findUserById(id);
  await findDocumentById(req.body.document_type_id);
  const requiredFields = [
    "firstname",
    "middlename",
    "lastname",
    "dob",
    "bvn",
    "country",
    "state",
    "city",
    "postal_code",
    "address",
    "document_type_id",
    "document_number",
  ];
  const missingFields = requiredFields.filter((field) => !userData[field]);

  if (missingFields.length > 0) {
    throw new BadRequestError(
      `Missing required fields: ${missingFields.join(", ")}`
    );
  }
  // Additional validation for business type
  if (user.dataValues.type === "business") {
    const businessFields = ["business_name", "registration_number", "tin"];
    const missingBusinessFields = businessFields.filter(
      (field) => !userData[field]
    );
    if (missingBusinessFields.length > 0) {
      throw new BadRequestError(
        `Missing required fields: ${missingFields.join(", ")}`
      );
    }
  }

  if (!user.dataValues.has_kyc) {
    await Kyc.create({
      userData,
      created_at: Date.now(),
      has_kyc: true,
    });

    Object.assign(user, userData, {
      updated_at: Date.now(),
      has_kyc: true,
      name: `${userData.firstname} ${userData.middlename} ${userData.lastname}`,
    });
    await user.save();

    return res.json({
      status: "true",
      message: "Kyc Completed",

      data: { user: user },
    });
  } else {
    throw new BadRequestError("kyc already created");
  }
};

export { completeKyc };
