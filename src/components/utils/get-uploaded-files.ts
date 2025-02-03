export const getUploadedFiles = (): {
  title: string;
  fileId: number;
  movieId: number;
}[] => {
  return JSON.parse(localStorage.getItem("uploadedFiles") || "[]");
};
