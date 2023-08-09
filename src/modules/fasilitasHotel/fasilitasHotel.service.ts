import prisma from "../../utils/prisma";
import { createFasilitasHotelInput, UpdateFasilitasHotelInput } from "./fasilitasHotel.schema";
import { ParsedQs } from "qs";

export const generateFasilitasHotelCode = async (query: ParsedQs) => {
    //* get last data
    const lastData = await prisma.fasilitasHotel.findFirst({
      select: {
        fasilitas_hotel_code: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  
    //* generate code
    let id = "0";
    let id_u = 0;
    if (lastData != null) {
      id = lastData.fasilitas_hotel_code.slice(-7);
      id_u = parseInt(id) + 1;
    } else {
      id_u = parseInt(id) + 1;
    }
    if (id_u < 10) {
      id = "000000" + id_u;
    } else if (id_u < 100) {
      id = "00000" + id_u;
    } else if (id_u < 1000) {
      id = "0000" + id_u;
    } else if (id_u < 10000) {
      id = "000" + id_u;
    } else if (id_u < 100000) {
      id = "00" + id_u;
    } else if (id_u < 1000000) {
      id = "0" + id_u;
    } else {
      id = "" + id_u;
    }
  
    const fasilitas_hotel_code = "OBD" + id;
  
    return fasilitas_hotel_code;
  };

//! Tambah data outbound delivery
export async function createFasilitasHotel(data: any) {
    return await prisma.$transaction(async (tx) => {
      //* data outbound delivery
      const dataFasilitasHotel = {
        fasilitas_hotel_code: data.fasilitas_hotel_code,
        nama_hotel: data.nama_hotel,
        alamat: data.alamat,
        keterangan: data.keterangan,
        photo: data.photo,
      };
  
      console.log(dataFasilitasHotel);
  
      //* create outbound delivery
      await tx.fasilitasHotel.create({
        data: dataFasilitasHotel,
      });
  
      console.log(data);
    //   await tx.fasilitasKamarDetail.createMany({
    //     data: datafasilitasKamarDetail,
    //   });
  
      return dataFasilitasHotel;
    });
  }

  //! Get data outbound delivery by id
export async function getFasilitasHotel(fasilitas_hotel_code: string) {
  return await prisma.fasilitasHotel.findUnique({
    where: {
      fasilitas_hotel_code,
    },
  });
}

//! Get all data outbound delivery
export async function getFasilitasHotelries(query: any) {
  let where: any = {
    fasilitas_hotel_code:
      (query.fasilitas_hotel_code as string) != null
        ? (query.fasilitas_hotel_code as string)
        : undefined,
  };

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = page * limit - limit;

  const data = await prisma.fasilitasHotel.findMany({
    where,
    skip: offset,
    take: limit,
  });

  const pagination = await prisma.fasilitasHotel.count({
    where,
  });

  const fasilitasHotelries = {
    data,
    pagination: {
      total_page: Math.ceil(pagination / limit),
      total: pagination,
      current_page: page,
    },
  };

  return fasilitasHotelries;
}

//! Update data outbound delivery
export async function updateFasilitasHotel(
  fasilitas_hotel_code: string,
  data: UpdateFasilitasHotelInput
) {
  console.log(data);

  return await prisma.fasilitasHotel.update({
    where: {
      fasilitas_hotel_code: fasilitas_hotel_code,
    },
    data: data,
  });
}

//! Delete data outbound delivery by id
export async function deleteFaslitasHotel(fasilitas_hotel_code: string) {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.fasilitasHotel.delete({
      where: {
        fasilitas_hotel_code: fasilitas_hotel_code,
      },
    });
  });
}

//! Hapus all data outbound delivery
export async function deleteFasilitasHotelries() {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.fasilitasHotel.deleteMany();
  });
}