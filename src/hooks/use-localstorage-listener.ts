import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useLocalStorageListener = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "uploadedFiles") {
        // Invalidate all queries managed by useQueries
        queryClient.invalidateQueries({ queryKey: ["file"] });
      }
    };

    // Listen for storage events
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [queryClient]);
};
