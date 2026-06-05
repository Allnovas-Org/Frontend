import React, { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";

interface UploadDropzoneProps {
  helperText?: string;
  onFilesSelected?: (files: FileList) => void;
}

const UploadDropzone = ({
  helperText = "Supported formats: JPG, PNG, PDF. Max: 10MB",
  onFilesSelected,
}: UploadDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFileName(files[0].name);
    onFilesSelected?.(files);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div>
      <div
        role='button'
        tabIndex={0}
        className={`w-full rounded-xl border-2 border-dashed px-6 py-8 text-center text-sm transition ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-200 bg-gray-50/30"
        }`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragEnter={() => setIsDragging(true)}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className='flex flex-col items-center gap-2 text-gray-500'>
          <CloudUpload className='h-5 w-5' />
          <span className='font-medium'>Drag and drop or click to upload</span>
          {fileName ? (
            <span className='text-xs text-gray-400'>{fileName}</span>
          ) : (
            <span className='text-xs text-gray-400'>No file selected</span>
          )}
        </div>
      </div>
      <input
        ref={inputRef}
        type='file'
        className='hidden'
        accept='image/png,image/jpeg,application/pdf'
        onChange={(event) => handleFiles(event.target.files)}
      />
      <p className='text-xs text-gray-400 mt-2'>{helperText}</p>
    </div>
  );
};

export default UploadDropzone;
