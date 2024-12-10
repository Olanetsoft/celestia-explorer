"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());
  const [darkMode, setDarkMode] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={darkMode ? "dark" : ""}>{children}</div>
    </QueryClientProvider>
  );
}
