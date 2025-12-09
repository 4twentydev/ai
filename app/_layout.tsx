import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { RootProvider } from "@/providers/root-provider";

export default function RootLayout() {
  return (
    <RootProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0b1222" }
        }}
      />
    </RootProvider>
  );
}
