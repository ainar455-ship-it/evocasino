import { loadCasinos } from "@/data/evocasino/loaders/casinos";

async function main() {
  // Hard-fail if SSOT schema drifts (only loaders that exist on main)
  await loadCasinos();
  console.log("✅ SSOT validation passed (casinos).");
}

main().catch((err) => {
  console.error("❌ SSOT validation failed.");
  console.error(err);
  process.exit(1);
});
