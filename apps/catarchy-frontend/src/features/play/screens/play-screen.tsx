import { PowerOffButton } from "@/features/auth";
import { api, Button, LogoText, Scaffold } from "@/features/common";
import { useMe } from "@/features/user/services/useMe";
import { useRouter } from "@tanstack/react-router";
import { Interface } from "../components/interface";
import styles from "./play-screen.module.css";

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
    <Scaffold className="bg-pattern-cat">
      <Scaffold.Header
        title={<LogoText />}
        className={styles.headerNoBorder}
        right={<PowerOffButton />}
      />
      <Scaffold.Body className={styles.body}>
        <div className={styles.content}>
          <div className={styles.centerFlex}>
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
