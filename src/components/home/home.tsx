import { useMovies } from "@/api/movie.api";
import Navbar from "@/components/navbar/narvbar";
import Loader from "@/components/initial-loader/initial-loader";
import { MovieList } from "@/components/movie-list/movie-list";
import { MovieMain } from "@/components/movie-main/movie-main";
import { useEffect, useState } from "react";
import { useFetchFiles } from "@/api/upload.api";
import { Movies } from "@/types/schema";

const getUploadedFiles = (): {
  title: string;
  fileId: number;
  movieId: number;
}[] => {
  return JSON.parse(localStorage.getItem("uploadedFiles") || "[]");
};

export default function Home() {
  const { data, isLoading } = useMovies();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const uploadedFiles = getUploadedFiles();
  const fileIds = uploadedFiles.map((file: { fileId: number }) => file.fileId);

  const fileQueries = useFetchFiles(fileIds);

  const myMovies: Movies = fileQueries.map((query, index) => {
    return {
      id: String(fileIds[index]),
      score: 0,
      backdropUrl: String(query.data?.url),
      title: uploadedFiles[index].title,
      date: 2025,
      postUrl: String(query.data?.url),
    };
  });

  useEffect(() => {
    if (data) {
      const img = new Image();
      img.src =
        window.innerWidth > 640
          ? data.result.outstandingMovie.backdropUrl
          : data.result.outstandingMovie.postUrl;
      img.onload = () => setIsImageLoaded(true);
    }
  }, [data]);

  if (isLoading) return <Loader />;

  const desktopBackgroundImage = data
    ? data.result.outstandingMovie.backdropUrl
    : "";
  const mobileBackgroundImage = data
    ? data.result.outstandingMovie.postUrl
    : "";
  const backgroundImageUrl =
    window.innerWidth > 640 ? desktopBackgroundImage : mobileBackgroundImage;

  return (
    <div
      className={`flex flex-col items-start bg-cover bg-center bg-no-repeat min-h-screen py-8 px-6 md:px-28 transition-opacity duration-1000 will-change-opacity ${
        isImageLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundImage: `
          ${
            window.innerWidth < 640
              ? "linear-gradient(to bottom, transparent, rgba(36, 36, 36, 1)),"
              : ""
          }
          url(${backgroundImageUrl})
        `,
      }}
    >
      <Navbar />
      <div className="flex flex-col flex-1 md:flex-row items-center w-full mt-56 md:mt-8 gap-20 md:gap-0">
        {/* Left Section - Top Section on Mobile */}
        <div className="flex-1 sm:pr-8 h-full">
          <div className="text-lg">
            <MovieMain title={data?.result.outstandingMovie.title || ""} />
          </div>
        </div>

        {/* Right Section - Bottom Section on Mobile */}
        <MovieList movies={data?.result.popularMovies} myMovies={myMovies} />
      </div>
    </div>
  );
}
