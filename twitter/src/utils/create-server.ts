import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServerPlugin } from "apollo-server-plugin-base";
import { ApolloServer } from "apollo-server-fastify";
import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import fastifyCors from "@fastify/cors";
import { buildSchema } from "type-graphql";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

import UserResolver from "../modules/user/user.resolver";

const app = fastify();

app.register(fastifyCors, {
  credentials: true,
  origin: (origin, cb) => {
    if (
      ["http://localhost:3000", "https://studio.apollographql.com"].includes(
        origin
      )
    ) {
      return cb(null, true);
    }

    return cb(new Error("Not allowed"), false);
  },
});

app.register(fastifyCookie, { parseOptions: {} });

app.register(fastifyJwt, {
  secret: "changeme",
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close();
        },
      };
    },
  };
}

async function buildContext({
  request,
  reply,
  connectionParams,
}: {
  request?: FastifyRequest;
  reply?: FastifyReply;
  connectionParams?: {
    Authorization: string;
  };
}) {
  if (connectionParams || !request) {
    try {
      return {
        user: await app.jwt.verify(connectionParams?.Authorization || ""),
      };
    } catch (error) {
      return { user: null };
    }
  }
  try {
    const user = await request.jwtVerify();
    return { reply, request, user };
  } catch (error) {
    return { reply, request, user: null };
  }

  return { request, reply };
}

export type Context = Awaited<ReturnType<typeof buildContext>>;

export async function createServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({
        httpServer: app.server,
      }),
    ],
    context: buildContext,
  });

  return { app, server };
}
