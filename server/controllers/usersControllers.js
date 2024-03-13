const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const students = await prisma.student.findMany();
  res.status(200).json({ success: true, students });
};

const createUser = async (req, res) => {
  const { index_number, username, password, course } = req.body;
  if (!index_number || !username || !password || !course)
    return res
      .status(400)
      .json({ success: false, message: "Provide all credentials" });

  const findUser = await prisma.student.findUnique({ where: { index_number } });

  if (findUser) {
    return res
      .status(404)
      .json({ success: false, maessage: "User already exist" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await prisma.student.create({
    data: {
      index_number,
      username,
      password: hashedPassword,
    },
  });

  res.status(200).json({ success: true, data: user });
};

module.exports = {
  getUsers,
  createUser,
};
