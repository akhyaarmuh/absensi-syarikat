import { MongoClient } from 'mongodb';
import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

// URL koneksi ke database MongoDB
const url = 'mongodb://127.0.0.1:27017';

// Nama database
const dbName = 'majlis';

// Fungsi untuk mengambil data
async function getData() {
  const client = new MongoClient(url);

  try {
    // Membuka koneksi ke database
    await client.connect();

    // Memilih database
    const db = client.db(dbName);

    await exportRegions(db);

    await exportMembers(db);
  } catch (err) {
    console.error(err);
  } finally {
    // Menutup koneksi
    client.close();
  }
}

// Memanggil fungsi untuk mengambil data
getData();

const exportRegions = async (db) => {
  // Mengambil koleksi (collection)
  const collectionRegions = db.collection('regions');

  // Mengambil semua dokumen dalam koleksi
  const documentsRegion = await collectionRegions.find({}).toArray();

  // Masukan ke database
  for (const region of documentsRegion) {
    await prismaClient.regions.create({ data: { name: region.name } });
  }
};

const exportMembers = async (db) => {
  // Mengambil koleksi (collection)
  const collectionMembers = db.collection('members');

  // Mengambil semua dokumen dalam koleksi
  const documentsMember = await collectionMembers.find({}).toArray();

  const populatedMembers = await Promise.all(
    documentsMember.map(async (member) => {
      const region = await db.collection('regions').findOne({ _id: member.region });
      member.region_name = region.name; // Menambahkan data pengguna ke dalam member
      return member;
    })
  );

  // Masukan ke database
  for (const member of populatedMembers) {
    const region = await prismaClient.regions.findFirst({
      where: { name: member.region_name },
    });

    await prismaClient.members.create({
      data: {
        no_induk: member.no_induk,
        full_name: member.full_name,
        birth: member.birth || null,
        father_name: member.parent_name,
        address: member.address,
        region_id: region.id,
        status: 'active',
        image: member.image || null,
      },
    });
  }
};
