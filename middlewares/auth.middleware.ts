import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";

export function checkAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: ReasonPhrases.UNAUTHORIZED,
    });
    return;
  }

  const token = auth.split(" ")[1];
  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: ReasonPhrases.UNAUTHORIZED,
    });
    return;
  }

  try {
    verify(token, process.env.PRIVATE_KEY as string);
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: ReasonPhrases.UNAUTHORIZED,
    });
  }
}
