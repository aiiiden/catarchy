import { isAuthenticated, useSignOut } from "@/features/auth";
import { useCare, useSummonCat, type SummonCatParams } from "@/features/cat";
import {
  Button,
  GlobalLoading,
  Scaffold,
  TextInput,
  sleep,
} from "@/features/common";
import { api } from "@/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/play")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
  async loader() {
    const [me, cat] = await Promise.all([
      api.user.me.get(),
      api.cat.get(),
      sleep(2), // minimum loading time
    ]);
    return { me, cat };
  },
  component: PlayPage,
  pendingComponent: () => <GlobalLoading />,
});

function PlayPage() {
  const { me, cat } = Route.useLoaderData();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const handleSignOut = () => {
    signOut.mutate(undefined, {
      onSettled: () => navigate({ to: "/login" }),
    });
  };

  return (
    <>
      <Scaffold>
        <Scaffold.Body className="flex flex-col gap-4 p-4">
          <nav className="flex justify-end">
            <button type="button" onClick={handleSignOut}>
              Logout
            </button>
          </nav>

          {me.data && (
            <section className="border-round p-4">
              <h2 className="mb-2">User</h2>
              <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                <dt className="underline">Handle</dt>
                <dd className="m-0">{me.data.handle}</dd>
                <dt className="underline">Email</dt>
                <dd className="m-0">{me.data.email ?? "-"}</dd>
              </dl>
            </section>
          )}

          {cat.data === null ? (
            <SummonSection />
          ) : cat.data ? (
            <>
              <section className="border-round p-4">
                <h2 className="mb-2">Cat</h2>
                <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                  <dt className="underline">Name</dt>
                  <dd className="m-0">{cat.data?.name}</dd>
                  <dt className="underline">Last Cared At</dt>
                  <dd className="m-0">
                    {"lastCaredAt" in cat.data && cat.data.lastCaredAt
                      ? String(cat.data.lastCaredAt)
                      : "Never"}
                  </dd>
                </dl>
              </section>

              <section className="border-round p-4">
                <h2 className="mb-2">Stats</h2>
                <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                  <dt className="underline">Growth</dt>
                  <dd className="m-0">{cat.data?.stat.growth}</dd>
                  <dt className="underline">Emotion</dt>
                  <dd className="m-0">{cat.data?.stat.emotion}</dd>
                </dl>
              </section>
            </>
          ) : null}
        </Scaffold.Body>
        <Scaffold.Bottom>
          <CareAction />
        </Scaffold.Bottom>
      </Scaffold>
    </>
  );
}

function SummonSection() {
  const summon = useSummonCat();

  const form = useForm<SummonCatParams>({
    mode: "onSubmit",
    shouldFocusError: true,
    criteriaMode: "firstError",
    defaultValues: { name: "" },
    resolver: zodResolver(
      z.object({
        name: z.string().min(1, "Name is required").max(20),
      }),
    ),
  });

  const handleSubmit = (params: SummonCatParams) => {
    summon.mutate(params);
  };

  return (
    <section className="border-round p-4">
      <h2 className="mb-2">Summon Your Cat</h2>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-3"
      >
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="Name"
              maxLength={20}
              required
              error={fieldState.error?.message}
            />
          )}
        />
        {summon.error && <p>{String(summon.error)}</p>}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={summon.isPending}
        >
          {summon.isPending ? "Summoning..." : "Summon"}
        </Button>
      </form>
    </section>
  );
}

function CareAction() {
  const care = useCare();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [message, setMessage] = useState("");
  const [displayIndex, setDisplayIndex] = useState(0);

  const handleCare = () => {
    care.mutate(undefined, {
      onSuccess: (data) => {
        setMessage(data.message);
        setDisplayIndex(0);
        dialogRef.current?.showModal();
      },
      onError: (error) => {
        const msg = JSON.stringify(error);
        alert(msg);
      },
    });
  };

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    setMessage("");
    setDisplayIndex(0);
  }, []);

  useEffect(() => {
    if (!message || displayIndex >= message.length) return;
    const timer = setTimeout(() => setDisplayIndex((i) => i + 1), 50);
    return () => clearTimeout(timer);
  }, [message, displayIndex]);

  return (
    <>
      <Button
        variant="primary"
        fullWidth
        onClick={handleCare}
        disabled={care.isPending}
      >
        {care.isPending ? "Caring..." : "Care"}
      </Button>

      <dialog
        ref={dialogRef}
        className="border-round backdrop:bg-gradient-mono-8 fixed top-1/2 left-1/2 w-full max-w-80 -translate-x-1/2 -translate-y-1/2 bg-transparent focus:outline-none"
      >
        <div className="bg-white p-6">
          <p className="min-h-12 leading-relaxed">
            {message.slice(0, displayIndex)}
          </p>
          {displayIndex >= message.length && message.length > 0 && (
            <Button
              variant="secondary"
              onClick={closeDialog}
              className="mt-3"
              fullWidth
            >
              Close
            </Button>
          )}
        </div>
      </dialog>
    </>
  );
}
