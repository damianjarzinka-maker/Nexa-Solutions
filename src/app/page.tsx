import { Navbar } from "@/components/Navbar";
import { BallHeroReveal } from "@/components/ballhero/BallHeroReveal";
import { ScrollTextReveal } from "@/components/ScrollTextReveal";
import { Services } from "@/components/Services";
import { EposLeistungen } from "@/components/EposLeistungen";
import { Statement } from "@/components/Statement";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { LithosHero } from "@/components/ui/lithos-hero";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <BallHeroReveal />
      <ScrollTextReveal />
      <Services />
      <Statement />
      <EposLeistungen />
      <About />
      <Contact />
      <Footer />
      <LithosHero />
    </main>
  );
}
