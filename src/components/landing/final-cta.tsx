import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="rounded-xl bg-card px-6 py-14 text-center shadow-elevated md:px-16">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          Your code shouldn't have to care which CPU runs it.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
          Analyze the repository, choose the honest runtime, validate it, and keep the AMD64 image when
          that is the correct answer.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link to="/overview">Deploy your first repository</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
