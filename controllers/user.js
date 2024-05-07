const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const existUserEmail = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email
          },
          {
            username
          }
        ]
      }
    });

    if(existUserEmail) {
      return res.status(400).json({
        status: false,
        message: 'Email or username already exist',
        data: []
      })
    }

    const response = await prisma.user.create({
      data: {
        username, email, password: hashedPassword
      }
    });
    return res.status(201).json({
      status: true,
      message: 'Data created successfully',
      data: response
    })
  } catch (error) {
    next(error);
  }
}

const updateThumbnail = async (req, res, next) => {
  try {
    const file = req.file;
    const response = await prisma.user.update({
      data: {
        thumbnail: file.path,
      },
      where: {
        id: parseInt(req.params.id)
      }
    });
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
   createUser, updateThumbnail
}