import prisma from '../../../src/utils/prisma';
import { createFasilitasKamarInput, UpdateFasilitasKamarlInput } from '../fasilitasKamar/fasilitasKamar.schema';
import { ParsedQs } from 'qs';
import { parseCsv } from '../../../src/utils/parseCSV';

//! Generate kode fasilitasKamar
export const generateOutboundCode = async (query: ParsedQs) => {
  //* get last data
  const lastData = await prisma.fasilitasKamar.findFirst({
    select: {
      fasilitas_kamar_code: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  //* generate code
  let id = '0';
  let id_u = 0;
  if (lastData != null) {
    id = lastData.fasilitas_kamar_code.slice(-7);
    id_u = parseInt(id) + 1;
  } else {
    id_u = parseInt(id) + 1;
  }
  if (id_u < 10) {
    id = '000000' + id_u;
  } else if (id_u < 100) {
    id = '00000' + id_u;
  } else if (id_u < 1000) {
    id = '0000' + id_u;
  } else if (id_u < 10000) {
    id = '000' + id_u;
  } else if (id_u < 100000) {
    id = '00' + id_u;
  } else if (id_u < 1000000) {
    id = '0' + id_u;
  } else {
    id = '' + id_u;
  }

  const fasilitas_kamar_code = 'OUB' + id;

  return fasilitas_kamar_code;
};

//! Tambah data fasilitasKamar
export async function createFasilitasKamar(data: createFasilitasKamarInput) {
  return await prisma.fasilitasKamar.create({
    data,
  });
}

//! Get data fasilitasKamar by id
export async function getFasilitasKamar(fasilitas_kamar_code: string) {
  return await prisma.fasilitasKamar.findUnique({
    where: {
      fasilitas_kamar_code,
    },
  });
}

//! Get all data fasilitasKamar
export async function getFasilitasKamars(query: any) {
  let where: any = {
    fasilitas_kamar_code:
      (query.fasilitas_kamar_code as string) != null
        ? (query.fasilitas_kamar_code as string)
        : undefined,
    status:
      query.status != null && !Array.isArray(query.status)
        ? query.status.toUpperCase()
        : undefined,
    title:
      (query.title as string) != null ? (query.title as string) : undefined,
  };

  if (Array.isArray(query.status)) {
    const OR = query.status.map((s: string) => ({ status: s.toUpperCase() }));

    where = {
      ...where,
      OR,
    };
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = page * limit - limit;

  const data = await prisma.fasilitasKamar.findMany({
    where,
    skip: offset,
    take: limit,
  });

  const pagination = await prisma.fasilitasKamar.count({
    where,
  });

  const outbounds = {
    data,
    pagination: {
      total_page: Math.ceil(pagination / limit),
      total: pagination,
      current_page: page,
    },
  };

  return outbounds;
}

//! Update data outbound by Primary Key
export async function updateOutbound(
  fasilitas_kamar_code: string,
  data: UpdateFasilitasKamarlInput
) {
  return await prisma.fasilitasKamar.update({
    where: {
      fasilitas_kamar_code: fasilitas_kamar_code,
    },
    data: data,
  });
}

//! Hapus data outbound by id
export async function deleteOutbound(fasilitas_kamar_code: string) {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.fasilitasKamarDetail.deleteMany({
      where: {
        fasilitas_kamar_code: fasilitas_kamar_code,
      },
    });
    
    await tx.fasilitasKamar.deleteMany({
      where: {
        fasilitas_kamar_code: fasilitas_kamar_code,
      },
    });
  });
}

//! Hapus all data outbound
export async function deleteAllOutbound() {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.fasilitasKamarDetail.deleteMany();
    await tx.fasilitasKamar.deleteMany();
  });
}

//! Import data outbound by CSV
export async function importOutbound(payload: any) {
  const dataCsv = payload.dataCsv;
  const data = parseCsv(dataCsv);

  let to_insert: {
    fasilitas_kamar_code: any;
    title: any;
    description: any;
    status: any;
    createdBy: any;
    createdAt: Date;
  }[] = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].length === data[0].length) {
      let dataInsert = {
        fasilitas_kamar_code: data[i][0],
        title: data[i][1],
        description: data[i][2],
        status: data[i][3],
        createdBy: payload.createdBy,
        createdAt: new Date(),
      };

      to_insert.push(Object.assign({}, dataInsert));
    }
  }

//   return await prisma.$transaction(async (tx) => {
//     const addOutbound = await tx.fasilitasKamar.createMany({
//       data: to_insert,
//     });

//     return addOutbound;
//   });
}
