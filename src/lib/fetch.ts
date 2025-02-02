import { api } from "@/lib/http-client";

export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await api.get(endpoint);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return response.json<T>();
}

export type QueryOptions<T extends (...args: unknown[]) => unknown> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;
