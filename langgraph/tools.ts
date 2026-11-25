/**
 * Palisec's tools for LangGraph (LangChain tools): use them in a ToolNode or `createReactAgent({ llm, tools })`.
 */
import { createPalisecTools, type PalisecClient } from "@palisec/sdk";
import { tool } from "@langchain/core/tools";

export function palisecTools(palisec: PalisecClient) {
  return createPalisecTools(palisec).map((t) =>
    tool(async (input: Record<string, unknown>) => t.execute(input), {
      name: t.name,
      description: t.description,
      schema: t.parameters,
    }),
  );
}
