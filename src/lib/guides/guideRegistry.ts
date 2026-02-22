export type GuideIntent =
  | `show:${string}`
  | `payment:${string}`
  | `payout:${string}`
  | `mobileMin:${string}`;

export type GuideRegistryEntry = Readonly<{
  slug: string;
  /**
   * Must be exactly "{Topic} on Evolution Live"
   * H1 is derived as: `${title} – Best Casinos & How to Play`
   */
  title: string;
  /**
   * Routing/filter intent key ONLY.
   * No content, no casino lists, no scoring hints.
   */
  intent: GuideIntent;
}>;

export const GUIDE_H1_SUFFIX = " – Best Casinos & How to Play" as const;

export const guideRegistry = [
  {
    slug: "crazy-time",
    title: "Crazy Time on Evolution Live",
    intent: "show:crazy-time",
  },
  {
    slug: "lightning-roulette",
    title: "Lightning Roulette on Evolution Live",
    intent: "show:lightning-roulette",
  },
] as const satisfies readonly GuideRegistryEntry[];
