import { Navbar } from "@/components/layout-v1/sections/Navbar";
import { DisclosureBar } from "@/components/layout-v1/sections/DisclosureBar";
import { Hero } from "@/components/layout-v1/sections/Hero";
import { TopCasinosList } from "@/components/layout-v1/sections/TopCasinosList";

export default function Page() {
  return (
    <>
      <Navbar />
      <DisclosureBar />
      <Hero />
      <TopCasinosList />
    </>
  );
}
