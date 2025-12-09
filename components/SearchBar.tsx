import React from "react";
import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, placeholder, onChangeText }) => {
  return (
    <View className="flex-row items-center rounded-2xl bg-slate-800/80 px-3 py-2">
      <Ionicons name="sparkles-outline" size={22} color="#38bdf8" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        className="ml-3 flex-1 text-base text-slate-100"
      />
    </View>
  );
};
