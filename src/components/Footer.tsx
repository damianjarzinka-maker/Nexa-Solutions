import Image from "next/image";

const NAV = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#kontakt", label: "Kontakt" },
];

const LEGAL = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/nexa-logo-beige-transparent.png"
              alt="Nexa Solutions"
              width={110}
              height={42}
            />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Studio für Webdesign, KI-Automatisierung und IT-Consulting —
              Deutschland.
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-muted">
              Navigation
            </span>
            <ul className="mt-6 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white transition-colors hover:text-muted"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-muted">
              Rechtliches
            </span>
            <ul className="mt-6 space-y-3">
              {LEGAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-4 border-t border-line pt-8 text-xs text-muted md:grid-cols-3">
          <span className="md:justify-self-start">
            © 2026 Nexa Solutions. Alle Rechte vorbehalten.
          </span>
          <a
            href="https://www.linkedin.com/in/damian-jarzinka-7a7a7b348/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white opacity-40 transition-opacity duration-200 hover:opacity-100 md:justify-self-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="28"
              height="28"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <span className="uppercase tracking-[0.22em] md:justify-self-end">
            Made in Germany
          </span>
        </div>
      </div>
    </footer>
  );
}
