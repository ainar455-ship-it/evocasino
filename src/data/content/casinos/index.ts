import { jabulabets } from "./jabulabets";
import { spinwin } from "./spinwin";
import type { Casino } from "@/data/types/casino";

export const casinos: Casino[] = [jabulabets, spinwin];

export const casinosBySlug: Record<string, Casino> = {};
for (const casino of casinos) {
  casinosBySlug[casino.slug] = casino;
}
