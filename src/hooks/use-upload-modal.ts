import { useState } from "react";

const useUploadModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      console.log("Selected file:", file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform the upload logic here (e.g., send the file to an API)
      console.log("Uploading file:", selectedFile.name);
      setSelectedFile(null);
      closeModal();
    } else {
      alert("Please select a file to upload.");
    }
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
    handleFileChange,
    handleUpload,
    selectedFile,
  };
};

export default useUploadModal;
