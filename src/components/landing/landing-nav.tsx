import { Link } from "@tanstack/react-router";
import { ArchPilotLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export function LandingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" aria-label="ArchPilot">
          <ArchPilotLogo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex" aria-label="Product">
          <a href="#how" className="hover:text-foreground">
            How it works
          </a>
          <a href="#architecture" className="hover:text-foreground">
            Architecture
          </a>
          <a href="#ai" className="hover:text-foreground">
            Reasoning
          </a>
          <a href="#cost" className="hover:text-foreground">
            Cost
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/overview">Open console</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/overview">Deploy a Repository</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
