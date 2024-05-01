import fs from 'fs';

import { NODE_ENV } from '../secret.js';
import { prismaClient } from '../app.js';

export default async () => {
  if (NODE_ENV === 'development') return;

  try {
    // Dapatkan data dari database menggunakan Prisma Client
    const users = await prismaClient.users.findMany();

    // Simpan data ke dalam file JSON
    if (users[0]) {
      const regions = await prismaClient.regions.findMany();
      const members = await prismaClient.members.findMany();
      const events = await prismaClient.events.findMany();
      const event_details = await prismaClient.event_details.findMany();

      fs.writeFileSync(
        'backup-data.json',
        JSON.stringify({
          users,
          regions,
          members,
          events,
          event_details,
        })
      );
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat mencoba membuat backup database:', error);
  }
};
