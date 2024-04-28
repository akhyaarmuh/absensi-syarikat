import bcrypt from 'bcrypt';

import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';

export const createUser = async (req, res, next) => {
  const { full_name, email, password } = req.body;

  try {
    const user = await prismaClient.users.findFirst({
      where: { email },
    });

    // jika email sudah terdaftar
    if (user) throw new ErrorResponse(`Email '${email}' sudah digunakan`, 400);

    const newData = await prismaClient.users.create({
      data: { full_name, email, password: bcrypt.hashSync(password, 10) },
      select: { full_name: true, email: true },
    });

    res.status(201).json({ data: newData });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  const { 'full-name': fullName = '', ...query } = req.query;

  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);

  try {
    const rows = await prismaClient.users.count({
      where: {
        full_name: {
          contains: fullName,
        },
      },
    });

    const pages = Math.ceil(rows / limit);

    const data = await prismaClient.users.findMany({
      where: {
        full_name: {
          contains: fullName,
        },
      },
      orderBy: { full_name: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { full_name, email } = req.body;

  try {
    await prismaClient.users.update({
      where: { id: Number(id) },
      data: { full_name, email },
    });

    res.sendStatus(204);
  } catch (error) {
    if (error.code == 'P2002') {
      switch (error.meta.target) {
        case 'email_unique':
          next(new ErrorResponse(`Email ini sudah digunakan`, 400));
          break;

        default:
          next(new ErrorResponse(`Duplicate field`, 400));
      }
    } else next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await prismaClient.users.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ data: deleted });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await prismaClient.users.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        full_name: true,
        email: true,
      },
    });

    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};
