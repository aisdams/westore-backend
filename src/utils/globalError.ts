import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P1008") {
      return res.status(400).json({
        status: 400,
        prismaStatusCode: err.code,
        message: "Operations timed out!",
        err,
      });
    }

    if (err.code === "P2002") {
      return res.status(400).json({
        status: 400,
        prismaStatusCode: err.code,
        message: "That data is already exist!",
        err,
      });
    }

    if (err.code === "P2003") {
      return res.status(400).json({
        status: 400,
        prismaStatusCode: err.code,
        message:
          "Foreign key constraint failed on the field : " +
          err.meta?.field_name,
        err,
      });
    }

    if (err.code === "P2025") {
      return res.status(400).json({
        status: 400,
        prismaStatusCode: err.code,
        message: "Data not found, please check again!",
        err,
      });
    }

    return res.status(500).json({
      status: 500,
      prismaStatusCode: err.code,
      message: err.message,
      err,
    });
  }

  return res.status(500).json({
    status: 500,
    message: err.message,
    err,
  });
};
