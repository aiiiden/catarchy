import Elysia from "elysia";

import { EmailService } from "./service";

export const emailRouter = () =>
  new Elysia({
    prefix: "/email",
    tags: ["Email"],
  }).decorate("service", EmailService);
