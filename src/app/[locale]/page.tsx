import Hero from "@/components/sections/Hero";
import SignalBand from "@/components/sections/SignalBand";
import WorkPreview from "@/components/sections/WorkPreview";
import Philosophy from "@/components/sections/Philosophy";
import Capabilities from "@/components/sections/Capabilities";
import Process from "@/components/sections/Process";
import ClosingCTA from "@/components/sections/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignalBand />
      <WorkPreview />
      <Philosophy />
      <Capabilities />
      <Process />
      <ClosingCTA />
    </>
  );
}
