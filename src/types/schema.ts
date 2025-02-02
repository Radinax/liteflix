import { z } from "zod";

export const MovieSchema = z.object({
  id: z.string(),
  title: z.string(),
  score: z.number(),
  date: z.number(),
  postUrl: z.string(),
  backdropUrl: z.string(),
});

export const MoviesSchema = MovieSchema.array();

export type Movies = z.infer<typeof MoviesSchema>;
export type Movie = z.infer<typeof MovieSchema>;

export const ApiResponseMovieSchema = z.object({
  result: z.object({
    outstandingMovie: MovieSchema,
    popularMovies: MoviesSchema,
  }),
});

export type ApiResponse = z.infer<typeof ApiResponseMovieSchema>;
