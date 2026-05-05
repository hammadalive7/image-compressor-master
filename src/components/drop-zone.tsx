import { filterValidFiles } from "@/lib";
import { ImageIcon, UploadCloud } from "lucide-react";
import { useRef } from "react";
import { useDragAndDrop } from "@/hooks";

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  hasCompressedImages: boolean;
}

const DropZone = ({ onFilesSelected, hasCompressedImages }: DropZoneProps) => {
  const dropAreaRef = useRef<HTMLLabelElement>(null);

  const { isDragActive, handleDragOver, handleDragEnter, handleDragLeave, handleDrop } =
    useDragAndDrop(onFilesSelected);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const validFiles = filterValidFiles(e.target.files);
      if (validFiles.length > 0) onFilesSelected(validFiles);
    }
  };

  return (
    <label
      ref={dropAreaRef}
      htmlFor="file-input"
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-center transition-all duration-150 ${
        isDragActive
          ? "border-primary bg-accent"
          : "border-border bg-surface-sunken hover:border-primary hover:bg-accent"
      } ${hasCompressedImages ? "py-5" : "py-10"}`}
      style={{ background: isDragActive ? "var(--primary-subtle)" : undefined }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <input
        multiple
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="file-input"
        className="sr-only"
        aria-label="Upload image files"
      />

      <div className="flex flex-col items-center gap-2.5">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-150 ${
            isDragActive ? "scale-110" : ""
          }`}
          style={{ background: "var(--primary)", boxShadow: "var(--shadow-sm)" }}
        >
          {isDragActive
            ? <UploadCloud className="size-5 text-white" strokeWidth={2} />
            : <ImageIcon className="size-5 text-white" strokeWidth={2} />
          }
        </div>

        <div>
          <p className="text-sm font-medium text-foreground">
            {isDragActive ? "Drop files for Middle-Out™ compression" : "Drop images here"}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            or <span style={{ color: "var(--primary)" }} className="font-medium">click to browse</span> - Pied Piper compresses locally
          </p>
        </div>

        <div className="flex gap-1.5">
          {["JPG", "PNG", "WEBP"].map((fmt) => (
            <span key={fmt} className="app-chip app-chip-primary">{fmt}</span>
          ))}
        </div>
      </div>
    </label>
  );
};

export default DropZone;
