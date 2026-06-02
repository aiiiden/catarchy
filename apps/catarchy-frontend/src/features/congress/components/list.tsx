import { useQuery } from "@tanstack/react-query";

import { InfoTable } from "@/features/common";

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
              <td align="left">{option.name}</td>
              <td align="right">
                {option.value}
                {option.unit && <> {option.unit}</>}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>{option.purpose}</td>
            </tr>
          </tbody>
        </InfoTable>
      ))}
    </div>
  );
}
