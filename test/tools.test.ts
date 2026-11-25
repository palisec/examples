// Offline checks: every adapter turns Palisec's tools into the framework's own tool type (no network, no keys).
import { createPalisec, createPalisecTools } from "@palisec/sdk";
import { describe, expect, it } from "vitest";
import { palisecTools as langgraph } from "../langgraph/tools";
import { palisecTools as openai } from "../openai-agents/tools";
import { palisecTools as vercel } from "../vercel-ai/tools";

const palisec = createPalisec({ apiKey: "ps_test_" + "0".repeat(48) /* format only: offline, never sent */ });
const names = ["palisec_evaluate_transaction", "palisec_get_operation", "palisec_explain_reason_code"];

describe("framework adapters", () => {
  it("Vercel AI SDK", () => expect(Object.keys(vercel(palisec))).toEqual(expect.arrayContaining(names)));
  it("OpenAI Agents SDK", () => expect(openai(palisec).map((t) => t.name)).toEqual(expect.arrayContaining(names)));
  it("LangGraph", () => expect(langgraph(palisec).map((t) => t.name)).toEqual(expect.arrayContaining(names)));
  it("explains a reason code without a network call", async () => {
    const explain = createPalisecTools(palisec).find((t) => t.name === "palisec_explain_reason_code")!;
    expect(await explain.execute({ code: "PS_BUDGET_001" })).toContain("PS_BUDGET_001");
  });
});
