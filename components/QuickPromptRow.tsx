import React from "react";
import { View, Text, Pressable } from "react-native";

interface QuickPromptRowProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export const QuickPromptRow: React.FC<QuickPromptRowProps> = ({ prompts, onSelect }) => {
  return (
    <View className="flex-row flex-wrap gap-2">
      {prompts.map((prompt) => (
        <Pressable
          key={prompt}
          onPress={() => onSelect(prompt)}
          className="rounded-full bg-slate-800 px-4 py-2"
        >
          <Text className="text-sm text-slate-200">{prompt}</Text>
        </Pressable>
      ))}
    </View>
  );
};
