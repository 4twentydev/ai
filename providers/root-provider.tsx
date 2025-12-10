import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "nativewind";
import { queryClient } from "@/lib/query-client";

export function RootProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <GestureHandlerRootView className="flex-1 bg-slate-950">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={{ enabled: true }}>{children}</ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
