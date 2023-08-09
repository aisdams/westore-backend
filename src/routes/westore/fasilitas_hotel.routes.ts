import express from "express";
import {
  getFasilitasHotelHandler,
  createFasilitasHotelHandler,
  getFasilitasHotelriesHandler,
  updateFasilitasHotelHandler,
  deleteFasilitasHotelHandler,
  deleteFasilitasHotelriesHandler,
} from "../../modules/fasilitasHotel/fasilitasHotel.controller";
import { validate } from "../../middleware/validate";
import {
  createFasilitasHotelSchema,
  updateFasilitasHotelSchema,
} from "../../modules/fasilitasHotel/fasilitasHotel.schema";
import { uploadImageFasilitasHotel } from "../../utils/UploadImage";

const router = express.Router();

router.get("/", getFasilitasHotelriesHandler);
router.get("/:fasilitas_hotel_code", getFasilitasHotelHandler);
router.post(
  "/",

  uploadImageFasilitasHotel,
  validate(createFasilitasHotelSchema),
  createFasilitasHotelHandler
);
router.put(
  "/:fasilitas_hotel_code",

  validate(updateFasilitasHotelSchema),
  updateFasilitasHotelHandler
);
router.delete(
  "/:fasilitas_hotel_code",

  deleteFasilitasHotelHandler
);
router.delete("/", deleteFasilitasHotelriesHandler);

export default router;
