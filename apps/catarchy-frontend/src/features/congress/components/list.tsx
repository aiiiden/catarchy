import { useQuery } from "@tanstack/react-query";

import { InfoTable, Text } from "@/features/common";

import { allConsensusOptions } from "../services/consensus";
import styles from "./list.module.css";

export function ConsensusList() {
  const { data: consensus } = useQuery(allConsensusOptions());

  return (
    <div className={styles.list}>
      {consensus?.map((option) => (
        <InfoTable key={option.key} className={styles.table}>
          <tbody>
            <tr>
              <td align="left">
                <Text size="small">{option.name}</Text>
              </td>
              <td align="right">
                <Text size="small">
                  {option.value}
                  {option.unit && <> {option.unit}</>}
                </Text>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <Text>{option.purpose}</Text>
              </td>
            </tr>
          </tbody>
        </InfoTable>
      ))}
    </div>
  );
}
