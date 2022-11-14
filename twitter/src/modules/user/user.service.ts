import argon2 from "argon2";
import prisma from "../../utils/prisma";
import { RegisterUserInput } from "./user.dto";

export async function createUser(input: RegisterUserInput) {
  const password = await argon2.hash(input.password);

  return prisma.user.create({
    data: {
      ...input,
      email: input.email.toLocaleLowerCase(),
      username: input.username.toLocaleLowerCase(),
      password,
    },
  });
}
