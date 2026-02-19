import { getHomepageData } from "@/lib/queries/homepage";

export function TopCasinosList() {
  const { topCasinos } = getHomepageData();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Top casinos</h2>
          <p className="mt-1 text-sm text-gray-600">Ranked by free spins offers, trust & player reviews</p>
        </div>
        <div className="text-xs text-gray-500">
          Updated daily • Verified by our team
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {topCasinos.map((c, idx) => (
          <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white text-sm font-bold">
                {idx + 1}
              </div>

              <div className="h-12 w-32 rounded overflow-hidden bg-white flex items-center justify-center p-2 border border-gray-200">
                <img
                  src={`/images/casinos/${c.id}.svg`}
                  alt={`${c.name} logo`}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>✓ Ozow & SID</li>
                  <li>✓ Fast payouts</li>
                  <li>✓ Mobile friendly</li>
                </ul>
              </div>

              <a
                href={c.affiliateLink}
                target="_blank"
                rel="noreferrer"
                className="ml-auto rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white"
              >
                Play Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
