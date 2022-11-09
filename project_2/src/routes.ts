import { Express, Request, Response } from "express";

import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validate-resource";
import { createUserSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import requireUser from "./middleware/require-user";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createUserSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);
}

export default routes;
