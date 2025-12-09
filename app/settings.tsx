import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useSessionStore } from "@/store/useSessionStore";
import { setServerBaseUrl } from "@/lib/api";

export default function SettingsScreen() {
  const router = useRouter();
  const { serverUrl, setServerUrl } = useSessionStore();
  const [value, setValue] = useState(serverUrl);

  const save = async () => {
    await setServerBaseUrl(value);
    setServerUrl(value);
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-slate-950 px-4">
      <View className="mb-6 mt-10 flex-row items-center gap-2">
        <Ionicons name="settings-outline" size={22} color="#38bdf8" />
        <Text className="text-lg font-semibold text-slate-50">Server & Permissions</Text>
      </View>
      <View className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
        <Text className="text-sm font-semibold text-slate-200">Local AI endpoint</Text>
        <Text className="text-xs text-slate-400">
          Point to your Ollama/LlamaEdge host. Credentials stay on-device via SecureStore.
        </Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="http://localhost:11434"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          className="mt-3 rounded-2xl bg-slate-800 px-3 py-2 text-slate-100"
        />
        <PrimaryButton label="Save" onPress={save} />
      </View>
    </ScrollView>
  );
}
