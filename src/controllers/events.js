import { prismaClient } from '../app.js';
import ErrorResponse from '../utilities/error-response.js';

export const createEvent = async (req, res, next) => {
  const { name, type, description } = req.body;

  try {
    const newData = await prismaClient.events.create({
      data: { name, type, description: description ? description : null },
    });

    res.status(201).json({ data: newData });
  } catch (error) {
    next(error);
  }
};

export const getAllEvent = async (req, res, next) => {
  const { name = '', type = '', ...query } = req.query;
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);

  const where = {};

  if (name) where.name = { contains: name };
  if (type) where.type = type;

  try {
    const rows = await prismaClient.events.count({ where });

    const pages = Math.ceil(rows / limit);

    const data = await prismaClient.events.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: 'desc' },
    });

    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

export const updateEventById = async (req, res, next) => {
  const { id } = req.params;
  const { name, type, description } = req.body;

  try {
    await prismaClient.events.update({
      where: { id: Number(id) },
      data: { name, type, description: description ? description : null },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const deleteEventById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await prismaClient.events.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ data: deleted });
  } catch (error) {
    next(error);
  }
};

export const createAttendanceByIdEvent = async (req, res, next) => {
  const { event_id } = req.params;
  const { no_induk, type, created_at } = req.body;

  try {
    const member = await prismaClient.members.findFirst({
      where: { no_induk },
      select: {
        id: true,
        no_induk: true,
        full_name: true,
        father_name: true,
        address: true,
        status: true,
        image: true,
        birth: true,
        regions: {
          select: { name: true },
        },
      },
    });

    // jika anggota dengan no. induk tidak ada
    if (!member) throw new ErrorResponse(`Anggota tidak ditemukan`, 404);

    if (member.status == 'inactive')
      throw new ErrorResponse('Keanggotaan anda terblokir', 400);

    if (member.status == 'active') await attendanceCheck(type, member.id, created_at);

    await prismaClient.event_details.create({
      data: { event_id: Number(event_id), member_id: member.id },
    });

    res.status(201).json({ data: member });
  } catch (error) {
    if (error.code == 'P2002')
      next(new ErrorResponse(`Anggota sudah berhasil absen`, 400));
    else next(error);
  }
};

export const getAttendaceDetailsByIdEvent = async (req, res, next) => {
  const { id } = req.params;

  const { 'no-induk': noInduk = '', 'full-name': fullName = '', ...query } = req.query;
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);

  const where = {};

  if (noInduk) where.no_induk = noInduk;
  if (fullName) where.full_name = { contains: fullName };

  try {
    const rows = await prismaClient.event_details.count({
      where: { event_id: Number(id), members: where },
    });

    const pages = Math.ceil(rows / limit);

    const data = await prismaClient.event_details.findMany({
      select: {
        members: {
          select: { no_induk: true, full_name: true, father_name: true, address: true },
        },
      },
      where: { event_id: Number(id), members: where },
      orderBy: { members: { full_name: 'asc' } },
      skip: (page - 1) * limit,
      take: limit,
    });
    res.status(200).json({ data, rows, page, pages, limit });
  } catch (error) {
    next(error);
  }
};

// utilities
const attendanceCheck = async (type, member_id, date) => {
  const dzikiranDetails = await prismaClient.$queryRaw`
    SELECT e.name, e.created_at, ed.member_id AS hadir
    FROM events AS e
    LEFT JOIN event_details AS ed ON ed.event_id = e.id AND ed.member_id = ${member_id}
    WHERE type = 'dzikiran' AND e.created_at <= ${date}
    ORDER BY e.created_at DESC
    LIMIT ${type == 'dzikiran' ? 4 : 3}
    `;
  const kematianDetails = await prismaClient.$queryRaw`
    SELECT e.name, e.created_at, ed.member_id AS hadir
    FROM events AS e
    LEFT JOIN event_details AS ed ON ed.event_id = e.id AND ed.member_id = ${member_id}
    WHERE type = 'kematian' AND e.created_at <= ${date}
    ORDER BY e.created_at DESC
    LIMIT ${type == 'kematian' ? 4 : 3}
    `;

  const isNotActiveDzikiran = dzikiranDetails
    .map((event) => event.hadir)
    .every((value) => value === null);

  if (isNotActiveDzikiran && dzikiranDetails.length === (type == 'dzikiran' ? 4 : 3))
    throw new ErrorResponse('Keanggotaan anda terblokir', 400);

  const isNotActiveKematian = kematianDetails
    .map((event) => event.hadir)
    .every((value) => value === null);

  if (isNotActiveKematian && kematianDetails.length === (type == 'kematian' ? 4 : 3))
    throw new ErrorResponse('Keanggotaan anda terblokir', 400);
};
