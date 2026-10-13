import { CatCharacter, cn, InfoTable, Text } from "@/features/common";

import { formatAge } from "../lib/format-age";
import { getCareRecords } from "../services/care-record";
import styles from "./care-history-item.module.css";

type CareRecord = NonNullable<
  Awaited<ReturnType<typeof getCareRecords>>
>["items"][number];

export function CareHistoryItem({ record }: { record: CareRecord }) {
  return (
    <InfoTable containerClassName={styles.table}>
      <tbody>
        <tr>
          <td colSpan={3}>
            <Text size="xsmall">
              {record?.caredAt
                ? new Date(record.caredAt).toLocaleString()
                : "Unknown Date"}
            </Text>
          </td>
        </tr>
        <tr>
          <td rowSpan={2} className={cn(styles.characterCell, "bg-dither-1")}>
            <CatCharacter age={record.growth.ageGroup} scale={2} />
          </td>
          <th align="left">
            <Text size="small">{record.emotion.emoji} MOOD</Text>
          </th>
          <td align="right">
            <Text size="small">{record.emotion.level.toUpperCase()}</Text>
          </td>
        </tr>
        <tr>
          <th align="left">
            <Text size="small">🎂 AGE</Text>
          </th>
          <td align="right">
            <Text size="small">
              {formatAge({
                int: record.growth.age.int,
                fraction: record.growth.age.fraction,
              })}
            </Text>
            <Text size="small" className={styles.delta}>
              (
              {record.growth.delta > 0
                ? `+ ${formatAge({
                    int: Math.floor(record.growth.delta / 12),
                    fraction: {
                      numerator: record.growth.delta % 12,
                      denominator: record.growth.age.fraction.denominator,
                    },
                  })}`
                : formatAge({
                    int: record.growth.delta,
                    fraction: {
                      numerator: 0,
                      denominator: record.growth.age.fraction.denominator,
                    },
                  })}
              )
            </Text>
            <br />
            <Text size="small">{record.growth.ageGroup.toUpperCase()}</Text>
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <Text as="p" className={styles.message}>
              {record.message ?? "No message"}
            </Text>
          </td>
        </tr>
      </tbody>
    </InfoTable>
  );
}
