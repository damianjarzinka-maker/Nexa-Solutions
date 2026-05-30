import Link from "next/link";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-3xl px-6 pb-28 pt-36 md:pt-44">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-muted transition-colors hover:text-white"
        >
          <span aria-hidden>←</span>
          Zurück
        </Link>

        <h1 className="mt-10 font-serif text-4xl tracking-tight md:text-5xl">
          {title}
        </h1>

        <div className="mt-12 space-y-10 leading-relaxed text-muted">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
