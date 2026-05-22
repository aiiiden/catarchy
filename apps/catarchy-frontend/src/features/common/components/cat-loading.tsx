import { AgeGroup } from "@catarchy/shared/constants/cat";

import { CatCharacter } from "./cat-character";
import styles from "./cat-loading.module.css";
import { Text } from "./text";

export function CatLoading() {
  return (
    <div className={styles.container}>
      <CatCharacter age={AgeGroup.ADULT} tag="walk" />
      <Text>Loading...</Text>
    </div>
  );
}
