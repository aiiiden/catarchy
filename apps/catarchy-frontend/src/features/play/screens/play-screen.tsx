import { CatLoading, LogoText, Scaffold } from "@/features/common";

import { catInfoOptions } from "@/features/cat";
import { ConfigButton } from "@/features/config";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CareButton } from "../components/care-button";
import { Interface } from "../components/interface";
import { PlayMenu } from "../components/play-menu";
import styles from "./play-screen.module.css";

export function PlayScreen() {
  const { status } = useQuery(catInfoOptions());

  const isLoading = status === "pending";

  return (
    <Scaffold className="bg-pattern-cat">
      <Scaffold.Header
        title={<LogoText />}
        className={styles.headerNoBorder}
        // right={<PowerOffButton />}
        right={
          <Link to="/config">
            <ConfigButton />
          </Link>
        }
      />
      <Scaffold.Body className={styles.body}>
        <div className={styles.content}>
          <div className={styles.centerFlex}>
            {isLoading && <CatLoading />}
            {!isLoading && <Interface />}
          </div>
          <PlayMenu />
        </div>
      </Scaffold.Body>
      {!isLoading && (
        <Scaffold.Bottom sticky>
          <CareButton />
        </Scaffold.Bottom>
      )}
    </Scaffold>
  );
}
