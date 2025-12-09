import React from "react";
import { View, Text } from "react-native";

interface StatusPillProps {
  status: "pending" | "ready" | "in-progress";
  priority: "high" | "medium" | "low";
}

const statusCopy: Record<StatusPillProps["status"], string> = {
  pending: "Queued",
  ready: "Ready",
  "in-progress": "In progress"
};

const statusColor: Record<StatusPillProps["status"], string> = {
  pending: "bg-amber-500/20 text-amber-200",
  ready: "bg-emerald-500/20 text-emerald-200",
  "in-progress": "bg-sky-500/20 text-sky-100"
};

const priorityColor: Record<StatusPillProps["priority"], string> = {
  high: "text-rose-300",
  medium: "text-amber-200",
  low: "text-slate-300"
};

export const StatusPill: React.FC<StatusPillProps> = ({ status, priority }) => {
  return (
    <View className="items-end gap-2">
      <View className={`rounded-full px-3 py-1 ${statusColor[status]}`}>
        <Text className="text-xs font-medium uppercase tracking-wide">{statusCopy[status]}</Text>
      </View>
      <Text className={`text-[11px] font-semibold uppercase ${priorityColor[priority]}`}>
        {priority} priority
      </Text>
    </View>
  );
};
