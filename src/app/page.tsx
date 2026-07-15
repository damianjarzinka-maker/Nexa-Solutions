import { Navbar } from "@/components/Navbar";
import { BallHeroReveal } from "@/components/ballhero/BallHeroReveal";
import { ScrollTextReveal } from "@/components/ScrollTextReveal";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// --- ARCHIVED (temporarily removed, re-enable by uncommenting here + below) ---
// import { Services } from "@/components/Services"; // images now live inside ScrollTextReveal
// import { Statement } from "@/components/Statement";
// import { EposLeistungen } from "@/components/EposLeistungen";
// import { About } from "@/components/About";
// import { LithosHero } from "@/components/ui/lithos-hero";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <BallHeroReveal />
      <ScrollTextReveal />

      {/* White section after the pinned scroll journey. */}
      <section className="min-h-screen bg-[#f2efeb] px-6 pt-24 md:pt-32">
        <h2 className="text-center font-serif text-4xl tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl">
          Unsere{" "}
          {/* Dirtyline maps lowercase → clean caps, UPPERCASE → wild display
              alternates; the mixed spelling below mirrors the reference look. */}
          <span className="font-dirtyline text-[#3d4de8]">
            erGebnIsse
          </span>
        </h2>
      </section>

      {/* Contact (id="kontakt" — target of all "Anfrage starten" CTAs) and
          Footer (Impressum/Datenschutz links — legally required from every
          page in Germany). */}
      <Contact />
      <Footer />

      {/* --- ARCHIVED sections (kept for later; components still on disk) ---
      <Statement />
      <EposLeistungen />
      <About />
      <LithosHero />
      */}
    </main>
  );
}
