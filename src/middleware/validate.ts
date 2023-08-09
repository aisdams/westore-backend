import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import fs from "fs/promises";
import { isArray } from "lodash";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(req.body)
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
        return res.status(400).json({
          status: "fail",
          errors: error.errors,
        });
      }
      next(error);
    }
  };
