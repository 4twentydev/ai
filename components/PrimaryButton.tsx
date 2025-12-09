import React from "react";
import { Pressable, Text, ActivityIndicator, View } from "react-native";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onPress, loading, icon }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      className="mt-3 flex-row items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3"
    >
      {loading ? <ActivityIndicator color="#0f172a" /> : icon ? icon : null}
      <View className="flex-1 items-center">
        <Text className="text-base font-semibold text-slate-900">{label}</Text>
      </View>
    </Pressable>
  );
};
