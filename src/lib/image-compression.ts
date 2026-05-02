import Compressor from "compressorjs";
import JSZip from "jszip";
import type { CompressedImage } from "./types";

export const compressImage = (file: File, quality: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const isPng = file.type === "image/png";

    new Compressor(file, {
      maxWidth: undefined,
      maxHeight: undefined,
      minWidth: 0,
      minHeight: 0,
      width: undefined,
      height: undefined,
      quality: quality / 100,
      mimeType: isPng ? "image/webp" : "auto",
      convertSize: Infinity,
      convertTypes: [],
      success(result: Blob) {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onload = () => {
          resolve(reader.result as string);
        };
      },
      error(err: Error) {
        reject(err);
      },
    });
  });
};

export const processImages = async (
  files: File[],
  quality: number,
  onProgress: (progress: number) => void
): Promise<{ compressedImages: CompressedImage[]; zipFile: Blob }> => {
  const compressedImgs: CompressedImage[] = [];
  const zip = new JSZip();
  const img = zip.folder("compressed_images");
  let counter = files.length;

  for (const file of files) {
    const originalContent = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

    const compressedImg = await compressImage(file, quality);
    const dataUrlParts = (compressedImg as string).split(",");
    if (dataUrlParts.length < 2 || !dataUrlParts[1]) {
      throw new Error(`Invalid compressed output for file: ${file.name}`);
    }
    let compressedImageSize: number;
    try {
      const binaryData = atob(dataUrlParts[1]);
      compressedImageSize = binaryData.length;
    } catch {
      throw new Error(`Failed to decode compressed image for file: ${file.name}`);
    }
    const dotIndex = file.name.lastIndexOf(".");
    const rawBaseName = dotIndex !== -1 ? file.name.slice(0, dotIndex) : file.name;
    const baseName = rawBaseName.replace(/[^a-zA-Z0-9_\-. ]/g, "_").replace(/\.{2,}/g, "_");
    const originalExt = dotIndex !== -1 ? file.name.slice(dotIndex) : "";
    const outputExt = originalExt;

    // If compression made the file larger (e.g. re-compressing an already-lossy image),
    // fall back to the original file so we never deliver something bigger than the input.
    const useOriginal = compressedImageSize >= file.size;

    let finalContent: string;
    let finalSize: number;

    if (useOriginal) {
      finalContent = originalContent;
      finalSize = file.size;
    } else {
      finalContent = compressedImg as string;
      finalSize = compressedImageSize;
    }

    const rate = ((finalSize - file.size) / file.size) * 100;

    compressedImgs.push({
      fileName: baseName + "-compressed" + outputExt,
      originalImageSize: file.size,
      compressedImageSize: finalSize,
      fileType: file.type,
      content: finalContent,
      originalContent,
      compressionPercentage: rate.toFixed(2),
    });

    const response = await fetch(finalContent);
    const blob = await response.blob();
    img?.file(`${baseName}-compressed${outputExt}`, blob);
    counter = counter - 1;

    const progress = Math.floor(
      ((files.length - counter) / files.length) * 100
    );
    onProgress(progress);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });

  return {
    compressedImages: compressedImgs,
    zipFile: zipBlob,
  };
};
