import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const JOBS_API = "https://dev6.dansmultipro.com/api/recruitment/positions.json";
const JOB_DETAIL = "https://dev6.dansmultipro.com/api/recruitment/positions/";

export async function jobs(req: Request, res: Response) {
  const response = await fetch(JOBS_API);
  const data = await response.json();
  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    message: ReasonPhrases.OK,
    data: data,
  });
}

export async function jobDetail(req: Request, res: Response) {
  const id = req.params["id"];
  const response = await fetch(JOB_DETAIL + id);
  const data = await response.json();
  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    message: ReasonPhrases.OK,
    data: data,
  });
}
