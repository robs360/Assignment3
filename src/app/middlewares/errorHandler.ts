import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const gobalErrorHandilers =(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode;
  const message = err.message || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({ success: false, message, erorr: err });
  return;
};

export default gobalErrorHandilers