import { NextFunction, Request, Response, query } from "express";
import * as path from "path";
import {
  generateOutboundCode,
  createOutbound,
  getOutbound,
  getOutbounds,
  updateOutbound,
  deleteAllOutbound,
  deleteOutbound,
  importOutbound,
  approveOutbound
} from "./outbound.service";

//! Tambah outbound
export const createOutboundHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = {
      ...req.body,
    };

    const query = {}

    const outbound_code = await generateOutboundCode(query);
    data.outbound_code = outbound_code;

    const outbound = await createOutbound(data);

    res.status(200).json({
      status: "success",
      message: "Sukses create data outbound",
      data: outbound,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get outbound
export const getOutboundHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const outbound = await getOutbound(req.params.outbound_code);

    if (!outbound) {
      return res.status(404).json({
        status: "not found",
        message: "Outbound with that Code not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Sukses get data outbound",
      data: outbound,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get outbounds
export const getOutboundsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const outbounds = await getOutbounds(query);

    res.status(200).json({
      status: "success",
      message: "Sukses get data outbounds",
      data: outbounds.data,
      pagination: outbounds.pagination,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Update outbound
export const updateOutboundHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const outbound_code = req.params.outbound_code;
    const data = req.body;

    //* remove password confirmation
    delete data.passwordConfirm;

    const outbound = await getOutbound(outbound_code);

    if (!outbound) {
      return res.status(404).json({
        status: "not found",
        message: "Outbound with that Code not found",
      });
    }

    const updatedOutbound = await updateOutbound(outbound_code, data);

    res.status(200).json({
      status: "success",
      message: "Sukses update data outbound",
      data: updatedOutbound,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete outbound by id
export const deleteOutboundHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const outbound_code = req.params.outbound_code;

    const outbound = await getOutbound(outbound_code);

    if (!outbound) {
      return res.status(404).json({
        status: "not found",
        message: "Outbound with that Code not found",
      });
    }

    await deleteOutbound(outbound_code);

    res.status(200).json({
      status: "success",
      message: "Sukses delete data outbound",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete outbound
export const deleteOutboundsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAllOutbound();

    res.status(200).json({
      status: "success",
      message: "Sukses delete data outbound",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Import outbound
export const importOutboundHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataCsv = req.file,
      createdBy = req.body.createdBy;

    const payload = {
      dataCsv,
      createdBy,
    };
    
    await importOutbound(payload)

    res.status(200).json({
      status: "success",
      message: "Sukses import data outbound",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Approve outbound
export const approveOutboundHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const outbound_code = req.params.outbound_code;
    await approveOutbound(outbound_code)

    res.status(200).json({
      status: "success",
      message: "Sukses approve data outbound",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};