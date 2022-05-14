import {CrewDTO} from "./crewDTO";
import {ReviewDTO} from "./reviewDTO";
import {VideoDTO} from "./videoDTO";
import {GenreDTO} from "./genreDTO";

export interface MovieDTO {

  id: number;

  title: string;

  imdbId: string;

  budget: number;

  overview: string;

  posterPath: string;

  upComing: boolean;

  releaseDate: string;

  originalLanguage: string;

  runtime: number;

  voteAverage: number;

  voteCount: number;

  popularity: number;

  genres: Set<GenreDTO>;

  crewSet: Set<CrewDTO>;

  reviews: Set<ReviewDTO>;

  video: VideoDTO;

}
