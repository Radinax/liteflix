import Button from "@/components/button/button";
import PlayIcon from "@/assets/play.svg";
import PlusIcon from "@/assets/plus.svg";

interface MovieMainProps {
  onClickReproduce?: () => void;
  onClickMyList?: () => void;
  title: string;
}

export function MovieMain({ title }: MovieMainProps) {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col items-center sm:items-start">
        <p className="text-white text-xl">
          ORIGINAL DE <span className="font-bold">LITEFLIX</span>
        </p>
        <p className="font-bold text-title-primary text-7xl sm:text-9xl text-center sm:text-start">
          {title}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
        <Button icon={PlayIcon}>REPRODUCIR</Button>
        <Button icon={PlusIcon} variant="outline">
          MI LISTA
        </Button>
      </div>
    </div>
  );
}
