import { Request } from "express";
import multer from "multer";
import * as path from "path";

const imageFasilitasHotelPath = path.resolve(
  __dirname,
  "../..",
  "public/uploads/images/fasilitas_hotel"
);

const multerStorageFasilitasHotel = multer.diskStorage({
  destination: imageFasilitasHotelPath,
  filename: function (req: Request, file: Express.Multer.File, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = new Date().getTime() + "-" + file.originalname;
    cb(null, filename);
    req.body.photo = req.files;
  },
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (
    file.mimetype == "application/pdf" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadFasilitasHotel = multer({
  storage: multerStorageFasilitasHotel,
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 * 20, files: 3 },
});

export const uploadImageFasilitasHotel = uploadFasilitasHotel.array(
  "photo",
  3
);
