import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Resource } from "@/types/task";

interface ResourceListProps {
  resources: Resource[];
}

const typeIcon: Record<Resource["type"], keyof typeof Ionicons.glyphMap> = {
  "cut-drawing": "cut-outline",
  assembly: "construct-outline",
  "packing-list": "reader-outline",
  panel: "layers-outline",
  note: "document-text-outline",
  other: "folder-outline"
};

export const ResourceList: React.FC<ResourceListProps> = ({ resources }) => {
  if (!resources.length) {
    return (
      <View className="mt-4 rounded-2xl border border-slate-800/80 bg-slate-800/40 p-3">
        <Text className="text-sm text-slate-300">AI will attach drawings and lists once ready.</Text>
      </View>
    );
  }

  return (
    <View className="mt-4 gap-3">
      {resources.map((resource) => (
        <Pressable
          key={resource.id}
          className="flex-row items-center justify-between rounded-2xl bg-slate-800/60 px-3 py-2"
        >
          <View className="flex-row items-center gap-3">
            <Ionicons name={typeIcon[resource.type]} size={20} color="#38bdf8" />
            <View>
              <Text className="text-sm font-semibold text-slate-100" numberOfLines={1}>
                {resource.name}
              </Text>
              <Text className="text-[11px] text-slate-400" numberOfLines={1}>
                {resource.path}
              </Text>
            </View>
          </View>
          <Text className="text-[11px] text-slate-300">{resource.actionHint}</Text>
        </Pressable>
      ))}
    </View>
  );
};
