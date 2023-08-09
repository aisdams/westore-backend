import { NextFunction, Request, Response, query } from "express";
import * as path from "path";
import {
  generateFasilitasHotelCode,
  createFasilitasHotel,
  getFasilitasHotelries,
  getFasilitasHotel,
  updateFasilitasHotel,
  deleteFaslitasHotel,
  deleteFasilitasHotelries,
} from "./fasilitasHotel.service";
import { isArray } from "lodash";
import fs from "fs/promises";

//! Tambah outbound delivery
export const createFasilitasHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = {
      ...req.body,
    };

    const query = {};

    //* generate code
    const fasilitas_hotel_code = await generateFasilitasHotelCode(query);
    data.fasilitas_hotel_code = fasilitas_hotel_code;

    //* set array photo
    let photos = [];
    if (data.photo) {
      for (const photo of data.photo) {
        photos.push(photo.filename);
      }
    }
    data.photo = JSON.stringify(photos);

    //* create data
    const fasilitasHotel = await createFasilitasHotel(data);

    res.status(200).json({
      status: "success",
      message: "Sukses create data fasilitas hotel",
      data: fasilitasHotel,
    });
  } catch (err: any) {
    if (req.files != undefined) {
      if (isArray(req.files)) {
        for (const file of req.files) {
          try {
            fs.unlink(file.path);
          } catch (err: any) {
            console.log("err =>", err);
            next(err);
          }
        }
      }
    }

    const uploadedFilePath = req.file?.path;

    if (uploadedFilePath) {
      try {
        fs.unlink(uploadedFilePath);
      } catch (err: any) {
        console.log("err =>", err);
        next(err);
      }
    }
    next(err);
  }
};

//! Get outbound delivery
export const getFasilitasHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fasilitasHotel = await getFasilitasHotel(
      req.params.fasilitas_hotel_code
    );

    if (!fasilitasHotel) {
      return res.status(404).json({
        status: "not found",
        message: "Outbound delivery with that Code not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Sukses get data fasilitas hotel",
      data: fasilitasHotel,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get outbound deliveries
export const getFasilitasHotelriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const fasilitasHotel = await getFasilitasHotelries(query);

    res.status(200).json({
      status: "success",
      message: "Sukses get data fasilitas hotel",
      data: fasilitasHotel.data,
      pagination: fasilitasHotel.pagination,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Update outbound delivery
export const updateFasilitasHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fasilitas_hotel_code = req.params.fasilitas_hotel_code;
    const data = req.body;

    const outbound_delivery_detail = await getFasilitasHotel(
      fasilitas_hotel_code
    );

    if (!outbound_delivery_detail) {
      return res.status(404).json({
        status: "not found",
        message: "Outbound delivery with that Code not found",
      });
    }

    const fasilitasHotel = await updateFasilitasHotel(
      fasilitas_hotel_code,
      data
    );

    res.status(200).json({
      status: "success",
      message: "Sukses update data fasilitas hotel",
      data: fasilitasHotel,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete outbound delivery
export const deleteFasilitasHotelHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fasilitas_hotel_code = req.params.fasilitas_hotel_code;
    const fasilitasHotel = await getFasilitasHotel(fasilitas_hotel_code);

    if (!fasilitasHotel) {
      return res.status(404).json({
        status: "not found",
        message: "Outbound delivery with that Code not found",
      });
    }

    if (fasilitasHotel.photo) {
      for (const photo of JSON.parse(fasilitasHotel.photo)) {
        const pathfile = path.join(__dirname, "../../../public/uploads/images/outbound_delivery/", photo);
        if (pathfile) {
          try {
            fs.unlink(pathfile);
          } catch (err: any) {
            console.log("err =>", err);
            next(err);
          }
        }
      }
    }
  
    await deleteFaslitasHotel(fasilitas_hotel_code);

    res.status(200).json({
      status: "success",
      message: "Sukses delete data fasilitas hotel",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete all outbound delivery
export const deleteFasilitasHotelriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pathfile = path.join(__dirname, "../../../public/uploads/images/outbound_delivery/");
    const files = await fs.readdir(pathfile);
    for (const file of files) {
      try {
        fs.unlink(pathfile + file);
      } catch (err: any) {
        console.log("err =>", err);
        next(err);
      }
    }

    await deleteFasilitasHotelries();

    res.status(200).json({
      status: "success",
      message: "Sukses delete all data fasilitas hotel",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
