import { api } from "@/lib/http-client";
import { queryClient } from "@/lib/query-client";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

interface BufferData {
  type: string; // e.g., "Buffer"
  data: number[]; // Array of byte values
}

interface UploadResponse {
  fileId: number;
  imagePath: string;
}

interface CreateMovieResponse {
  movieId: number;
}

// GET FILE
export async function getFile({ id }: { id: string }) {
  try {
    const response = await api.get<BufferData>(`files/${id}`);

    const blob = await response.blob();

    const mimeType =
      response.headers.get("content-type") || "application/octet-stream";

    const url = URL.createObjectURL(blob);

    return { url, mimeType };
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
}
export function useGetFile({ id }: { id: string }) {
  return useQuery({
    queryKey: [""],
    queryFn: () => getFile({ id }),
  });
}

// UPLOAD IMAGE AND TITLE
export function useUploadFile() {
  return useMutation<
    CreateMovieResponse, // The final response includes the created movie ID
    Error,
    { file: File; title: string } // Input includes both the file and the title
  >({
    mutationFn: async ({ file, title }) => {
      try {
        // Step 1: Upload the file
        const uploadResponse = await api.post("upload", {
          body: file,
          headers: {
            "Content-Type": file.type, // Set the correct MIME type for the file
          },
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }

        const { fileId }: UploadResponse = await uploadResponse.json();

        // Step 2: Create the movie with the uploaded file's ID
        const movieResponse = await api.post("movies", {
          json: {
            title,
            fileId: String(fileId),
          },
        });

        if (!movieResponse.ok) {
          throw new Error("Failed to create movie");
        }

        const { movieId }: CreateMovieResponse = await movieResponse.json();

        // Step 3: Save the uploaded file and title to localStorage
        const storedData = JSON.parse(
          localStorage.getItem("uploadedFiles") || "[]"
        );
        const newFileData = { title, fileId, movieId };
        localStorage.setItem(
          "uploadedFiles",
          JSON.stringify([...storedData, newFileData])
        );

        return { movieId, fileId };
      } catch (error) {
        console.error("Error during upload or movie creation:", error);
        throw new Error("Failed to complete the upload process");
      }
    },
    async onSuccess() {
      // Invalidate all queries related to uploaded files
      queryClient.invalidateQueries({ queryKey: ["file"] });
    },
  });
}

export function useFetchFiles(fileIds: number[]) {
  return useQueries({
    queries: fileIds.map((fileId) => ({
      queryKey: ["file", fileId],
      queryFn: () => getFile({ id: String(fileId) }),
    })),
  });
}
