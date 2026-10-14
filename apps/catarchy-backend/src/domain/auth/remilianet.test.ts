import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";

import { ExternalServiceError, UnauthorizedError } from "@/lib/error";

import { AuthRepository } from "./repository";
import { AuthService } from "./service";

const { UserRepository } = await import("@/domain/user");

const user = {
  id: "fixture-user",
  handle: "fixture_user",
  createdAt: null,
  updatedAt: null,
};
const dbDescriptor = Object.getOwnPropertyDescriptor(AuthService, "db")!;

afterEach(() => {
  mock.restore();
  Object.defineProperty(AuthService, "db", dbDescriptor);
});

describe("RemiliaNET sign-in", () => {
  test("rejects an expired token before accessing accounts", async () => {
    spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 401 }),
    );
    const findAuth = spyOn(AuthRepository, "findAuthByRemiliaUsername");

    await expect(
      AuthService.signInWithRemiliaAccessToken("fixture-token"),
    ).rejects.toBeInstanceOf(UnauthorizedError);
    expect(findAuth).not.toHaveBeenCalled();
  });

  test("reports upstream failures without creating an account", async () => {
    spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    const create = spyOn(AuthRepository, "createRemiliaAuth");

    await expect(
      AuthService.signInWithRemiliaAccessToken("fixture-token"),
    ).rejects.toBeInstanceOf(ExternalServiceError);
    expect(create).not.toHaveBeenCalled();
  });

  test("rejects a profile with no usable username", async () => {
    spyOn(globalThis, "fetch").mockResolvedValue(
      Response.json({ user: { username: "   " } }),
    );
    const findAuth = spyOn(AuthRepository, "findAuthByRemiliaUsername");

    await expect(
      AuthService.signInWithRemiliaAccessToken("fixture-token"),
    ).rejects.toBeInstanceOf(ExternalServiceError);
    expect(findAuth).not.toHaveBeenCalled();
  });

  test("reuses the existing user and refreshes their display name", async () => {
    const fetchProfile = spyOn(globalThis, "fetch").mockResolvedValue(
      Response.json({
        user: { username: " Fixture_User ", displayName: " New Nickname " },
      }),
    );
    const findAuth = spyOn(
      AuthRepository,
      "findAuthByRemiliaUsername",
    ).mockResolvedValue({ userId: user.id } as Awaited<
      ReturnType<typeof AuthRepository.findAuthByRemiliaUsername>
    >);
    spyOn(UserRepository, "findById").mockResolvedValue(user);
    const updateName = spyOn(
      AuthRepository,
      "updateRemiliaDisplayName",
    ).mockReturnValue(
      Promise.resolve() as unknown as ReturnType<
        typeof AuthRepository.updateRemiliaDisplayName
      >,
    );
    const create = spyOn(AuthRepository, "createRemiliaAuth");

    expect(
      await AuthService.signInWithRemiliaAccessToken("fixture-token"),
    ).toEqual(user);
    expect(findAuth).toHaveBeenCalledWith({ remiliaUsername: "fixture_user" });
    expect(updateName).toHaveBeenCalledWith({
      remiliaUsername: "fixture_user",
      remiliaDisplayName: "New Nickname",
    });
    expect(fetchProfile.mock.calls[0]?.[1]?.headers).toEqual({
      Authorization: "Bearer fixture-token",
    });
    expect(create).not.toHaveBeenCalled();
  });

  test("creates a new account with an available handle in one batch", async () => {
    spyOn(globalThis, "fetch").mockResolvedValue(
      Response.json({
        user: { username: "Fixture.User", displayName: "Fixture" },
      }),
    );
    spyOn(AuthRepository, "findAuthByRemiliaUsername").mockResolvedValue(
      undefined as unknown as Awaited<
        ReturnType<typeof AuthRepository.findAuthByRemiliaUsername>
      >,
    );
    const findHandle = spyOn(UserRepository, "findByHandle")
      .mockResolvedValueOnce(user)
      .mockResolvedValueOnce(
        undefined as unknown as Awaited<
          ReturnType<typeof UserRepository.findByHandle>
        >,
      );
    const userQuery = {} as ReturnType<typeof UserRepository.create>;
    const authQuery = {} as ReturnType<typeof AuthRepository.createRemiliaAuth>;
    const createUser = spyOn(UserRepository, "create").mockReturnValue(
      userQuery,
    );
    const createAuth = spyOn(
      AuthRepository,
      "createRemiliaAuth",
    ).mockReturnValue(authQuery);
    const batch = mock(async () => []);
    Object.defineProperty(AuthService, "db", {
      configurable: true,
      get: () => ({ batch }),
    });

    const result =
      await AuthService.signInWithRemiliaAccessToken("fixture-token");
    expect(findHandle).toHaveBeenCalledTimes(2);
    expect(result.handle).toMatch(/^fixture__\w{6}$/);
    expect(createUser).toHaveBeenCalledWith(result);
    expect(createAuth).toHaveBeenCalledWith({
      userId: result.id,
      remiliaUsername: "fixture.user",
      remiliaDisplayName: "Fixture",
    });
    expect(batch).toHaveBeenCalledWith([userQuery, authQuery]);
  });
});
