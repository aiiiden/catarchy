import { generateText, type LanguageModel } from "ai";
import { createAiGateway } from "ai-gateway-provider";
import { createUnified } from "ai-gateway-provider/providers/unified";

const CF_AI_GATEWAY_ACCOUNT_ID = "9e405c909176b2cab4c5a773ac033506";
const CF_AI_GATEWAY_NAME = "catarchy";
const MODEL_ID = "anthropic/claude-sonnet-4-5";

let _model: LanguageModel | null = null;

export const initAI = (anthropicApiKey: string) => {
  if (_model) return;

  const aiGateway = createAiGateway({
    accountId: CF_AI_GATEWAY_ACCOUNT_ID,
    gateway: CF_AI_GATEWAY_NAME,
  });
  const unified = createUnified({ apiKey: anthropicApiKey });

  _model = aiGateway(unified(MODEL_ID)) as LanguageModel;
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
