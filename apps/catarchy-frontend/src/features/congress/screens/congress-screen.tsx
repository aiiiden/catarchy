import { HeaderBackButton, Scaffold } from "@/features/common";

import { Header } from "../components/header";
import { ConsensusList } from "../components/list";
import { Visual } from "../components/visual";
import styles from "./congress-screen.module.css";

export function ConsensusScreen() {
  return (
    <Scaffold>
      <Scaffold.Header title="Congress" left={<HeaderBackButton />} />
      <Scaffold.Body className={styles.body}>
        <Visual />
        <Header />
        <ConsensusList />
      </Scaffold.Body>
    </Scaffold>
  );
}
