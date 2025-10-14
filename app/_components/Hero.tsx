import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Decorative background using semantic tokens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="mx-auto h-[520px] max-w-6xl bg-gradient-to-b from-transparent via-muted/40 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-20 pb-14 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Badge variant="secondary" className="rounded-full">
            Transform your content creation with AI
          </Badge>
        </div>

        <div className="mx-auto mt-6 max-w-3xl text-center">
          <h1
            id="hero-title"
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Write better content,{" "}
            <span className="text-primary">10x faster</span>
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            One-click content generation powered by AI. Turn prompts into blogs,
            social posts, and marketing copy that’s on-brand and ready to
            publish.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/dashboard">Start for free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">View templates</Link>
            </Button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            No credit card required. Cancel anytime.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {["Writers", "Marketers", "Startups", "Agencies"].map((label) => (
            <div
              key={label}
              className="rounded-md border border-border/60 bg-card px-3 py-2 text-center text-xs text-muted-foreground"
            >
              Trusted by {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
