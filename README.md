# Palisec examples

[![CI](https://github.com/palisec/examples/actions/workflows/ci.yml/badge.svg)](https://github.com/palisec/examples/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Working examples of agents that ask [Palisec](https://palisec.tech) before they act, using the published [`@palisec/sdk`](https://www.npmjs.com/package/@palisec/sdk).

| Folder | What |
|---|---|
| [`plain/`](plain/evaluate.ts) | No framework: a dry-run evaluation of a transfer, with every check and its reason |
| [`vercel-ai/`](vercel-ai/tools.ts) | Palisec's tools for the Vercel AI SDK (`generateText` / `streamText`) |
| [`openai-agents/`](openai-agents/tools.ts) | Palisec's tools for the OpenAI Agents SDK |
| [`langgraph/`](langgraph/tools.ts) | Palisec's tools for LangGraph / LangChain |
| [`mcp/`](mcp/README.md) | Palisec's MCP server, for any MCP client |

## Run

```sh
npm install
export PALISEC_API_KEY=ps_test_...   # from Console → Agents → Create key; ps_test_ = Robinhood Chain testnet
npx tsx plain/evaluate.ts
```

Testnet by default: a `ps_test_` key only ever works on Robinhood Chain testnet (46630). Keys are read from the environment; none are in this repository.

```ts
import { createPalisec } from "@palisec/sdk";
import { generateText } from "ai";
import { palisecTools } from "./vercel-ai/tools";

const palisec = createPalisec({ apiKey: process.env.PALISEC_API_KEY! });
const { text } = await generateText({
  model, // your model
  tools: palisecTools(palisec),
  prompt: "Can I send 0.01 ETH to 0x000000000000000000000000000000000000dEaD?",
});
```

`npm test` checks every adapter offline (no network, no keys). Docs: [palisec.tech/docs](https://palisec.tech/docs) · [SDK](https://palisec.tech/docs/sdk) · [reason codes](https://palisec.tech/docs/errors)
