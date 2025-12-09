import React from "react";
import { View, Text } from "react-native";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <View>
        <Text className="text-base font-semibold text-slate-50">{title}</Text>
        {subtitle && <Text className="text-xs text-slate-400">{subtitle}</Text>}
      </View>
    </View>
  );
};
