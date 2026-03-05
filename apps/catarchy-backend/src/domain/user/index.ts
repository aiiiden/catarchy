import Elysia from "elysia";
import { authGuard } from "../auth/guard";

export const useRouter = () => {
  return new Elysia({
    prefix: "/user",
  })
    .use(authGuard())
    .get("/me", async ({ user }) => {
      return user;
    });
};
