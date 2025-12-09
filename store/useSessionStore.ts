import { create } from "zustand";

export type ConnectionState = "offline" | "connecting" | "online";

type SessionState = {
  serverUrl: string;
  connectionState: ConnectionState;
  lastSync?: string;
  setServerUrl: (url: string) => void;
  setConnectionState: (state: ConnectionState) => void;
  setLastSync: (timestamp: string) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  serverUrl: "http://localhost:11434",
  connectionState: "offline",
  lastSync: undefined,
  setServerUrl: (serverUrl) => set({ serverUrl }),
  setConnectionState: (connectionState) => set({ connectionState }),
  setLastSync: (lastSync) => set({ lastSync })
}));
