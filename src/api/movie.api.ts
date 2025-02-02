import { fetchData } from "@/lib/fetch";
import { ApiResponse, ApiResponseMovieSchema } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";

// GET ALL MOVIES
export async function getMovies(): Promise<ApiResponse | null> {
  const data = await fetchData<ApiResponse>("movies");
  const result = ApiResponseMovieSchema.safeParse(data);
  if (result.success) return result.data;
  return null;
}
export function useMoviesQuery() {
  return useQuery({
    queryKey: ["get-movies"],
    queryFn: getMovies,
  });
}
export function useMovies() {
  const { data, error, isFetching, isLoading } = useMoviesQuery();
  console.log({ data, error, isFetching });
  return { data, isLoading };
}
