import { getAccessToken, useSignOut } from "@/features/auth";
import { useCare, useCat, useSummonCat } from "@/features/cat";
import { Button, Scaffold } from "@/features/common";
import { useMe } from "@/features/user";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/play")({
  beforeLoad: () => {
    if (!getAccessToken()) {
      throw redirect({ to: "/login" });
    }
  },
  component: PlayPage,
});

function PlayPage() {
  const navigate = useNavigate();
  const me = useMe();
  const cat = useCat();
  const signOut = useSignOut();

  const handleSignOut = () => {
    signOut.mutate(undefined, {
      onSettled: () => navigate({ to: "/login" }),
    });
  };

  if (me.isLoading || cat.isLoading) {
    return (
      <Scaffold>
        <Scaffold.Body>
          <p>Loading...</p>
        </Scaffold.Body>
      </Scaffold>
    );
  }

  return (
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
                <dd className="m-0">{cat.data.name}</dd>
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
                <dd className="m-0">{cat.data.stat.growth}</dd>
                <dt className="underline">Emotion</dt>
                <dd className="m-0">{cat.data.stat.emotion}</dd>
              </dl>
            </section>

            <CareSection />
          </>
        ) : null}
      </Scaffold.Body>
    </Scaffold>
  );
}

function SummonSection() {
  const [name, setName] = useState("");
  const summon = useSummonCat();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    summon.mutate({ name });
  };

  return (
    <section className="border-round p-4">
      <h2 className="mb-2">Summon Your Cat</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>
          Name
          <input
            type="text"
            required
            maxLength={20}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-round mt-1 box-border block w-full px-2 py-1.5"
          />
        </label>
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

function CareSection() {
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
    const timer = setTimeout(() => setDisplayIndex((i) => i + 1), 90);
    return () => clearTimeout(timer);
  }, [message, displayIndex]);

  return (
    <>
      <Scaffold.Bottom sticky>
        <Button
          variant="primary"
          fullWidth
          onClick={handleCare}
          disabled={care.isPending}
        >
          {care.isPending ? "Caring..." : "Care"}
        </Button>
      </Scaffold.Bottom>

      <dialog
        ref={dialogRef}
        className="border-round w-full max-w-80 p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDialog();
        }}
      >
        <p className="min-h-12 leading-relaxed">
          {message.slice(0, displayIndex)}
        </p>
        {displayIndex >= message.length && message.length > 0 && (
          <button type="button" onClick={closeDialog} className="mt-3">
            Close
          </button>
        )}
      </dialog>
    </>
  );
}
