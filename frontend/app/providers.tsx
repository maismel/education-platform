"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryCache, MutationCache } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/api/getErrorMessage";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            toast.error(getErrorMessage(error));
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            toast.error(getErrorMessage(error));
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
