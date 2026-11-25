/**
 * Ask Palisec before acting, with no framework: a dry-run evaluation of a transfer.
 * Run: PALISEC_API_KEY=ps_test_... npx tsx plain/evaluate.ts
 * A ps_test_ key works on Robinhood Chain testnet (46630). Nothing is signed or sent.
 */
import { createPalisec } from "@palisec/sdk";

const apiKey = process.env.PALISEC_API_KEY;
if (!apiKey) throw new Error("Set PALISEC_API_KEY (Console → Agents → Create key). Use a ps_test_ key for testnet.");

const palisec = createPalisec({ apiKey });

const op = await palisec.evaluate({
  to: "0x000000000000000000000000000000000000dEaD",
  value: 1_000_000_000_000n, // 0.000001 ETH
});

console.log(op.decision, op.reasonCode ?? "", op.message);
for (const c of op.checks ?? []) console.log(`  ${c.status.padEnd(7)} ${c.label}`);
