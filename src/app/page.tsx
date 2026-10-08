import { Navbar } from "@/components/Navbar";
import { BallHeroReveal } from "@/components/ballhero/BallHeroReveal";
import { ScrollTextReveal } from "@/components/ScrollTextReveal";
import { HighlightsCarousel } from "@/components/HighlightsCarousel";
import { AutomationTicker } from "@/components/AutomationTicker";
import { AiSolutionsSection } from "@/components/AiSolutionsSection";
import { StackHandoff } from "@/components/StackHandoff";
import { WebAppsSection } from "@/components/WebAppsSection";
import { Statement } from "@/components/Statement";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ImageComparison } from "@/components/ui/image-comparison-slider";

// --- ARCHIVED (temporarily removed, re-enable by uncommenting here + below) ---
// import { Services } from "@/components/Services"; // images now live inside ScrollTextReveal
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
      <section className="min-h-screen bg-[#f2efeb] px-6 pb-24 pt-24 md:pt-32">
        <h2
          id="websites"
          className="mx-auto max-w-4xl scroll-mt-24 text-center font-serif text-4xl leading-tight tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl">
          Wir zeigen lieber{" "}
          {/* Dirtyline maps lowercase → clean caps, UPPERCASE → wild display
              alternates; the mixed spelling below mirrors the reference look. */}
          <span className="font-dirtyline text-[#3d4de8]">erGebnIsse</span>, als
          über sie zu reden.
        </h2>

        {/* Before/after comparison — AVS Brinkmann. Left: the old site.
            Right: avs-brinkmann.de, rebuilt from its looping hero video plus a
            capture of the page with the video area cut out (transparent), so
            nav, copy and gradients sit on the live animation exactly as on
            the real site. Video box mirrors the captured layout:
            desktop 1200×800 → top 65px, height 736px;
            mobile 390×693 → top 66px, height 629px, object-position 64%. */}
        <div className="mt-14 md:mt-20">
          <ImageComparison
            beforeImage="/brinkmann-website.png"
            beforeImageMobile="/brinkmann-website-mobile.png"
            altBefore="AVS Brinkmann GmbH — alte Website"
            after={
              <>
                <video
                  src="/avs-brinkmann-hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden
                  className="absolute inset-x-0 top-[9.524%] h-[90.765%] w-full object-cover object-[64%_50%] md:top-[8.125%] md:h-[92%] md:object-center"
                />
                <picture>
                  <source
                    media="(max-width: 767px)"
                    srcSet="/avs-brinkmann-overlay-mobile.png"
                  />
                  <img
                    src="/avs-brinkmann-overlay.png"
                    alt="AVS Brinkmann GmbH — neue Website"
                    className="absolute inset-0 h-full w-full"
                    draggable="false"
                  />
                </picture>
              </>
            }
          />
        </div>
      </section>

      {/* Statement section with flipping words ("Build modern websites
          with Epos Solutions"). */}
      <Statement />

      {/* "Why us" points as a circular carousel. */}
      <HighlightsCarousel />

      {/* Automation feed — stays light; the dark part of the page now starts
          at the contact section. */}
      {/* Section hand-offs: automation pins by its bottom edge while the
          custom-software sheet slides over it; that pair then pins while the
          dark AI sheet slides over both. */}
      <StackHandoff
        under={
          <StackHandoff
            under={<AutomationTicker />}
            over={<WebAppsSection />}
          />
        }
        over={<AiSolutionsSection />}
      />

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
