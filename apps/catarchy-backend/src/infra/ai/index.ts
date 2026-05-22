import { createAlibaba } from "@ai-sdk/alibaba";
import type { GatewayModelId } from "@ai-sdk/gateway";
import { generateText, type LanguageModel } from "ai";
import { createAiGateway } from "ai-gateway-provider";
import { createAnthropic } from "ai-gateway-provider/providers/anthropic";
import { createDeepSeek } from "ai-gateway-provider/providers/deepseek";
import { createGoogleGenerativeAI } from "ai-gateway-provider/providers/google";
import { createMistral } from "ai-gateway-provider/providers/mistral";
import { createOpenAI } from "ai-gateway-provider/providers/openai";
import { createXai } from "ai-gateway-provider/providers/xai";

const CF_AI_GATEWAY_ACCOUNT_ID = "9e405c909176b2cab4c5a773ac033506";
const CF_AI_GATEWAY_NAME = "catarchy";

type AiGateway = ReturnType<typeof createAiGateway>;

let _aiGateway: AiGateway | null = null;
const _providers: Record<string, (modelId: string) => LanguageModel> = {};

export interface AiConfig {
  anthropicApiKey: string;
  openaiApiKey?: string;
  googleAiApiKey?: string;
  mistralApiKey?: string;
  alibabaApiKey?: string;
  xaiApiKey?: string;
  deepseekApiKey?: string;
}

export const initAI = (config: AiConfig) => {
  if (_aiGateway) return;

  _aiGateway = createAiGateway({
    accountId: CF_AI_GATEWAY_ACCOUNT_ID,
    gateway: CF_AI_GATEWAY_NAME,
  });

  const anthropic = createAnthropic({ apiKey: config.anthropicApiKey });
  _providers.anthropic = (id) => _aiGateway?.(anthropic(id)) as LanguageModel;

  if (config.openaiApiKey) {
    const openai = createOpenAI({ apiKey: config.openaiApiKey });
    _providers.openai = (id) => _aiGateway?.(openai(id)) as LanguageModel;
  }

  if (config.googleAiApiKey) {
    const google = createGoogleGenerativeAI({ apiKey: config.googleAiApiKey });
    _providers.google = (id) => _aiGateway?.(google(id)) as LanguageModel;
  }

  if (config.mistralApiKey) {
    const mistral = createMistral({ apiKey: config.mistralApiKey });
    _providers.mistral = (id) => _aiGateway?.(mistral(id)) as LanguageModel;
  }

  if (config.alibabaApiKey) {
    // Alibaba/Qwen models use the Vercel AI SDK with direct API support
    // Model format: "alibaba/qwen3.5-flash" or similar
    const alibaba = createAlibaba({
      apiKey: config.alibabaApiKey,
    });
    _providers.alibaba = (id) => alibaba(id) as LanguageModel;
  }

  if (config.xaiApiKey) {
    const xai = createXai({ apiKey: config.xaiApiKey });
    _providers.xai = (id) => _aiGateway?.(xai(id)) as LanguageModel;
  }

  if (config.deepseekApiKey) {
    const deepseek = createDeepSeek({ apiKey: config.deepseekApiKey });
    _providers.deepseek = (id) => _aiGateway?.(deepseek(id)) as LanguageModel;
  }
};

function getModel(modelId: GatewayModelId): LanguageModel {
  if (!_aiGateway) throw new Error("AI not initialized — call initAI first");

  const provider = modelId.split("/")[0];
  const model = modelId.split("/").slice(1).join("/");
  const createModel = _providers[provider];
  if (!createModel)
    throw new Error(`No API key configured for provider: ${provider}`);

  return createModel(model);
}

async function ask(
  modelId: GatewayModelId,
  params: Omit<Parameters<typeof generateText>[0], "model">,
): Promise<Awaited<ReturnType<typeof generateText>>> {
  return generateText({ model: getModel(modelId), ...params } as Parameters<
    typeof generateText
  >[0]);
}

export const ai = { ask };
