import { createFileRoute, Link } from "@tanstack/react-router";
import { ArchPilotLogo } from "@/components/brand/logo";
import { AiSection } from "@/components/landing/ai-section";
import { ArchitectureSection } from "@/components/landing/architecture-section";
import { AwsStack } from "@/components/landing/aws-stack";
import { CostSection } from "@/components/landing/cost-section";
import { FinalCta } from "@/components/landing/final-cta";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LandingNav } from "@/components/landing/landing-nav";
import { PipelineVisual } from "@/components/landing/pipeline-visual";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <LandingNav />
      <section className="relative overflow-hidden">
        <div className="hero-wash pointer-events-none absolute inset-0" />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-infra uppercase">ArchPilot</p>
            <h1 className="mt-3 max-w-xl text-4xl font-medium tracking-tight md:text-5xl">
              Deploy anywhere.
              <br />
              Run on the architecture that makes sense.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-md">
              AI-assisted multi-architecture deployment for AWS. Analyze your repository, understand its
              architecture requirements, and deploy it to the most appropriate runtime.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/overview">Deploy a Repository</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#architecture">Explore Architecture</a>
              </Button>
            </div>
          </div>
          <PipelineVisual />
        </div>
      </section>
      <HowItWorks />
      <ArchitectureSection />
      <AiSection />
      <CostSection />
      <AwsStack />
      <FinalCta />
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-subtle">
          <ArchPilotLogo markClassName="size-5" />
          <p className="font-mono">ap-south-1 · AWS-native control plane</p>
        </div>
      </footer>
    </div>
  );
}
