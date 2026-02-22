import { loadCasinos } from "@/data/evocasino/loaders/casinos";
import { loadOffers } from "@/data/evocasino/loaders/offers";
import { loadPayments } from "@/data/evocasino/loaders/payments";
import { loadWithdrawalPolicies } from "@/data/evocasino/loaders/withdrawal-policies";

async function main() {
  // Hard-fail if any SSOT schema drifts
  await loadCasinos();
  await loadOffers();
  await loadPayments();
  await loadWithdrawalPolicies();

  console.log("✅ SSOT validation passed (casinos, offers, payments, withdrawal policies).");
}

main().catch((err) => {
  console.error("❌ SSOT validation failed.");
  console.error(err);
  process.exit(1);
});
