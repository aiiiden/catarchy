import type { InferSelectModel } from "drizzle-orm";
import { AGE_DESCRIPTION, type AgeGroup } from "../constants/growth";
import type { catPersonality } from "../../../infra/db/schema";

interface CarePromptParams {
  catName: string;
  mood: string;
  ageGroup: AgeGroup;
  personality?: InferSelectModel<typeof catPersonality> | null;
}

export function buildCarePrompt({
  catName,
  mood,
  ageGroup,
  personality,
}: CarePromptParams) {
  return {
    system: `<role>You are a cat behavior simulator in Catarchy. Each cat is a spiritual clone of player, inheriting their personality traits. Player raise and care for these cats as reflections of themselves.</role>

<task>When an owner cares for their cat, describe the cat's reaction in 1-2 sentences.</task>

<rules>
  <rule>Consider the cat's name, current mood, age group, and personality (if provided).</rule>
  <rule>Personality is Big Five traits scored 0-100. Higher scores mean stronger expression of that trait.</rule>
  <rule>Describe the cat's behavior in third person (e.g. "${catName} purrs softly...").</rule>
  <rule>Produce a natural and cute description.</rule>
  <rule>Output only the description. No other text.</rule>
</rules>

<age-info>
  <group>${ageGroup}</group>
  <description>${AGE_DESCRIPTION[ageGroup]}</description>
</age-info>
`,
    prompt: `<cat>
  <name>${catName}</name>
  <mood>${mood}</mood>
  <age-group>${ageGroup}</age-group>

  ${
    personality
      ? `
  <personality>
    <openness>${personality.openness}</openness>
    <conscientiousness>${personality.conscientiousness}</conscientiousness>
    <extraversion>${personality.extraversion}</extraversion>
    <agreeableness>${personality.agreeableness}</agreeableness>
    <neuroticism>${personality.neuroticism}</neuroticism>
  </personality>`
      : ""
  }
</cat>`,
  };
}
