import Dropdown from "@/components/dropdown/dropdown";
import { MovieCard } from "@/components/movie-card/movie-card";
import { Movies } from "@/types/schema";
import { useState } from "react";

interface MovieListProps {
  movies?: Movies;
  myMovies?: Movies;
}

type TypeOfMovieProps = "my-movies" | "popular-movies";
const DROPDOWN_OPTIONS = ["Populares", "Mis Peliculas"];

export function MovieList({ movies, myMovies }: MovieListProps) {
  const [typeOfMovie, setTypeOfMovie] =
    useState<TypeOfMovieProps>("popular-movies");

  return (
    <div className="w-[300px] sm:w-full min-h-[694px] flex-1 sm:flex-0 hover:cursor-pointer flex flex-col items-center">
      <div className="text-lg font-semibold mb-4 text-white flex flex-row items-center w-max">
        <span className="">Ver: </span>
        <Dropdown
          items={DROPDOWN_OPTIONS}
          onSelect={(item) =>
            setTypeOfMovie(
              item === DROPDOWN_OPTIONS[0] ? "popular-movies" : "my-movies"
            )
          }
        />
      </div>

      <div className="space-y-4">
        {typeOfMovie === "popular-movies"
          ? movies
              ?.slice(0, 4)
              .map((movie, index) => (
                <MovieCard
                  key={`movie-list-${index}-${movie.id}`}
                  image={movie.postUrl}
                  title={movie.title}
                  score={movie.score}
                  year={movie.date}
                />
              ))
          : myMovies
              ?.slice(0, 4)
              .map((movie, index) => (
                <MovieCard
                  key={`movie-list-${index}-${movie.id}`}
                  image={movie.postUrl}
                  title={movie.title}
                  score={movie.score}
                  year={movie.date}
                />
              ))}
      </div>
    </div>
  );
}
