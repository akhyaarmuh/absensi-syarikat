import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';

export const createMember = async (req, res, next) => {
  const { no_induk, full_name, birth, father_name, address, region_id } = req.body;

  try {
    const member = await prismaClient.members.findFirst({
      where: { no_induk },
    });

    // jika no. induk sudah digunakan
    if (member) throw new ErrorResponse(`No. induk ini sudah digunakan`, 400);

    const newData = await prismaClient.members.create({
      data: {
        no_induk,
        full_name,
        birth: new Date(birth),
        father_name,
        address,
        region_id,
      },
    });

    res.status(201).json({ data: newData });
  } catch (error) {
    next(error);
  }
};

export const getAllMember = async (req, res, next) => {
  const {
    'no-induk': noInduk = '',
    'full-name': fullName = '',
    status = '',
    region,
    ...query
  } = req.query;
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const orderBy = fullName ? { full_name: 'asc' } : { created_at: 'desc' };

  const where = {};

  if (noInduk) where.no_induk = noInduk;
  if (fullName) where.full_name = { contains: fullName };
  if (status) where.status = status;
  if (region) where.region_id = Number(region);

  try {
    const rows = await prismaClient.members.count({ where });

    const pages = Math.ceil(rows / limit);

    const data = await prismaClient.members.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        no_induk: true,
        full_name: true,
        father_name: true,
        status: true,
        regions: {
          select: { id: true, name: true },
        },
      },
      orderBy,
    });

    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

export const updateMemberById = async (req, res, next) => {
  const { id } = req.params;
  const { no_induk, full_name, birth, father_name, address, region_id, status } =
    req.body;

  try {
    await prismaClient.members.update({
      where: { id: Number(id) },
      data: {
        no_induk,
        full_name,
        birth: new Date(birth),
        father_name,
        address,
        region_id,
        status,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    if (error.code == 'P2002') {
      switch (error.meta.target) {
        case 'no_induk_unique':
          next(new ErrorResponse(`No. induk ini sudah digunakan`, 400));
          break;

        default:
          next(new ErrorResponse(`Duplicate field`, 400));
      }
    } else next(error);
  }
};

export const deleteMemberById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await prismaClient.members.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ data: deleted });
  } catch (error) {
    next(error);
  }
};

export const getMemberById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const member = await prismaClient.members.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        no_induk: true,
        full_name: true,
        birth: true,
        father_name: true,
        address: true,
        region_id: true,
        status: true,
        image: true,
        regions: {
          select: { id: true, name: true },
        },
      },
    });

    res.status(200).json({ data: member });
  } catch (error) {
    next(error);
  }
};

export const getAbsentDetailsById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const dzikiran_details = await prismaClient.$queryRaw`
      SELECT e.name, e.created_at, ed.member_id AS hadir
      FROM events AS e
      LEFT JOIN event_details AS ed ON ed.event_id = e.id AND ed.member_id = ${id}
      WHERE type = 'dzikiran'
      ORDER BY e.created_at DESC
      LIMIT 10
    `;
    const kematian_details = await prismaClient.$queryRaw`
      SELECT e.name, e.created_at, ed.member_id AS hadir
      FROM events AS e
      LEFT JOIN event_details AS ed ON ed.event_id = e.id AND ed.member_id = ${id}
      WHERE type = 'kematian'
      ORDER BY e.created_at DESC
      LIMIT 10
    `;

    res.status(200).json({ data: { dzikiran_details, kematian_details } });
  } catch (error) {
    next(error);
  }
};
