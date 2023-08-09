import { any, array, object, string, TypeOf, z } from "zod";

//! Validasi create data outbound
export const createFasilitasHotelSchema = object({
  body: object({
    nama_hotel: string({
      required_error: "nama_hotel harus di isi",
    }),
    alamat: string({
      required_error: "alamat harus di isi",
    }),
    keterangan: string({
      required_error: "keterangan harus di isi",
    }),
    photo: array(object({})),
  }),
});

export const updateFasilitasHotelSchema = object({
  body: object({
      nama_hotel: string({
        required_error: "nama_hotel harus di isi",
      }),
      alamat: string({
        required_error: "alamat harus di isi",
      }),
      keterangan: string({
        required_error: "keterangan harus di isi",
      }),
    photo: string({
      invalid_type_error: "photo harus berupa string",
    }),
  }),
});

export type createFasilitasHotelInput = TypeOf<
  typeof createFasilitasHotelSchema
>["body"];
export type UpdateFasilitasHotelInput = TypeOf<
  typeof updateFasilitasHotelSchema
>["body"];
