import { StatusCodes } from "http-status-codes";
import { db } from "../models/index.js";
import BadRequestError from "../errors/bad-request.js";
const { DocumentTypes } = db.models;

const createDocument = async (req, res) => {
  if (req.body) {
    await DocumentTypes.create({ ...req.body, created_at: Date.now() });
    res
      .status(StatusCodes.CREATED)
      .json({ status: true, message: "Document Created Successfully" });
  }
};
const getDocuments = async (req, res) => {
  const documents = await DocumentTypes.findAll();
  res.status(StatusCodes.CREATED).json({
    status: true,
    message: "Document fetched Successfully",
    data: documents,
  });
};

export async function findDocumentById(id) {
  const user = await DocumentTypes.findOne({ where: { id: id } });
  if (!user) throw new BadRequestError(`Document does not exist`);
  return user;
}

export { createDocument, getDocuments };
