import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-6 py-24 text-center md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
        🚀 Now in beta — free for students
      </div>
      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        Master Engineering Problems{" "}
        <span className="text-primary">Step by Step</span>
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        EngX is a guided problem-solving platform for engineering students. Practice
        real problems, get hints, and track your progress over time.
      </p>
      <div className="flex gap-4">
        <Link href="/problems">
          <Button size="lg" className="gap-2">
            Browse Problems →
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" size="lg">
            Sign In
          </Button>
        </Link>
      </div>
    </section>
  );
}
