import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { SearchBar } from "@/components/SearchBar";
import { TaskCard } from "@/components/TaskCard";
import { QuickPromptRow } from "@/components/QuickPromptRow";
import { SectionHeader } from "@/components/SectionHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ServerStatusCard } from "@/components/ServerStatusCard";
import { mockTasks, quickPrompts } from "@/constants/mockData";
import { useTaskRequest, useTaskSearch } from "@/hooks/useTaskSearch";
import { useSessionStore } from "@/store/useSessionStore";
import { Task } from "@/types/task";

export default function HomeScreen() {
  const [query, setQuery] = useState("Get cut drawings for UCLA 23017 R21");
  const { data, isLoading, isFetching } = useTaskSearch(query);
  const { mutateAsync, isPending } = useTaskRequest();
  const { setConnectionState, setLastSync, serverUrl } = useSessionStore();

  useEffect(() => {
    setConnectionState("connecting");
    const timeout = setTimeout(() => {
      setConnectionState("online");
      setLastSync(new Date().toLocaleTimeString());
    }, 900);
    return () => clearTimeout(timeout);
  }, [setConnectionState, setLastSync]);

  const tasks = useMemo<Task[]>(() => {
    if (data?.data?.length) return data.data;
    return mockTasks;
  }, [data?.data]);

  const onSubmit = async () => {
    const result = await mutateAsync({
      query,
      includePackages: true,
      department: "fabrication"
    });
    setLastSync(`generated ${new Date().toLocaleTimeString()}`);
    setQuery(result.data.title);
  };

  const header = (
    <View className="mb-6 mt-8 flex-row items-center justify-between">
      <View>
        <Text className="text-xs uppercase tracking-wide text-slate-400">AI workspace</Text>
        <Text className="text-2xl font-bold text-slate-50">Cut & Assembly Concierge</Text>
      </View>
      <View className="rounded-2xl bg-sky-500/20 px-3 py-2">
        <Text className="text-xs font-semibold text-sky-200">Local first</Text>
      </View>
    </View>
  );

  const hero = (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 450 }}
      className="rounded-3xl border border-slate-800 bg-slate-900 p-4"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-lg font-semibold text-slate-50">Ask anything</Text>
          <Text className="mt-1 text-sm text-slate-300">
            Pull cut drawings, assemblies, packing lists, and contextual notes without leaving the floor.
          </Text>
        </View>
        <Ionicons name="rocket-outline" color="#38bdf8" size={26} />
      </View>
      <View className="mt-4 gap-3">
        <SearchBar value={query} onChangeText={setQuery} placeholder="e.g. Cut drawings for UCLA 23017 R21" />
        <QuickPromptRow prompts={quickPrompts} onSelect={setQuery} />
        <PrimaryButton label="Generate pull list" onPress={onSubmit} loading={isPending} />
      </View>
    </MotiView>
  );

  return (
    <ScrollView className="flex-1 bg-slate-950 px-4">
      {header}
      <ServerStatusCard />
      <View className="mt-6" />
      {hero}

      <View className="mt-8">
        <SectionHeader
          title="Ready for you"
          subtitle={isFetching || isLoading ? "Syncing with local AI" : "Pre-fetched drawings, packs, and notes"}
        />
        <FlashList
          data={tasks}
          scrollEnabled={false}
          renderItem={({ item }) => <TaskCard task={item} />}
          estimatedItemSize={220}
        />
      </View>

      <View className="mt-10 mb-16 rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
        <View className="flex-row items-center gap-2">
          <Ionicons name="folder-open-outline" size={22} color="#38bdf8" />
          <Text className="text-base font-semibold text-slate-50">Linked workspace</Text>
        </View>
        <Text className="mt-2 text-sm text-slate-300">
          Point to your on-prem share or workstation path to launch drawings in the right app instantly.
        </Text>
        <View className="mt-3 rounded-2xl bg-slate-800/70 px-3 py-2">
          <Text className="text-xs text-slate-400">Current server</Text>
          <Text className="text-sm font-semibold text-slate-100">{serverUrl}</Text>
        </View>
        <Link href="/settings" asChild>
          <PrimaryButton
            label="Edit server + permissions"
            onPress={() => {}}
            icon={<Ionicons name="settings-outline" size={18} color="#0f172a" />}
          />
        </Link>
      </View>
    </ScrollView>
  );
}
