export type PayoutSpeed = "fast" | "avg" | "slow";

export type EvolutionShow =
  | "crazy-time"
  | "monopoly-live"
  | "lightning-roulette"
  | "lightning-dice"
  | "dream-catcher"
  | "crazy-coin-flip";

export type PaymentMethod =
  | "ozow"
  | "sid"
  | "eft"
  | "visa"
  | "mastercard"
  | "bitcoin"
  | "usdt";

export type Casino = {
  id: string;
  slug: string;
  name: string;
  brandUrl: string;

  license?: string;
  markets: string[];

  evolution: {
    provider: "evolution";
    liveCasino: boolean;
    shows: EvolutionShow[];
    tablesApprox?: number;
    lastVerified: string;
  };

  payouts: {
    speed: PayoutSpeed;
    lastTested: string;
    notes?: string;
  };

  payments: {
    methods: PaymentMethod[];
    lastVerified: string;
  };

  mobile: {
    experience: 1 | 2 | 3 | 4 | 5;
    lastVerified: string;
  };

  bonuses?: {
    headline?: string;
    termsUrl?: string;
    wageringX?: number;
    lastVerified: string;
  };
};
