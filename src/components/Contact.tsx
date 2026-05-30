"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { FadeIn } from "./FadeIn";
import { DotLoader } from "./ui/dot-loader";

const SERVICES = ["Webdesign", "KI-Automatisierung", "IT-Consulting"] as const;
type Service = (typeof SERVICES)[number];

const LOADER_FRAMES = [
  [14, 7, 0, 8, 6, 13, 20],
  [14, 7, 13, 20, 16, 27, 21],
  [14, 20, 27, 21, 34, 24, 28],
  [27, 21, 34, 28, 41, 32, 35],
  [34, 28, 41, 35, 48, 40, 42],
  [34, 28, 41, 35, 48, 42, 46],
  [34, 28, 41, 35, 48, 42, 38],
  [34, 28, 41, 35, 48, 30, 21],
  [34, 28, 41, 48, 21, 22, 14],
  [34, 28, 41, 21, 14, 16, 27],
  [34, 28, 21, 14, 10, 20, 27],
  [28, 21, 14, 4, 13, 20, 27],
  [28, 21, 14, 12, 6, 13, 20],
  [28, 21, 14, 6, 13, 20, 11],
  [28, 21, 14, 6, 13, 20, 10],
  [14, 6, 13, 20, 9, 7, 21],
];

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<Service>("Webdesign");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, service, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setName("");
    setCompany("");
    setEmail("");
    setService("Webdesign");
    setMessage("");
    setStatus("idle");
  }

  return (
    <section id="kontakt" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.22em] text-accent">
                Kontakt
              </span>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-6xl">
                Lassen Sie uns sprechen.
              </h2>
              <p className="mt-6 text-muted">
                Beschreiben Sie kurz Ihr Vorhaben. Wir antworten innerhalb von
                24 Stunden — werktags meist deutlich schneller.
              </p>
            </div>
            <DotLoader
              frames={LOADER_FRAMES}
              duration={120}
              className="shrink-0 gap-1.5"
              dotClassName="h-2 w-2 rounded-sm bg-white/10 [&.active]:bg-accent"
            />
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-16 border border-line">
            {status === "success" ? (
              <div className="flex flex-col items-start gap-6 p-10 md:p-16">
                <div className="flex h-12 w-12 items-center justify-center border border-white">
                  <Check size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-4xl tracking-tight md:text-5xl">
                  Danke.
                </h3>
                <p className="text-muted">
                  Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-4 inline-flex items-center gap-2 border border-line px-5 py-3 text-sm transition-colors hover:border-white"
                >
                  Weitere Anfrage senden
                  <ArrowRight size={14} strokeWidth={1.75} />
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="grid grid-cols-1 gap-0 md:grid-cols-2"
              >
                <Field
                  label="Name"
                  required
                  value={name}
                  onChange={setName}
                  autoComplete="name"
                />
                <Field
                  label="Unternehmen"
                  value={company}
                  onChange={setCompany}
                  autoComplete="organization"
                  className="md:border-l border-line"
                />
                <Field
                  label="E-Mail"
                  type="email"
                  required
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                  className="md:col-span-2 border-t border-line"
                />

                <div className="border-t border-line p-6 md:col-span-2 md:p-8">
                  <span className="text-xs uppercase tracking-[0.18em] text-muted">
                    Leistung
                  </span>
                  <div className="mt-4 grid grid-cols-1 gap-0 border border-line sm:grid-cols-3">
                    {SERVICES.map((s, i) => {
                      const selected = service === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setService(s)}
                          className={cn(
                            "px-4 py-3 text-sm transition-colors",
                            i !== 0 && "sm:border-l border-line",
                            i !== 0 && "border-t sm:border-t-0",
                            selected
                              ? "bg-white text-bg"
                              : "text-muted hover:text-white",
                          )}
                          aria-pressed={selected}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-line p-6 md:col-span-2 md:p-8">
                  <label className="text-xs uppercase tracking-[0.18em] text-muted">
                    Nachricht
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Worum geht es?"
                    className="mt-4 w-full resize-none border-b border-line bg-transparent py-3 text-base outline-none transition-colors placeholder:text-white/30 focus:border-white"
                  />
                </div>

                <div className="flex flex-col items-start gap-4 border-t border-line p-6 md:col-span-2 md:flex-row md:items-center md:justify-between md:p-8">
                  {status === "error" ? (
                    <p className="text-sm text-white">
                      Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
                    </p>
                  ) : (
                    <p className="text-xs text-muted">
                      Mit dem Absenden stimmen Sie der Verarbeitung Ihrer
                      Angaben zur Beantwortung Ihrer Anfrage zu.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 border border-white bg-white px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-transparent hover:text-white disabled:opacity-60"
                  >
                    {status === "submitting" ? "Wird gesendet…" : "Anfrage senden"}
                    <ArrowRight size={16} strokeWidth={1.75} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
};

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
  className,
}: FieldProps) {
  return (
    <div className={cn("p-6 md:p-8", className)}>
      <label className="text-xs uppercase tracking-[0.18em] text-muted">
        {label}
        {required && <span className="ml-1 text-white">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="mt-4 w-full border-b border-line bg-transparent py-2 text-base outline-none transition-colors focus:border-white"
      />
    </div>
  );
}
