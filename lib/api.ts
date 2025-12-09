import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";
import { mockTasks } from "@/constants/mockData";
import { Task, TaskRequestPayload } from "@/types/task";

const SERVER_KEY = "local-ai-server";

type ApiResult<T> = {
  data: T;
  source: "mock" | "server";
};

export const setServerBaseUrl = async (url: string) => {
  await SecureStore.setItemAsync(SERVER_KEY, url);
};

export const getServerBaseUrl = async () => {
  return SecureStore.getItemAsync(SERVER_KEY);
};

const getDefaultBaseUrl = () => {
  const localAddress = Constants?.expoConfig?.hostUri?.split(":")[0];
  return localAddress ? `http://${localAddress}:11434` : "http://localhost:11434";
};

const fetchFromServer = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const stored = await getServerBaseUrl();
  const baseUrl = stored || getDefaultBaseUrl();
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new Error(`Server responded with ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const searchTasks = async (payload: TaskRequestPayload): Promise<ApiResult<Task[]>> => {
  try {
    const data = await fetchFromServer<Task[]>("/search", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    return { data, source: "server" };
  } catch (error) {
    console.warn("Falling back to mock search", error);
    const filtered = mockTasks.filter((task) =>
      task.title.toLowerCase().includes(payload.query.toLowerCase())
    );
    return { data: filtered, source: "mock" };
  }
};

export const fetchTask = async (id: string): Promise<ApiResult<Task>> => {
  try {
    const data = await fetchFromServer<Task>(`/tasks/${id}`);
    return { data, source: "server" };
  } catch (error) {
    console.warn("Using mock task", error);
    const task = mockTasks.find((item) => item.id === id);
    if (!task) {
      throw new Error("Task not found");
    }
    return { data: task, source: "mock" };
  }
};

export const submitTaskRequest = async (payload: TaskRequestPayload): Promise<ApiResult<Task>> => {
  try {
    const data = await fetchFromServer<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    return { data, source: "server" };
  } catch (error) {
    console.warn("Using mock generation", error);
    const mock: Task = {
      id: `t-${Date.now()}`,
      title: payload.query,
      description: "Generated locally for preview.",
      status: "pending",
      priority: "medium",
      context: ["Mocked offline result"],
      resources: []
    };
    return { data: mock, source: "mock" };
  }
};
