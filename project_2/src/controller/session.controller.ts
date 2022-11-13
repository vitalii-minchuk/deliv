import config from "config";
import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import {
  findAndUpdateUser,
  getGoogleOAuthTokens,
  getGoogleUser,
  validatePassword,
} from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import logger from "../utils/logger";

const accessTokenCookiesOptions: CookieOptions = {
  maxAge: 900000,
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenCookiesOptions: CookieOptions = {
  ...accessTokenCookiesOptions,
  maxAge: 3.154e10,
};

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);
  if (!user) return res.status(401).send("Invalid email or password");

  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenTtl") }
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") }
  );

  res.cookie("accessToken", accessToken, accessTokenCookiesOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenCookiesOptions);

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user?._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

export async function googleOAuthHandler(req: Request, res: Response) {
  try {
    const code = req.query.code as string;
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    const googleUser = await getGoogleUser(id_token, access_token);
    // jwt.decode(id_token);

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }

    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true,
      }
    );
    console.log(user);

    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = signJwt(
      {
        ...user?.toJSON(),
        session: session._id,
      },
      { expiresIn: config.get("accessTokenTtl") }
    );

    const refreshToken = signJwt(
      { ...user?.toJSON(), session: session._id },
      { expiresIn: config.get("refreshTokenTtl") }
    );

    res.cookie("accessToken", accessToken, accessTokenCookiesOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenCookiesOptions);

    res.redirect(config.get("origin"));
  } catch (error: any) {
    logger.error(error, "Failed to authorize google user");
    return res.redirect(`${config.get("origin")}/oauth/error`);
  }
}
