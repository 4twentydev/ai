export type ResourceType = "cut-drawing" | "assembly" | "packing-list" | "panel" | "note" | "other";

export type Resource = {
  id: string;
  name: string;
  type: ResourceType;
  path: string;
  actionHint: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "ready" | "in-progress";
  priority: "high" | "medium" | "low";
  due?: string;
  resources: Resource[];
  context: string[];
};

export type TaskRequestPayload = {
  query: string;
  department?: string;
  includePackages?: boolean;
};
