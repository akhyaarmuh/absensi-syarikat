import fs from 'fs';

import { prismaClient } from '../app.js';

export default async () => {
  try {
    // Dapatkan data dari database menggunakan Prisma Client
    const users = await prismaClient.users.findMany();
    const regions = await prismaClient.regions.findMany();
    const members = await prismaClient.members.findMany();
    const events = await prismaClient.events.findMany();
    const event_details = await prismaClient.event_details.findMany();

    const data = {
      users,
      regions,
      members,
      events,
      event_details,
    };

    // Simpan data ke dalam file JSON
    if (users[0]) fs.writeFileSync('backup-data.json', JSON.stringify(data));

    console.log('Backup database berhasil.');
  } catch (error) {
    console.error('Terjadi kesalahan saat mencoba membuat backup database:', error);
  }
};
