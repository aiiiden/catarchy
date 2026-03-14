import { InferSelectModel } from "drizzle-orm";
import { catPersonality } from "../../../infra/db";
import {
  AGE_DESCRIPTION,
  AgeGroup,
  type AgeGroup as AgeGroupType,
} from "../constants/growth";

interface CarePromptParams {
  catName: string;
  mood: string;
  ageGroup: AgeGroupType;
  personality?: InferSelectModel<typeof catPersonality> | null;
}

export function buildCarePrompt({
  catName,
  mood,
  ageGroup,
  personality,
}: CarePromptParams) {
  // Determine if cat is in adult or mature stage (growth >= 240)
  const isAdultOrMature = [
    AgeGroup.ADULT,
    AgeGroup.MATURE,
    AgeGroup.SENIOR,
  ].includes(ageGroup as AgeGroup);

  const actionsDescription = isAdultOrMature
    ? `- Describe the cat-anthro doing human-like activities and behaviors naturally based on the cat's personality.`
    : `- Describe the cat's varied behaviors and actions naturally based on the cat's personality.`;

  const examplesText = isAdultOrMature
    ? `Examples:
- "${catName} sits at the desk with a book and takes notes."
- "${catName} takes a break and stretches after studying."
- "${catName} plays a game to relax and clear the mind."`
    : `Examples:
- "${catName} curls up contentedly and purrs."
- "${catName} suddenly darts across the room with energy."
- "${catName} watches intently from the window."`;

  return {
    system: `You are a cat behavior simulator in Catarchy.

Describe the cat's reaction to care in only 1~2 sentence.
- Third person
- Short and simple. Minimize adjectives and adverbs.
- Simple English. No idioms, slang, or uncommon words.
- Never use the word "care" in the output.
${actionsDescription}

${examplesText}

Personality: Big Five (0-100). Higher = stronger.

Age: ${ageGroup} - ${AGE_DESCRIPTION[ageGroup]}`,
    prompt: `${catName}, mood:${mood}, age:${ageGroup}${personality ? `, openness:${personality.openness} conscientiousness:${personality.conscientiousness} extraversion:${personality.extraversion} agreeableness:${personality.agreeableness} neuroticism:${personality.neuroticism}` : ""}`,
  };
}
