import { Text } from "@/features/common";

import styles from "./friend-list-empty.module.css";

export function FriendListEmpty({ catName }: { catName?: string }) {
  return (
    <div className={styles.container}>
      <Text as="p" className={styles.message}>
        {catName} have no friends yet 😢
      </Text>
      <Text as="p" className={styles.message}>
        But if you take good care of {catName}, your cat will be able to find
        more friends!
      </Text>
    </div>
  );
}
