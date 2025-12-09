import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "@/types/task";
import { StatusPill } from "./status-pill";
import { ResourceList } from "./resource-list";

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg shadow-slate-900/50"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-lg font-semibold text-slate-50" numberOfLines={2}>
            {task.title}
          </Text>
          <Text className="mt-1 text-sm text-slate-400" numberOfLines={3}>
            {task.description}
          </Text>
        </View>
        <StatusPill status={task.status} priority={task.priority} />
      </View>

      <View className="mt-3 flex-row flex-wrap gap-2">
        {task.context.map((item) => (
          <View key={item} className="rounded-full bg-slate-800 px-3 py-1">
            <Text className="text-xs text-slate-300">{item}</Text>
          </View>
        ))}
      </View>

      <ResourceList resources={task.resources} />

      <View className="mt-4 flex-row items-center gap-2">
        <Ionicons name="time-outline" color="#94a3b8" size={16} />
        <Text className="text-xs text-slate-400">{task.due ?? "On demand"}</Text>
      </View>
    </Pressable>
  );
};
