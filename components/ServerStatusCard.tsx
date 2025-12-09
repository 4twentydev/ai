import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSessionStore } from "@/store/useSessionStore";

export const ServerStatusCard = () => {
  const { serverUrl, connectionState, lastSync } = useSessionStore();

  const { icon, color, label } = useMemo(() => {
    if (connectionState === "online") {
      return { icon: "radio-outline", color: "#34d399", label: "Connected" };
    }
    if (connectionState === "connecting") {
      return { icon: "sync-outline", color: "#fbbf24", label: "Connecting" };
    }
    return { icon: "alert-circle-outline", color: "#f43f5e", label: "Offline" };
  }, [connectionState]);

  return (
    <View className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
      <View className="flex-row items-center gap-2">
        <Ionicons name={icon as never} size={22} color={color} />
        <Text className="text-sm font-semibold text-slate-100">{label}</Text>
      </View>
      <Text className="mt-2 text-sm text-slate-300">{serverUrl}</Text>
      {lastSync && <Text className="text-xs text-slate-500">Synced {lastSync}</Text>}
    </View>
  );
};
