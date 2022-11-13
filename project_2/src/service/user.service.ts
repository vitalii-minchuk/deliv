import axios from "axios";
import config from "config";
import { omit } from "lodash";
import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import qs from "qs";
import UserModel, { UserDocument } from "../models/user.model";
import logger from "../utils/logger";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

interface GoogleTokensResult {
  id_token: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
}
export async function getGoogleOAuthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: config.get("googleClientId"),
    client_secret: config.get("googleClientSecret"),
    redirect_uri: config.get("googleOauthRedirectUri"),
    grant_type: "authorization_code",
  };

  try {
    const result = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return result.data;
  } catch (error: any) {
    logger.error("Failed to fetch google tokens");
    throw new Error(error.message);
  }
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser(
  id_token: string,
  access_token: string
): Promise<GoogleUserResult> {
  try {
    const { data } = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    logger.error(error, "Error fetching google user");
    throw new Error(error.message);
  }
}

export async function findAndUpdateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions = {}
) {
  return UserModel.findByIdAndUpdate(query, update, options);
}
