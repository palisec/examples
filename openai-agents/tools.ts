/**
 * Palisec's tools for the OpenAI Agents SDK: `new Agent({ name, instructions, tools: palisecTools(palisec) })`.
 */
import { createPalisecTools, type PalisecClient } from "@palisec/sdk";
import { tool } from "@openai/agents";

export function palisecTools(palisec: PalisecClient) {
  return createPalisecTools(palisec).map((t) =>
    tool({
      name: t.name,
      description: t.description,
      parameters: t.parameters as never,
      strict: false,
      execute: async (input) => t.execute(input as Record<string, unknown>),
    }),
  );
}
