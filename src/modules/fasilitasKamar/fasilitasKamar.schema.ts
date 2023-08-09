import { any, array, object, string, TypeOf, z } from "zod";

//! Validasi create data outbound
export const createFasilitasHotelSchema = object({
  body: object({
    fasilitas_kamar_code: string({
      required_error: "fasilitas_kamar_code harus di isi",
    }),
    tipe_kamar: string({
      required_error: "tipe_kamar harus di isi",
    }),
    fasilitas_kamar: string({
      required_error: "fasilitas_kamar harus di isi",
    }),
    jumlah_kamar_tersedia: string({
      required_error: "jumlah_kamar_tersedia harus di isi",
    }),
    jumlah_kamar_tekterpakai: string({
        required_error: "jumlah_kamar_tekterpakai harus di isi",
      }),
      jumlah_pinjam: string({
        required_error: "jumlah_pinjam harus di isi",
      }),
      tarif: string({
        required_error: "tarif harus di isi",
      }),
  }),
});

export const updateFasilitasHotelSchema = object({
  body: object({
    tipe_kamar: string({
        required_error: "tipe_kamar harus di isi",
      }),
      fasilitas_kamar: string({
        required_error: "fasilitas_kamar harus di isi",
      }),
      jumlah_kamar_tersedia: string({
        required_error: "jumlah_kamar_tersedia harus di isi",
      }),
      jumlah_kamar_tekterpakai: string({
          required_error: "jumlah_kamar_tekterpakai harus di isi",
        }),
        jumlah_pinjam: string({
          required_error: "jumlah_pinjam harus di isi",
        }),
        tarif: string({
          required_error: "tarif harus di isi",
        }),
  }),
});

export type createFasilitasKamarInput = TypeOf<
  typeof createFasilitasHotelSchema
>["body"];
export type UpdateFasilitasKamarlInput = TypeOf<
  typeof updateFasilitasHotelSchema
>["body"];
