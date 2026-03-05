import Elysia, { StatusMap } from "elysia";
import { authGuard } from "../auth/guard";
import { UserService } from "./service";
import { userModel } from "./model";

export const useRouter = () => {
  return new Elysia({
    prefix: "/user",
    tags: ["User"],
  })
    .decorate("userService", UserService)
    .use(userModel)
    .use(authGuard())
    .get(
      "/me",
      async ({ user, userService }) => {
        const { id } = user;
        return await userService.getCurrentUser({ id });
      },
      {
        response: {
          [StatusMap["Not Found"]]: "user.not-found",
          [StatusMap.OK]: "user.current-user.response",
        },
      },
    );
};
