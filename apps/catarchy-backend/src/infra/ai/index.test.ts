import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";

import { ai, initAI } from "./index";

initAI({
  anthropicApiKey: "fixture-anthropic",
  openaiApiKey: "fixture-openai",
});

afterEach(() => mock.restore());

describe("AI SDK provider compatibility", () => {
  test("forwards instructions through Cloudflare Gateway and reads generated text", async () => {
    const fetchGateway = spyOn(globalThis, "fetch").mockResolvedValue(
      Response.json({
        id: "fixture-response",
        created_at: 0,
        model: "gpt-4.1-nano",
        output: [
          {
            type: "message",
            id: "fixture-message",
            role: "assistant",
            content: [
              {
                type: "output_text",
                text: "momo purrs contentedly.",
                annotations: [],
              },
            ],
          },
        ],
        usage: { input_tokens: 10, output_tokens: 5, total_tokens: 15 },
      }),
    );

    const result = await ai.ask("openai/gpt-4.1-nano", {
      instructions: "Describe a cat's behavior.",
      prompt: "momo, mood:happy",
      maxOutputTokens: 50,
      maxRetries: 0,
    });

    expect(result.text).toBe("momo purrs contentedly.");
    expect(fetchGateway).toHaveBeenCalledTimes(1);
    const [url, request] = fetchGateway.mock.calls[0]!;
    expect(String(url)).toStartWith("https://gateway.ai.cloudflare.com/v1/");
    const [entry] = JSON.parse(String(request?.body));
    expect(entry.provider).toBe("openai");
    expect(entry.query.model).toBe("gpt-4.1-nano");
    expect(JSON.stringify(entry.query)).toContain("Describe a cat's behavior.");
    expect(entry.query.max_output_tokens).toBe(50);
  });

  test("rejects an unconfigured provider before making a request", async () => {
    const fetchProvider = spyOn(globalThis, "fetch");

    await expect(
      ai.ask("alibaba/qwen3.5-flash", { prompt: "fixture" }),
    ).rejects.toThrow("No API key configured for provider: alibaba");
    expect(fetchProvider).not.toHaveBeenCalled();
  });
});
