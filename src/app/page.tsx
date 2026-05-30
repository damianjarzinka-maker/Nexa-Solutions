import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { EposLeistungen } from "@/components/EposLeistungen";
import { Statement } from "@/components/Statement";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Services />
      <Statement />
      <EposLeistungen />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
