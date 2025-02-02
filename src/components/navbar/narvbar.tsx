import Button from "@/components/button/button";

import PlusIcon from "@/assets/plus.svg";
import BellIcon from "@/assets/Notificación.svg";
import Avatar from "@/components/avatar/avatar";
import { Logo } from "@/components/logo/logo";
import useUploadModal from "@/hooks/use-upload-modal";
import { UploadModal } from "@/components/upload-modal/upload-modal";
import { twMerge } from "tailwind-merge";

const Burger: React.FC = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="w-[27px] h-[2px] bg-white"></div>

      <div className="w-[27px] h-[2px] bg-white"></div>

      <div className="w-[17px] h-[2px] bg-white"></div>
    </div>
  );
};

export default function Navbar() {
  const { openModal, isModalOpen, closeModal } = useUploadModal();

  return (
    <nav className="fixed top-0 left-0 w-full pt-8 px-6 sm:px-28 z-10 fade-in">
      {/* Semi-transparent overlay with blur */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-0"></div>

      {/* Navbar content */}
      <div className="relative flex items-center justify-between w-full">
        {/* Mobile Version */}
        <div className="flex items-center justify-between w-full md:hidden z-100">
          {/* Left: Button Icon */}
          <div
            className={twMerge(
              "cursor-pointer rounded-full border border-white h-9 w-9 flex items-center justify-center",
              isModalOpen
                ? "invisible pointer-events-none"
                : "visible pointer-events-auto"
            )}
            onClick={openModal}
          >
            <img src={PlusIcon} alt="Plus Icon" className="h-4 w-4" />
          </div>
          {/* Middle: Logo */}
          <Logo />
          {/* Right: Avatar */}
          <Avatar />
        </div>

        {/* Desktop Version */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Left Side: Logo with Button to open Modal */}
          <div className="flex items-center space-x-4">
            <Logo />
            <Button icon={PlusIcon} onClick={openModal} variant="transparent">
              AGREGAR PELICULA
            </Button>
          </div>
          {/* Middle: Empty Space */}
          <div className="flex-grow"></div>
          {/* Right Side: Icons */}
          <div className="flex items-center space-x-8">
            <Burger />
            <img src={BellIcon} alt="Bell Icon" className="h-7 w-7" />
            <Avatar />
          </div>
        </div>
      </div>
      {isModalOpen && <UploadModal onClose={closeModal} />}
    </nav>
  );
}
