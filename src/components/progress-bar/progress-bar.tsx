import { twMerge } from "tailwind-merge";

interface ProgressBarProps {
  progress: number;
  onCancel: () => void;
  error?: string | null;
}

export function ProgressBar({ progress, onCancel, error }: ProgressBarProps) {
  return (
    <div className="w-[602px]">
      {/* Progress Label */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-300">
          {progress === 100 ? "100%" : `CARGANDO ${progress}%`}
        </span>
        {progress < 100 && (
          <button
            type="button"
            onClick={onCancel}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            CANCELAR
          </button>
        )}
        {progress === 100 && (
          <span className="text-title-primary text-sm cursor-default">
            ¡LISTO!
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative h-1 bg-white overflow-hidden">
        <div
          className={twMerge(
            "absolute top-0 left-0 h-3",
            error ? "bg-red-600" : "bg-title-primary"
          )}
          role="progressbar" // Add this
          aria-valuenow={progress} // Add this
          aria-valuemin={0} // Add this
          aria-valuemax={100} // Add this
          style={{
            width: `${progress}%`,
            transform: "translateY(-3px)",
          }}
        ></div>
      </div>
    </div>
  );
}
