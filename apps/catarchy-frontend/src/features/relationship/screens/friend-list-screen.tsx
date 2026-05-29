import { AgeGroup } from "@catarchy/shared/constants/cat";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { catInfoOptions, formatAge } from "@/features/cat";
import {
  CatCharacter,
  cn,
  HeaderBackButton,
  InfoTable,
  Scaffold,
  Text,
  useInfiniteScroll,
} from "@/features/common";

import { FriendListEmpty } from "../components/friend-list-empty";
import { friendListOptions } from "../services/friend";
import styles from "./friend-list-screen.module.css";

export function FriendListScreen({ catId }: { catId: string }) {
  const { data: catInfo } = useQuery(catInfoOptions(catId));

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    friendListOptions({
      catId,
      limit: 5,
    }),
  );

  const { loadMoreRef } = useInfiniteScroll({
    fetchNextPage: () => fetchNextPage(),
    hasNextPage,
  });

  const hasNoFriends = data?.pages[0]?.count === 0;

  return (
    <Scaffold>
      <Scaffold.Header title="Friends" left={<HeaderBackButton />} />
      <Scaffold.Body className={cn("bg-pattern-cat", styles.body)}>
        <div className={styles.listContainer}>
          {hasNoFriends && <FriendListEmpty catName={catInfo?.name} />}
          {data?.pages.map((page) =>
            page?.items.map((friend) => (
              <InfoTable key={friend.id} className={styles.table}>
                <tbody>
                  <tr>
                    <td colSpan={3} align="center">
                      <div className={styles.catNameCell}>
                        <Text as="p" className={cn(styles.catName)}>
                          {friend.catName}
                        </Text>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan={3} align="center" className={"bg-dither-1"}>
                      <div className={styles.catCharacter}>
                        <CatCharacter age={friend.growth.ageGroup} scale={2} />
                      </div>
                    </td>
                    <th align="left">AGE</th>
                    <td align="right">{formatAge(friend.growth.age)}</td>
                  </tr>
                  <tr>
                    <th align="left">MOOD</th>
                    <td align="right">{friend.emotion.emoji}</td>
                  </tr>
                  <tr>
                    <th align="left">BE FRIEND SINCE...</th>
                    <td align="right">
                      {friend.updatedAt
                        ? new Date(friend.updatedAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </InfoTable>
            )),
          )}
          {hasNextPage && (
            <div ref={loadMoreRef} className={styles.loadMore}>
              <CatCharacter age={AgeGroup.ADULT} scale={1} tag="walk" />
            </div>
          )}
        </div>
      </Scaffold.Body>
    </Scaffold>
  );
}
