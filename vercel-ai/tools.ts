/**
 * Palisec's tools for the Vercel AI SDK: pass `palisecTools(palisec)` as `tools` to generateText or streamText.
 * The model can evaluate a transaction, read an operation and explain a reason code; with a wallet, it can
 * send only what Palisec allows.
 */
import { createPalisecTools, type PalisecClient } from "@palisec/sdk";
import { jsonSchema, tool, type Tool } from "ai";

export function palisecTools(palisec: PalisecClient): Record<string, Tool> {
  return Object.fromEntries(
    createPalisecTools(palisec).map((t) => [
      t.name,
      tool({
        description: t.description,
        inputSchema: jsonSchema<Record<string, unknown>>(t.parameters),
        execute: (input) => t.execute(input),
      }),
    ]),
  );
}
