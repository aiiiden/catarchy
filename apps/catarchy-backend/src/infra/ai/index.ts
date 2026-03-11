import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText, type LanguageModel } from "ai";

const MODEL_ID = "claude-haiku-4-5-20251001";

let _model: LanguageModel | null = null;

export const initAI = (apiKey: string) => {
  if (_model) return;
  _model = createAnthropic({ apiKey })(MODEL_ID);
};

const getModel = (): LanguageModel => {
  if (!_model) throw new Error("AI not initialized — call initAI first");
  return _model;
};

async function ask(
  params: Omit<Parameters<typeof generateText>[0], "model">,
): Promise<Awaited<ReturnType<typeof generateText>>> {
  return generateText({ model: getModel(), ...params } as Parameters<
    typeof generateText
  >[0]);
}

export const claude = { ask };
