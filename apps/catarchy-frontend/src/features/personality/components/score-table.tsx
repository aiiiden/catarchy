import { useQuery } from "@tanstack/react-query";

import { InfoTable, Text } from "@/features/common";

import { getCatPersonalityOptions } from "../services/personality";
import styles from "./score-table.module.css";

export function ScoreTable({ catId }: { catId: string }) {
  const { data, status: infoStatus } = useQuery(
    getCatPersonalityOptions({ catId }),
  );

  const isLoading = infoStatus === "pending";

  const formatscore = (score?: number | null) => {
    if (isLoading) return "Loading...";
    if (score == null) return "??????????";
    return `${score}/10 ` + "█".repeat(score) + "▒".repeat(10 - score);
  };

  return (
    <InfoTable className={styles.table}>
      <tbody>
        <tr>
          <th align="left">
            <Text size="small">Openness</Text>
          </th>
          <td align="right">
            <Text size="small">{formatscore(data?.openness)}</Text>
          </td>
        </tr>
        <tr>
          <th align="left">
            <Text size="small">Conscientiousness</Text>
          </th>
          <td align="right">
            <Text size="small">{formatscore(data?.conscientiousness)}</Text>
          </td>
        </tr>
        <tr>
          <th align="left">
            <Text size="small">Extraversion</Text>
          </th>
          <td align="right">
            <Text size="small">{formatscore(data?.extraversion)}</Text>
          </td>
        </tr>
        <tr>
          <th align="left">
            <Text size="small">Agreeableness</Text>
          </th>
          <td align="right">
            <Text size="small">{formatscore(data?.agreeableness)}</Text>
          </td>
        </tr>
        <tr>
          <th align="left">
            <Text size="small">Neuroticism</Text>
          </th>
          <td align="right">
            <Text size="small">{formatscore(data?.neuroticism)}</Text>
          </td>
        </tr>
      </tbody>
    </InfoTable>
  );
}
