import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTask, searchTasks, submitTaskRequest } from "@/lib/api";
import { TaskRequestPayload } from "@/types/task";

export const useTaskSearch = (query: string) => {
  return useQuery({
    queryKey: ["tasks", "search", query],
    queryFn: () => searchTasks({ query }),
    enabled: query.length > 2
  });
};

export const useTask = (id?: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTask(id ?? ""),
    enabled: Boolean(id)
  });
};

export const useTaskRequest = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: TaskRequestPayload) => submitTaskRequest(payload),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
};
