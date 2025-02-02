import Button from "@/components/button/button";
import { useState } from "react";
import clipIcon from "@/assets/clip.svg";
import closeIcon from "@/assets/cerrar.svg";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useUploadFile } from "@/api/upload.api";
import { ProgressBar } from "@/components/progress-bar/progress-bar";
import { Logo } from "@/components/logo/logo";

interface UploadModalProps {
  onClose?: () => void;
}

export function UploadModal({ onClose }: UploadModalProps) {
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false); // Tracks overall upload process
  const [error, setError] = useState<string | null>(null);

  // Use the `useUploadFile` hook
  const { mutateAsync: uploadFile } = useUploadFile(); // Tracks whether the file upload mutation is in progress

  const ref = useClickOutside<HTMLDivElement>(onClose!);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(interval);
            return prevProgress;
          }
          return prevProgress + 10;
        });
      }, 500);

      // Perform the actual file upload
      const { movieId } = await uploadFile({ file, title });

      // Finalize progress
      setUploadProgress(100);
      setIsUploading(false);

      console.log("File uploaded successfully! File ID:", movieId);
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload the file.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div
      ref={ref}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-primary p-4 sm:p-14 rounded-lg shadow-lg w-screen h-screen sm:w-[730px] sm:h-auto flex flex-col items-center justify-center gap-6 relative">
        <img
          src={closeIcon}
          alt={"close Icon"}
          className="h-5 w-5 cursor-pointer absolute top-6 right-6 hidden sm:block"
          onClick={onClose}
        />
        {file ? (
          <div className="flex flex-col justify-between items-center gap-10">
            <Logo />
            <p className="uppercase font-bold text-2xl text-white">
              ¡Felicitaciones!
            </p>
            <p className="uppercase text-xl text-white">
              {title} fue correctamente subida.
            </p>
            <Button type="button" variant="secondary" onClick={close}>
              IR AL HOME
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-title-primary">
              AGREGAR PELICULA
            </h2>
            <form
              className="flex flex-col justify-center items-center gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* File Input or Progress Bar */}
              {!isUploading && !file && (
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center text-white">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label
                    htmlFor="file-upload"
                    className="mt-2 flex justify-center items-center px-4 py-2 gap-2 text-white rounded-lg cursor-pointer"
                  >
                    <img src={clipIcon} alt={"Clip Icon"} className="h-4 w-4" />
                    <p className="text-[16px] font-bold uppercase">
                      {/* Text for mobile */}
                      <span className="block sm:hidden">Agregá un archivo</span>
                      {/* Text for desktop */}
                      <span className="hidden sm:block">
                        Agregá un archivo o arrastralo y soltalo aquí
                      </span>
                    </p>
                  </label>
                </div>
              )}

              {/* Progress Bar */}
              {(isUploading || uploadProgress > 0) && (
                <ProgressBar
                  progress={uploadProgress}
                  onCancel={() => {
                    setIsUploading(false);
                    setUploadProgress(0);
                    console.log("Upload cancelled");
                  }}
                  error={error}
                />
              )}

              {/* Title Input */}
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full p-2 border-b border-white text-white placeholder:text-center"
                placeholder="Titulo"
                required
              />

              {/* Buttons */}
              <div className="flex flex-col gap-4 w-[248px]">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleFileUpload}
                  disabled={isUploading || !file}
                >
                  SUBIR PELICULA
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="block sm:hidden"
                >
                  SALIR
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
