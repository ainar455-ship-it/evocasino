type Props = {
  variant?: "hub" | "casino" | "bonuses" | "game";
};

export default function RankingExplainer({ variant = "hub" }: Props) {
  const title =
    variant === "casino"
      ? "How this Evolution ranking works"
      : variant === "bonuses"
      ? "How we evaluate Evolution bonuses"
      : variant === "game"
      ? "How we rank casinos for this Evolution game"
      : "How we rank Evolution casinos";

  return (
    <section style={{ marginTop: 28 }}>
      <h2>{title}</h2>

      <p style={{ marginTop: 10 }}>
        EvoCasino ranks casinos based on <strong>fit for Evolution Live Games</strong> — not “best casino overall”.
      </p>

      <ul style={{ marginTop: 10, paddingLeft: 18 }}>
        <li>
          <strong>Evolution Score (0–100)</strong> is calculated from documented casino facts (e.g. Evolution shows offered,
          payout speed, mobile experience, payment support).
        </li>
        <li>
          <strong>No manual ranking</strong>: we don’t store rank order, score overrides, or editorial weights in the dataset.
        </li>
        <li>
          <strong>Dated facts</strong>: every data point carries the date it was last checked, so you can see how current it is.
        </li>
      </ul>

      <p style={{ marginTop: 10, opacity: 0.85 }}>
        Note: we don’t publish generic “best casino overall” or “highest bonus” rankings — only Evolution relevance. Availability depends on your country; check that a casino is licensed and legal where you live.
      </p>
    </section>
  );
}
