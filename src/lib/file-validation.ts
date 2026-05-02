import { toast } from "sonner";

export const ALLOWED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB per file
const MAX_BATCH_SIZE = 500 * 1024 * 1024; // 500MB total batch

export const validateFileType = (file: File): boolean => {
  return ALLOWED_FORMATS.includes(file.type.toLowerCase());
};

export const validateFileSize = (file: File): boolean => {
  return file.size <= MAX_FILE_SIZE;
};

export const filterValidFiles = (files: FileList | File[]): File[] => {
  const filesArray = Array.from(files);
  const validFiles: File[] = [];
  const invalidTypeFiles: File[] = [];
  const oversizedFiles: File[] = [];

  filesArray.forEach((file) => {
    if (!validateFileType(file)) {
      invalidTypeFiles.push(file);
    } else if (!validateFileSize(file)) {
      oversizedFiles.push(file);
    } else {
      validFiles.push(file);
    }
  });

  if (invalidTypeFiles.length > 0) {
    toast.error(`Invalid file! Please upload only JPG, JPEG, PNG, or WEBP files.`, {
      description: invalidTypeFiles.map((f) => f.name).join(", "),
      duration: 5000,
      position: "top-right",
    });
  }

  if (oversizedFiles.length > 0) {
    toast.error(`File too large! Maximum size is 50MB per file.`, {
      description: oversizedFiles.map((f) => f.name).join(", "),
      duration: 5000,
      position: "top-right",
    });
  }

  const batchSize = validFiles.reduce((sum, f) => sum + f.size, 0);
  if (batchSize > MAX_BATCH_SIZE) {
    toast.error(`Batch too large! Total size must be under 500MB.`, {
      duration: 5000,
      position: "top-right",
    });
    return [];
  }

  return validFiles;
};
