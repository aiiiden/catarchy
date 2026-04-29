import { api, Button, LogoText, Scaffold, Text } from "@/features/common";
import { useMe } from "@/features/user/services/useMe";
import { useRouter } from "@tanstack/react-router";
import { Interface } from "../components/interface";

export function PlayScreen() {
  const router = useRouter();
  const { data } = useMe();

  const handleLogout = async () => {
    await api.auth["sign-out"].post();
    await router.navigate({
      to: "/",
    });
  };

  return (
    <Scaffold className="bg-gradient-pattern-cat">
      <Scaffold.Header
        title={<LogoText />}
        className="border-none"
        right={
          <button className="size-8" onClick={handleLogout}>
            <Text boxTrim>⏻</Text>
          </button>
        }
      />
      <Scaffold.Body className="justify-center-safe">
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-center">
            <Interface />
          </div>
        </div>
      </Scaffold.Body>
      <Scaffold.Bottom sticky>
        <Button disabled>Check</Button>
      </Scaffold.Bottom>
    </Scaffold>
  );
}
