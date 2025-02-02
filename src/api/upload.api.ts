import { api } from "@/lib/http-client";
import { useMutation, useQuery } from "@tanstack/react-query";

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
            fileId, // Link the movie to the uploaded file
          },
        });

        if (!movieResponse.ok) {
          throw new Error("Failed to create movie");
        }

        const { movieId }: CreateMovieResponse = await movieResponse.json();
        return { movieId };
      } catch (error) {
        console.error("Error during upload or movie creation:", error);
        throw new Error("Failed to complete the upload process");
      }
    },
  });
}
