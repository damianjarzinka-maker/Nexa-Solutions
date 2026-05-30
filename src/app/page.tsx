import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { NexaLeistungen } from "@/components/NexaLeistungen";
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
      <NexaLeistungen />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
