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
  {
    slug: "monopoly-live",
    title: "Monopoly Live on Evolution Live",
    intent: "show:monopoly-live",
  },
  {
    slug: "dream-catcher",
    title: "Dream Catcher on Evolution Live",
    intent: "show:dream-catcher",
  },
  {
    slug: "lightning-dice",
    title: "Lightning Dice on Evolution Live",
    intent: "show:lightning-dice",
  },
  {
    slug: "crazy-coin-flip",
    title: "Crazy Coin Flip on Evolution Live",
    intent: "show:crazy-coin-flip",
  },
] as const satisfies readonly GuideRegistryEntry[];
