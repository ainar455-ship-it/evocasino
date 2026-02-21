import raw from "../casinos.json";
import { CasinosSchema } from "../schema/casinos";
import type { Casino } from "../schema";

/**
 * Single entrypoint for casinos SSOT.
 * Guardrail: do NOT import casinos.json directly anywhere else.
 */
export function loadCasinos(): Casino[] {
  const parsed = CasinosSchema.safeParse(raw);

  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error("❌ SSOT validation failed: src/data/evocasino/casinos.json");
    // eslint-disable-next-line no-console
    console.error(parsed.error.flatten());
    throw new Error("SSOT validation failed for casinos.json");
  }

  // Parsed data now matches the Casino shape from schema.ts
  return parsed.data as Casino[];
}
