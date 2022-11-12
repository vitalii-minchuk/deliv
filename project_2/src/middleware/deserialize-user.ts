import { NextFunction, Request, Response } from "express";
import { get } from "lodash";

import { reissueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, "cookies.accessToken") ||
    get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  const refreshToken =
    get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");

  // if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (!expired && refreshToken) {
    const newAccessToken = await reissueAccessToken(refreshToken as string);

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      res.cookie("accessToken", newAccessToken, {
        maxAge: 900000,
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
      });
    }

    const result = verifyJwt(newAccessToken as string);

    res.locals.user = result.decoded;

    return next();
  }

  return next();
};

export default deserializeUser;
