"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect } from "react";
import Navbar from "@/widgets/Navbar";
import { useAuthStore } from "@/store/auth-store";
import { useDeviceStore } from "@/store/device-store";

export function Providers({ children }: { children: React.ReactNode }) {
  const restore = useAuthStore((s) => s.restore);
  const initDevice = useDeviceStore((s) => s.init);
  const { isAuthenticated } = useAuthStore();
  useEffect(() => {
    restore(); // restores auth from cookies
    initDevice(); // initializes deviceId fingerprint
  }, []);

  useEffect(() => {
    console.log("Auth status:", isAuthenticated);
  }, [isAuthenticated]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
