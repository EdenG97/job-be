import { compare, hash } from "bcryptjs";
import { config } from "dotenv";
import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { sign } from "jsonwebtoken";
import { Op } from "sequelize";
import User from "../models/users";

config();

interface IRequest {
  username: string;
  password: string;
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body as IRequest;
  const user = await User.findOne({
    where: {
      username: {
        [Op.eq]: username,
      },
    },
  });

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: ReasonPhrases.BAD_REQUEST,
      error: "User not found",
    });
  }

  const validPassword = await compare(password, user.password);
  if (!validPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: ReasonPhrases.BAD_REQUEST,
      error: "Invalid password",
    });
  }

  const token = sign({ username }, process.env.PRIVATE_KEY as string, {
    expiresIn: "1m",
  });
  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    message: ReasonPhrases.OK,
    data: {
      token: token,
    },
  });
}

export async function signup(req: Request, res: Response) {
  const { username, password } = req.body as IRequest;
  const user = await User.findOne({
    where: {
      username: {
        [Op.eq]: username,
      },
    },
  });

  if (user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: ReasonPhrases.BAD_REQUEST,
      error: "User already exist",
    });
  }

  const hashPassword = await hash(password, 10);
  await User.create({
    username,
    password: hashPassword,
  });

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    message: ReasonPhrases.CREATED,
  });
}
