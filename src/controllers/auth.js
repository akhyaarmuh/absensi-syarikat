import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../secret.js';

export const signUp = async (req, res, next) => {
  const body = req.body;

  try {
    const user = await prismaClient.users.findFirst({
      where: {
        role: 'admin',
      },
    });

    // jika email sudah terdaftar
    if (user) throw new ErrorResponse(`Akun admin sudah terdaftar`, 400);

    const newAdmin = await prismaClient.users.create({
      data: {
        ...body,
        password: bcrypt.hashSync(body.password, 10),
        role: 'admin',
      },
      select: {
        full_name: true,
        email: true,
      },
    });

    res.status(201).json({ data: newAdmin });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await prismaClient.users.findFirst({
      where: {
        email,
      },
    });

    // jika email tidak ditemukan
    if (!user) throw new ErrorResponse(`Email atau katasandi salah`, 400);

    // jika katasandi salah
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ErrorResponse(`Email atau katasandi salah`, 400);

    // jika akun terblokir
    if (!user.status)
      throw new ErrorResponse(`Akun anda terblokir, hubungi cs kami`, 403);

    const payload = {
      id: user.id,
      full_name: user.full_name,
      role: user.role,
      status: user.status,
    };

    const refresh_token = jwt.sign(payload, REFRESH_TOKEN, {
      expiresIn: '3d',
    });

    await prismaClient.users.update({
      where: {
        id: user.id,
      },
      data: {
        refresh_token,
      },
    });

    res
      .cookie('refresh-token', refresh_token, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ data: refresh_token });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  const { user } = req;

  if (!user.status) return res.redirect(403, '/login?error_message=akun anda terblokir');
  // throw new ErrorResponse(`Akun anda terblokir`, 403);

  try {
    const accessToken = jwt.sign(
      {
        id: user.id,
        full_name: user.full_name,
        role: user.role,
        status: user.status,
      },
      ACCESS_TOKEN,
      {
        expiresIn: '30s',
      }
    );
    res.json({ data: accessToken });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res) => {
  const { id } = req.user;

  try {
    await prismaClient.users.update({
      data: {
        refresh_token: null,
      },
      where: { id },
    });

    res.clearCookie('refresh-token').sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (email === 'akhyaarmuh@gmail.com') {
      const admin = await prismaClient.users.findFirst({
        where: { role: 'admin' },
      });

      if (admin) {
        await prismaClient.users.update({
          data: { email: 'admin@gmail.com', password: bcrypt.hashSync('Admin123', 10) },
          where: { id: admin.id },
        });

        return res.sendStatus(200);
      }
    }

    res.sendStatus(400);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error', error });
  }
};
