import { createFileRoute } from "@tanstack/react-router";
import type React from "react";
import Navbar from "@/components/Navbar";
import { useInView } from "@/hooks/use-scroll";
import aimImg from "@/assets/about-aim.jpg";
import visionImg from "@/assets/about-vision.jpg";
import motiveImg from "@/assets/about-motive.jpg";
import Footer from "@/components/Footer";
import { fetchAboutData } from "@/lib/api-utils";
import type { AboutSection } from "@/types/api";

const SECTION_IMAGES: Record<string, string> = {
  "about-aim.jpg": aimImg,
  "about-vision.jpg": visionImg,
  "about-motive.jpg": motiveImg,
};

function resolveSectionImage(filename: string): string {
  return SECTION_IMAGES[filename] ?? aimImg;
}

export const Route = createFileRoute("/about")({
  loader: () => fetchAboutData(),
  head: () => ({
    meta: [
      { title: "About Us — BurrowSpace" },
      { name: "description", content: "Learn about BurrowSpace's mission to redefine digital privacy with sovereign, India-built infrastructure." },
      { property: "og:title", content: "About Us — BurrowSpace" },
      { property: "og:description", content: "Our mission: privacy without compromise, built in India, for the world." },
    ],
  }),
  component: AboutPage,
});

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ImageSection({
  image,
  label,
  title,
  children,
  reverse = false,
}: {
  image: string;
  label: string;
  title: string;
  children: React.ReactNode;
  reverse?: boolean;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-6 sm:gap-8 md:gap-16 ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center`}
    >
      <div
        className={`w-full md:w-1/2 overflow-hidden rounded-2xl transition-all duration-1000 ${
          inView ? "translate-x-0 opacity-100 scale-100" : (reverse ? "translate-x-16" : "-translate-x-16") + " opacity-0 scale-95"
        }`}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-48 sm:h-64 w-full object-cover md:h-80 hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div
        className={`w-full md:w-1/2 transition-all duration-1000 delay-200 ${
          inView ? "translate-x-0 opacity-100" : (reverse ? "-translate-x-16" : "translate-x-16") + " opacity-0"
        }`}
      >
        <p className="mb-2 sm:mb-3 text-xs font-semibold tracking-[0.3em] text-brand">{label}</p>
        <h2 className="mb-4 sm:mb-6 font-heading text-2xl sm:text-3xl font-bold text-white md:text-4xl">{title}</h2>
        <div className="text-sm sm:text-base leading-relaxed text-white/75 md:text-lg">{children}</div>
      </div>
    </div>
  );
}

function PlaceholderSection({ label }: { label: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <div className="rounded-2xl border border-dashed border-brand/20 bg-section-bg p-8 sm:p-12 md:p-20 text-center">
        <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-brand">{label}</p>
        <p className="text-base sm:text-lg text-muted-foreground italic">Coming soon...</p>
        <div className="mx-auto mt-4 h-px w-24 bg-brand/20" />
      </div>
    </div>
  );
}

function FounderQuoteCard({ quote, name, role, delay = "", reverse = false }: { quote: string; name: string; role: string; delay?: string; reverse?: boolean }) {
  return (
    <RevealSection className={delay}>
      <div className={`flex flex-col gap-6 sm:gap-8 rounded-2xl border border-section-border bg-section-bg/60 p-6 sm:p-8 backdrop-blur-xl md:p-12 ${reverse ? "md:flex-row-reverse" : "md:flex-row"} md:items-center`}>
        {/* Photo placeholder */}
        <div className="flex-shrink-0">
          <div className="relative h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full border-2 border-brand/30 bg-gradient-to-br from-brand/10 to-section-bg md:h-48 md:w-48">
            <div className="flex h-full w-full items-center justify-center">
              <svg className="h-12 w-12 sm:h-16 sm:w-16 text-brand/30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] sm:text-[9px] tracking-[0.2em] text-muted-foreground/50">PHOTO</p>
          </div>
        </div>
        {/* Quote */}
        <div className="flex-1">
          <svg className="mb-3 sm:mb-4 h-6 w-6 sm:h-8 sm:w-8 text-brand/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-base sm:text-lg font-light italic text-white/60 md:text-xl">{quote}</p>
          <div className="mt-4 sm:mt-5 h-px w-12 bg-brand/30" />
          <p className="mt-2 sm:mt-3 text-sm font-semibold text-white/80">{name}</p>
          <p className="text-xs tracking-[0.15em] text-white/50">{role}</p>
        </div>
      </div>
    </RevealSection>
  );
}

function renderSectionBody(section: AboutSection) {
  const paras = section.content.trim().split(/\n\n+/).filter(Boolean);
  return (
    <>
      {paras.map((para, i) => (
        <p key={i} className={i > 0 ? "mt-4" : undefined}>
          {para}
        </p>
      ))}
      {section.highlight ? (
        <p className="mt-4 font-semibold text-brand">{section.highlight}</p>
      ) : null}
    </>
  );
}

function AboutPage() {
  const about = Route.useLoaderData();

  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-[oklch(0.08_0.02_260)] text-white">
        {/* Header */}
        <section className="px-6 sm:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20 text-center lg:px-16">
          <RevealSection>
            <h1 className="font-heading text-4xl sm:text-5xl font-light text-white md:text-7xl">
              About <span className="font-semibold">BurrowSpace</span>
            </h1>
            <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-base sm:text-lg text-white/60">
              Redefining digital privacy from India, for the world.
            </p>
            <div className="mx-auto mt-6 h-px w-24 bg-brand/30" />
          </RevealSection>
        </section>

        {about.sections.map((section) => (
          <section key={section.id} className="px-6 sm:px-8 py-12 sm:py-16 lg:px-16">
            <div className="mx-auto max-w-6xl">
              <ImageSection
                image={resolveSectionImage(section.image)}
                label={section.label}
                title={section.title}
                reverse={section.reverse}
              >
                {renderSectionBody(section)}
              </ImageSection>
            </div>
          </section>
        ))}
        {/* Founder's Quotes — hidden until content is ready */}
        {/* <section className="px-6 sm:px-8 py-16 sm:py-20 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <RevealSection>
              <p className="mb-8 sm:mb-10 text-center text-xs font-semibold tracking-[0.4em] text-brand">FOUNDERS&apos; QUOTES</p>
            </RevealSection>
            <div className="flex flex-col gap-8 sm:gap-10">
              <FounderQuoteCard
                quote="Quote to be added..."
                name="Founder 1"
                role="CO-FOUNDER, BURROWSPACE"
                delay="delay-100"
              />
              <FounderQuoteCard
                quote="Quote to be added..."
                name="Founder 2"
                role="CO-FOUNDER, BURROWSPACE"
                delay="delay-200"
                reverse
              />
            </div>
          </div>
        </section> */}

        {/* Impact sections */}
        <section className="px-6 sm:px-8 py-12 sm:py-16 lg:px-16">
          <div className="mx-auto max-w-6xl space-y-8 sm:space-y-12">
            <PlaceholderSection label="IMPACT ON D2C" />
            <PlaceholderSection label="IMPACT ON B2B" />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
