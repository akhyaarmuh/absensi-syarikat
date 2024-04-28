import jwt from 'jsonwebtoken';

import { prismaClient } from '../app.js';
import { NODE_ENV, REFRESH_TOKEN } from '../secret.js';
import ErrorResponse from '../utilities/error-response.js';

export default async (req, res, next) => {
  if (NODE_ENV === 'development') {
    req.user = {
      id: 1,
      full_name: 'Muhammad Akhyar',
      role: 'admin',
      shop_id: 1,
      status: 1,
    };
    return next();
  }

  try {
    const refresh_token = req.cookies['refresh-token'];
    if (!refresh_token) throw new ErrorResponse(`Refresh-token tidak tersedia`, 401);

    const user = await prismaClient.users.findFirst({
      where: {
        refresh_token,
      },
    });
    if (!user) throw new ErrorResponse(`Refresh-token tidak ditemukan`, 403);

    jwt.verify(refresh_token, REFRESH_TOKEN, (err) => {
      if (err) throw new ErrorResponse(`Refresh-token tidak valid`, 403);

      req.user = {
        id: user.id,
        full_name: user.full_name,
        role: user.role,
        shop_id: user.shop_id,
        status: user.status,
      };

      next();
    });
  } catch (error) {
    next(error);
  }
};
