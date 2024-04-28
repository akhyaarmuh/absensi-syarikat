import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';

export const createRegion = async (req, res, next) => {
  const { name } = req.body;

  try {
    const region = await prismaClient.regions.findFirst({
      where: { name },
    });

    // jika email sudah terdaftar
    if (region) throw new ErrorResponse(`Wilayah '${name}' sudah ada`, 400);

    const newData = await prismaClient.regions.create({
      data: { name },
    });

    res.status(201).json({ data: newData });
  } catch (error) {
    next(error);
  }
};

export const getAllRegion = async (req, res, next) => {
  const { name = '', ...query } = req.query;
  const page = Number(query.page || 1);
  const limit = Number(query.limit);
  const orderBy = query.sort == 'name' ? { name: 'asc' } : { created_at: 'desc' };

  try {
    const rows = await prismaClient.regions.count({
      where: {
        name: {
          contains: name,
        },
      },
    });

    const pages = Math.ceil(rows / (!limit ? rows : limit));

    const data = await prismaClient.regions.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: !limit ? rows : limit,
    });

    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

export const updateRegionById = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await prismaClient.regions.update({
      where: { id: Number(id) },
      data: { name },
    });

    res.sendStatus(204);
  } catch (error) {
    if (error.code == 'P2002') {
      switch (error.meta.target) {
        case 'name_unique':
          next(new ErrorResponse(`Wilayah ini sudah ada`, 400));
          break;

        default:
          next(new ErrorResponse(`Duplicate field`, 400));
      }
    } else next(error);
  }
};

export const deleteRegionById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await prismaClient.regions.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
