import { QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { makeQueryClient } from "@/lib/query";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => makeQueryClient());
  return (
    <QueryClientProvider client={client}>
      <TooltipProvider delayDuration={180}>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            className:
              "!bg-card-elevated !text-foreground !border-0 !shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)]",
          }}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
