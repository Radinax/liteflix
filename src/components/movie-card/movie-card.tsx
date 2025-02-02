import PlayCircleIcon from "@/assets/play-circle.svg";
import StarIcon from "@/assets/star.svg";

interface MovieCardProps {
  image: string;
  title: string;
  score: number;
  year: number;
}

export function MovieCard({ image, title, score, year }: MovieCardProps) {
  return (
    <div
      className="relative w-[327px] sm:w-[220px] h-[146px] bg-cover bg-top sm:bg-center rounded-lg overflow-hidden group transition-all duration-300"
      style={{ backgroundImage: `url(${image})` }}
      data-testid="movie-card"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-invert backdrop-opacity-10 transition-all duration-300 z-20 flex items-center justify-start gap-2 p-4 opacity-0 group-hover:opacity-100">
        <div>
          <img
            src={PlayCircleIcon}
            alt="play-circle-icon"
            className="w-8 h-8"
          />
        </div>

        <p data-testid="overlay-title" className="text-white ml-2 truncate">
          {title}
        </p>
      </div>

      {/* Score and Year Container hidden by default, showed on hover */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 px-4">
        <div className="flex flex-row gap-1">
          <img src={StarIcon} alt="star icon" className="w-3 h-3" />
          <p className="text-white text-xs">{Math.round(score * 10) / 10}</p>
        </div>
        <p className="text-white text-xs">{year}</p>
      </div>

      {/* Original Content hidden on hover */}
      <div className="absolute inset-0 flex flex-col justify-between items-center z-0 sm:z-10 transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex-grow flex items-center justify-center mt-6">
          <img
            src={PlayCircleIcon}
            alt="play-circle-icon-hidden"
            className="w-10 h-10"
          />
        </div>
        <p data-testid="original-title" className="text-white mb-4">
          {title}
        </p>
      </div>
    </div>
  );
}
