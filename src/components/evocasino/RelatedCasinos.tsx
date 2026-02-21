import Link from "next/link";
import type { Casino } from "@/data/evocasino/schema";

type Props = {
  title?: string;
  items: Casino[];
};

export default function RelatedCasinos({ title = "Related casinos for Evolution players", items }: Props) {
  if (!items?.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">{title}</h2>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <li key={c.slug} className="rounded-lg border p-4">
            <div className="font-medium">{c.name}</div>
            <div className="mt-2 flex gap-3 text-sm">
              <Link className="underline" href={`/casinos/${c.slug}`}>
                Review
              </Link>
              <a className="underline" href={c.brandUrl} rel="nofollow noopener" target="_blank">
                Visit
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
